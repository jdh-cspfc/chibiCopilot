# Chibi Copilot (Panel View)

A chibi companion that sits in the **Panel** next to the **Terminal** (right side), or in the **Secondary Side Bar**.

## Quick Start
1. Open folder in Cursor/VS Code.
2. `npm install` → `npm run build`.
3. Press **F5** or Run → **Start Debugging** (uses `.vscode/launch.json`).
4. In the Extension Development Host, open **View → Appearance → Panel** (⌘J) and locate **Chibi Copilot** in the Panel tab strip.
5. **Drag its tab to the far right** of the Panel, resize to a skinny column. Keep Terminal on the left.
6. Use Command Palette to test:
   - `Chibi Copilot: Simulate AI Start/Partial/Done/Error`.

## Settings
- `chibiCopilot.enabled` (bool)
- `chibiCopilot.sizePx` (64–256)
- `chibiCopilot.opacity` (0.1–1.0)
- `chibiCopilot.corner` (bottomRight|bottomLeft|topRight|topLeft) — inside the view
- `chibiCopilot.offset` ({x,y})
- `chibiCopilot.reducedMotion` (system|on|off)
- `chibiCopilot.minimalMode` (dot/emote)

## Add Art
Drop PNGs into `media/sprites/` named `idle.png`, `thinking.png`, `typing.png`, `cheer.png`, `error.png`.

## Real Cursor Events
Wire `createDetector()` in `src/detector.ts` once Cursor exposes lifecycle hooks. For now, use the simulate commands.
```