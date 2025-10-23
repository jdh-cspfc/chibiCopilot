import * as vscode from 'vscode';
import { createDetector } from './detector';

// Keep track of all live webviews so we can broadcast status
const liveWebviews = new Set<vscode.Webview>();
function postAll(message: unknown) { for (const wv of liveWebviews) { try { wv.postMessage(message); } catch {} } }

class ChibiViewProvider implements vscode.WebviewViewProvider {
  constructor(private ctx: vscode.ExtensionContext) {}
  resolveWebviewView(view: vscode.WebviewView) {
    console.log('Chibi Copilot: Webview view resolved!', view.viewType);
    view.webview.options = { enableScripts: true };
    view.webview.html = getWebviewHtml(this.ctx, view.webview);
    liveWebviews.add(view.webview);
    view.onDidDispose(() => liveWebviews.delete(view.webview));

    // push initial config
    const config = vscode.workspace.getConfiguration('chibiCopilot');
    console.log('Chibi Copilot: Initial config:', config);
    postAll({ type: 'config', value: config });
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Chibi Copilot: Extension activated!');
  const cfg = () => vscode.workspace.getConfiguration('chibiCopilot');

  // Register the webview views (Panel + optional Secondary Side Bar)
  const provider = new ChibiViewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('zoe-chibi-copilot-panelView', provider),
    vscode.window.registerWebviewViewProvider('zoe-chibi-copilot-sidebarView', provider)
  );

  // Commands for sim/testing
  context.subscriptions.push(
    vscode.commands.registerCommand('chibiCopilot.toggle', () => {
      const enabled = cfg().get<boolean>('enabled');
      vscode.workspace.getConfiguration('chibiCopilot').update('enabled', !enabled, true);
      postAll({ type: 'config', value: cfg() });
    }),
    vscode.commands.registerCommand('chibiCopilot.simulateStart', () => postAll({ type: 'aiStart' })),
    vscode.commands.registerCommand('chibiCopilot.simulatePartial', () => postAll({ type: 'aiPartial' })),
    vscode.commands.registerCommand('chibiCopilot.simulateDone', () => postAll({ type: 'aiDone' })),
    vscode.commands.registerCommand('chibiCopilot.simulateError', () => postAll({ type: 'aiError' }))
  );

  // Config changes → broadcast
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('chibiCopilot')) {
        postAll({ type: 'config', value: cfg() });
      }
    })
  );

  // Detector (stubbed). Wire real Cursor events later.
  const detector = createDetector();
  detector.onStart(() => postAll({ type: 'aiStart' }));
  detector.onPartial(() => postAll({ type: 'aiPartial' }));
  detector.onDone(() => postAll({ type: 'aiDone' }));
  detector.onError(() => postAll({ type: 'aiError' }));

  // Optional: Status bar shortcut
  const bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  bar.text = '$(wand) Chibi';
  bar.tooltip = 'Toggle Chibi Copilot';
  bar.command = 'chibiCopilot.toggle';
  bar.show();
  context.subscriptions.push(bar);
}

export function deactivate() {}

function getWebviewHtml(ctx: vscode.ExtensionContext, webview: vscode.Webview) {
  const cssUri = webview.asWebviewUri(vscode.Uri.joinPath(ctx.extensionUri, 'media', 'webview.css'));
  const jsUri = webview.asWebviewUri(vscode.Uri.joinPath(ctx.extensionUri, 'media', 'webview.js'));
  const confettiUri = webview.asWebviewUri(vscode.Uri.joinPath(ctx.extensionUri, 'media', 'confetti.js'));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${cssUri}">
  <title>Chibi Copilot</title>
</head>
<body>
  <div id="overlay-root">
    <div id="chibi" class="idle" role="img" aria-label="Chibi Copilot"></div>
    <canvas id="fx-canvas" width="300" height="300" aria-hidden="true"></canvas>
  </div>
  <script src="${confettiUri}"></script>
  <script src="${jsUri}"></script>
</body>
</html>`;
}