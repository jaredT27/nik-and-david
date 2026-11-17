"""Stage the public desktop game for Wrangler. Requires Pillow and FFmpeg."""

import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
from io import BytesIO
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

from PIL import Image


ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT / "output/cloudflare-site"
ENTRY_FILES = (
    "index.html", "trailer.html",
    "game.css", "desktop.css", "first-case.css", "walking.css", "adventure.css", "cutscenes.css",
    "game.js", "portraits.js", "first-case-model.js", "first-case.js", "walk-model.js", "walking-scenes.js",
    "walking.js", "adventure-model.js", "adventure.js", "cutscenes.js", "field-kit.js",
)
ASSET = re.compile(r"\bassets/[a-zA-Z0-9_.-]+\.(?:jpg|png|svg|mp4)")
ORIGINAL_ORIGIN = "https://nik-david-share-preview.vercel.app"
TRAILER = "assets/nik-david-reveal.mp4"
MAX_ASSET_BYTES = 25 * 1024 * 1024


def stage_asset(asset, target):
    source = ROOT / asset
    if source.suffix == ".png":
        with Image.open(source) as image:
            encoded = BytesIO()
            image.save(encoded, format="WEBP", quality=88, method=5, lossless=image.mode == "RGBA")
        data = encoded.getvalue()
        fingerprint = hashlib.sha256(data).hexdigest()[:12]
        public_path = f"assets/optimized/{source.stem}.{fingerprint}.webp"
        (target / public_path).write_bytes(data)
        return asset, public_path

    destination = target / asset
    if asset == TRAILER:
        subprocess.run([
            "ffmpeg", "-nostdin", "-hide_banner", "-loglevel", "error", "-i", source,
            "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-maxrate", "4800k",
            "-bufsize", "9600k", "-pix_fmt", "yuv420p", "-c:a", "copy", "-movflags", "+faststart", destination,
        ], check=True)
    else:
        shutil.copyfile(source, destination)
    return asset, asset


def build(origin):
    sources = {name: (ROOT / name).read_text() for name in ENTRY_FILES}
    assets = sorted({asset for source in sources.values() for asset in ASSET.findall(source)})
    PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="cloudflare-build-", dir=PUBLIC.parent) as tmp:
        stage = Path(tmp) / "site"
        (stage / "assets/optimized").mkdir(parents=True)
        with ThreadPoolExecutor(max_workers=4) as workers:
            paths = dict(workers.map(lambda asset: stage_asset(asset, stage), assets))

        for name, source in sources.items():
            content = ASSET.sub(lambda match: paths[match[0]], source)
            content = content.replace(ORIGINAL_ORIGIN, origin)
            if name == "index.html":
                revision = hashlib.sha256("".join(sources.values()).encode() + repr(paths).encode()).hexdigest()[:12]
                content = re.sub(r'([.](?:css|js)\?v=)[\w-]+', rf'\g<1>{revision}', content)
            (stage / name).write_text(content)
        (stage / "_headers").write_text("/assets/optimized/*\n  Cache-Control: public, max-age=31536000, immutable\n")

        oversized = [p.name for p in stage.rglob("*") if p.is_file() and p.stat().st_size > MAX_ASSET_BYTES]
        if oversized:
            raise ValueError(f"Assets over the Cloudflare file limit: {', '.join(oversized)}")

        previous = Path(tmp) / "previous"
        if PUBLIC.exists():
            PUBLIC.rename(previous)
        try:
            stage.rename(PUBLIC)
        except OSError:
            if previous.exists():
                previous.rename(PUBLIC)
            raise
    print(f"Staged {len(sources)} public files and {len(assets)} game assets in {PUBLIC}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--origin", default="https://nik-david.jared-4be.workers.dev")
    build(parser.parse_args().origin.rstrip("/"))
