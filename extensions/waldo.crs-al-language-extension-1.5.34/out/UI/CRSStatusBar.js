"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleRunObjectFromStatusBar = exports.RunObjectFromStatusBar = void 0;
const vscode = require("vscode");
exports.RunObjectFromStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
function toggleRunObjectFromStatusBar(document) {
    var _a;
    exports.RunObjectFromStatusBar.command = 'crs.RunCurrentObjectWeb';
    let openDocument = document || ((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document);
    if (!openDocument) {
        exports.RunObjectFromStatusBar.hide();
        return;
    }
    let currentfile = openDocument.uri;
    if (!(currentfile === null || currentfile === void 0 ? void 0 : currentfile.fsPath)) {
        exports.RunObjectFromStatusBar.hide();
        return;
    }
    if (!currentfile.fsPath.toLowerCase().endsWith('.al')) {
        exports.RunObjectFromStatusBar.hide();
    }
    else {
        exports.RunObjectFromStatusBar.text = 'Run In Web Client';
        exports.RunObjectFromStatusBar.show();
    }
}
exports.toggleRunObjectFromStatusBar = toggleRunObjectFromStatusBar;
//# sourceMappingURL=CRSStatusBar.js.map