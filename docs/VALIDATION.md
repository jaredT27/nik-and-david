# Validation — 2026-11-17

The cleaned project was checked locally before publication. GitHub publication is still pending media-rights confirmation; no remote CI run or public repository is claimed here.

| Check | Result |
| --- | --- |
| Existing tests before cleanup | 39 passed, 0 failed |
| `npm test` after cleanup | 39 passed, 0 failed |
| `node --check` | All 11 root JavaScript files passed |
| Source preservation | Every game HTML, CSS, JavaScript, and test file matches its pre-cleanup SHA-256 |
| Original archive | All 905 original files preserved; every original path, inode, device, mode, and file size verified after the same-volume rename |
| Retained files | All 66 retained original copies verified by SHA-256 |
| Local HTTP preview | All 19 HTML/CSS/JS entry files and 36 media assets return HTTP 200 with matching content lengths |
| Browser startup | Chromium displayed the title screen, Case Notes and reveal controls, and the saved-game summary from the isolated test session |
| Optional Cloudflare build | Completed: 19 public entry files, 36 referenced assets, and `_headers` |
| Built reference integrity | No missing asset references; all generated images decode; sharing URLs rewritten to the supplied test origin |
| Built asset limit | Largest output file: 10,272,765 bytes, below the configured 25 MiB limit |
| Secret-pattern review | No matches in the 40 initially staged text files for common token formats, private keys, credential assignments, email addresses, or personal filesystem paths |
| Media metadata | No GPS tags in retained images; inspected video metadata contained container/codec/handler tags |
| Git ignores | Generated output, local deployment state, `.env`, and browser logs are excluded |
| Git whitespace check | Passed after normalizing the asset CSV to LF line endings |

Tests ran with Node.js 25.2.1, Python 3.14.3, and Pillow 12.3.0. The optimized build used the installed FFmpeg. Browser checks used the Playwright CLI skill in a separate test session. This pass checked startup and file delivery; it did not repeat the historical full-story browser playthrough.

Generated build output is kept outside the working folder under the private backup's `validation/generated-output/` directory. Re-run the documented build to generate a fresh `output/cloudflare-site/` locally.
