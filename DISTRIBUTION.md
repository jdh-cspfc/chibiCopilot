# Chibi Copilot - Distribution Guide

This guide explains how to package and distribute your Chibi Copilot extension for VS Code and Cursor.

## Prerequisites

1. **Install vsce (Visual Studio Code Extension manager)**:
   ```bash
   npm install -g vsce
   ```

2. **Create a Visual Studio Marketplace account** (if publishing publicly):
   - Go to [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
   - Sign in with your Microsoft account
   - Create a publisher account

## Packaging Your Extension

### 1. Build the Extension
```bash
npm run build
```

### 2. Package the Extension
```bash
npm run package
```

This creates a `.vsix` file (e.g., `chibi-copilot-0.0.2.vsix`) in your project root.

## Distribution Options

### Option 1: Install from VSIX File (Local Distribution)

**For VS Code:**
1. Open VS Code
2. Go to Extensions view (Ctrl+Shift+X)
3. Click the "..." menu → "Install from VSIX..."
4. Select your `.vsix` file

**For Cursor:**
1. Open Cursor
2. Go to Extensions view (Ctrl+Shift+X)
3. Click the "..." menu → "Install from VSIX..."
4. Select your `.vsix` file

### Option 2: Publish to Visual Studio Marketplace (Public Distribution)

1. **Login to vsce**:
   ```bash
   vsce login <your-publisher-name>
   ```

2. **Publish the extension**:
   ```bash
   npm run publish
   ```

3. **Verify publication**:
   - Check [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
   - Search for "Chibi Copilot"

### Option 3: Private Distribution

For private distribution (e.g., within a company), you can:

1. **Host the VSIX file** on a web server or file sharing service
2. **Share the download link** with users
3. **Users install** using the VSIX method above

## Testing Your Package

### 1. Test the VSIX File
```bash
# Install the extension in a test VS Code instance
code --install-extension chibi-copilot-0.0.2.vsix

# Or test in Cursor
cursor --install-extension chibi-copilot-0.0.2.vsix
```

### 2. Verify Installation
1. Open VS Code/Cursor
2. Check Extensions view - Chibi Copilot should appear
3. Test the commands:
   - `Chibi Copilot: Toggle`
   - `Chibi Copilot: Simulate AI Start`
   - etc.

## Version Management

### Updating Your Extension

1. **Update version in package.json**:
   ```json
   "version": "0.0.3"
   ```

2. **Update CHANGELOG.md** (create if needed):
   ```markdown
   ## [0.0.3] - 2024-01-15
   - Fixed animation timing
   - Added new sprite
   ```

3. **Package and publish**:
   ```bash
   npm run package
   npm run publish
   ```

## Extension Configuration

Your extension is already well-configured with:

- ✅ Proper `package.json` with all required fields
- ✅ TypeScript compilation setup
- ✅ Webview integration
- ✅ Command palette integration
- ✅ Settings/configuration support
- ✅ Proper file exclusions (`.vscodeignore`)

## Troubleshooting

### Common Issues

1. **"Publisher not found"**:
   - Make sure you're logged in: `vsce login <publisher-name>`
   - Verify publisher name matches `package.json`

2. **"Extension not loading"**:
   - Check that `out/extension.js` exists
   - Verify all dependencies are included
   - Check VS Code Developer Console for errors

3. **"Webview not displaying"**:
   - Ensure all media files are included
   - Check file paths in `getWebviewHtml()`

### Debug Mode

To debug your extension:

1. **VS Code**: Press F5 → "Extension Development Host"
2. **Cursor**: Press F5 → "Extension Development Host"

## File Structure After Packaging

Your packaged extension will contain:
```
chibi-copilot-0.0.2.vsix
├── extension.js (compiled from TypeScript)
├── detector.js (compiled from TypeScript)
├── media/
│   ├── webview.html
│   ├── webview.css
│   ├── webview.js
│   ├── confetti.js
│   ├── wand.svg
│   └── sprites/
│       ├── idle.png
│       ├── thinking.png
│       ├── typing.png
│       ├── cheer.png
│       └── error.png
└── package.json
```

## Next Steps

1. **Test locally** with the VSIX file
2. **Gather feedback** from beta users
3. **Publish to marketplace** when ready
4. **Monitor usage** and collect feedback
5. **Iterate and improve** based on user feedback

## Support

For issues with packaging or distribution:
- Check the [VS Code Extension API documentation](https://code.visualstudio.com/api)
- Review [vsce documentation](https://github.com/microsoft/vscode-vsce)
- Check VS Code Developer Console for runtime errors
