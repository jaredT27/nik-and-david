# Nik & David: The Fraud Legacy

A short point-and-click comedy mystery about suspicious paperwork. Explore five locations, interview witnesses, collect evidence, solve document puzzles, and confront the people behind three fake businesses.

The game runs as a static website: plain HTML, CSS, and JavaScript, with local image and video assets. It has no server, database, third-party runtime packages, remote fonts, analytics, or API credentials. Saves and sound preferences stay in the browser's local storage.

## Play locally

Install Python 3, then run from this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open <http://127.0.0.1:4173/>. Use a current browser; the layout is best on desktop. Serve the files over HTTP so media and browser storage behave consistently. There is no `npm install` step.

## Controls

- Click a person or object to walk over and interact.
- Press **1** for Nik's conversations or **2** for David's gadgets.
- Select a gadget, then click its target. Select a filed clue, then click a person to ask about it.
- Press **Escape** to put away the selected tool or clue, **H** to reveal objects, and **Space** to finish or advance dialogue.
- Use the on-screen hints whenever needed. There is no time limit.

The title screen includes **Continue Case**, **New Case**, **Case Notes**, and the reveal trailer. Continue appears after a save exists. Cutscenes support captions, pause, skip, replay, and reduced motion.

## Tests

Install Node.js 20 or newer. No npm dependencies are required:

```sh
npm test
```

Or run `node --test tests/*.test.cjs` directly. The 39 tests cover puzzle prerequisites, document connections, save migration, walking cancellation, confrontation sequencing, cutscene behavior, and local asset references.

## Optional optimized build

The unbuilt source is playable as-is. The Cloudflare staging script requires Python 3.10+, Pillow, and FFmpeg with the `libx264` encoder. Install FFmpeg using your system's package manager, then:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-build.txt
.venv/bin/python build-cloudflare.py --origin https://your-game.example
python3 -m http.server 4174 --bind 127.0.0.1 --directory output/cloudflare-site
```

Open <http://127.0.0.1:4174/> to review the staged site. The script fingerprints optimized PNG images, recompresses the reveal trailer, rewrites social sharing URLs, and rejects files above 25 MiB. Output is generated under `output/cloudflare-site/` and is ignored by Git.

For Cloudflare, `wrangler.jsonc` points at that staged directory. Run Wrangler separately using your own authenticated account after reviewing the build. Vercel or any static host can also serve the original entry files and `assets/`. The source HTML retains the existing preview's sharing URLs; update them for another host or use the build's `--origin` argument.

## Source map

| Files | Purpose |
| --- | --- |
| `index.html`, `game.js`, `game.css`, `desktop.css` | Main interface, story, inventory, dialogue, saves, and layout |
| `first-case*` | First investigation and scanner puzzle |
| `adventure*`, `field-kit.js` | Later document puzzles, evidence topics, and interactions |
| `walking*`, `walk-model.js`, `portraits.js` | Walking targets, movement, and character artwork |
| `cutscenes.js`, `cutscenes.css`, `trailer.html` | Cinematics and reveal screening room |
| `assets/` | The 36 referenced game and trailer assets |
| `tests/` | Dependency-free Node test suite |

## License and publication status

Source code and documentation are licensed under [MIT](LICENSE). **Artwork, video, and embedded audio are excluded from that license**; see [ASSET_LICENSE.md](ASSET_LICENSE.md).

Public GitHub publication is pending confirmation of media ownership and redistribution permissions. The local project includes those assets so the game remains playable. Their inclusion here does not assert permission to redistribute them. The [asset ledger](docs/ASSET_PROVENANCE.csv) lists every retained asset and its unresolved provenance; [the release review](docs/OPEN_SOURCE_REVIEW.md) records the remaining decision.

The cleanup preserved the complete original folder in a separate private archive. See [cleanup notes](docs/CLEANUP.md).
