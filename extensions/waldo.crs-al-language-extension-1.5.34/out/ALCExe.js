"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALCExe = void 0;
const fs = require("fs");
const path_1 = require("path");
const vscode = require("vscode");
const Settings_1 = require("./Settings");
const crsOutput = require("./CRSOutput");
const CRSTerminal = require("./CRSTerminal");
const ApplicationInsights_1 = require("./ApplicationInsights");
class ALCExe {
    static CompileDGML() {
        let projectpath;
        try {
            projectpath = vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor.document.uri).uri.fsPath;
        }
        catch (_a) {
            vscode.window.showErrorMessage('No active project document.');
        }
        let workSpaceSettings = Settings_1.Settings.GetConfigSettings(projectpath);
        let packageCachePath = (0, path_1.join)(projectpath, workSpaceSettings[Settings_1.Settings.packageCachePath]);
        crsOutput.showOutput(`CompileDGML for project "${projectpath}"`, false);
        let alcpath = this.GetALCExeDir();
        CRSTerminal.CompileDGML(alcpath, projectpath, packageCachePath);
        let appInsightsEntryProperties = {};
        appInsightsEntryProperties.ALCExeDir = alcpath;
        ApplicationInsights_1.AppInsights.getInstance().trackEvent(ApplicationInsights_1.EventName.CompileDGML, appInsightsEntryProperties);
    }
    static GetALCExeDir() {
        let MicrosoftPath = fs.readdirSync((0, path_1.join)(process.env.USERPROFILE, '.vscode', 'extensions')).filter(element => element.startsWith('ms-dynamics-smb.al'));
        MicrosoftPath = MicrosoftPath ? MicrosoftPath : fs.readdirSync((0, path_1.join)(process.env.USERPROFILE, '.vscode', 'extensions')).filter(element => element.startsWith('microsoft.al'));
        if (!MicrosoftPath) {
            return null;
        }
        let ALCPath = (0, path_1.join)(process.env.USERPROFILE, '.vscode', 'extensions', MicrosoftPath[0], 'bin');
        crsOutput.showOutput(`alc.exe path: ${ALCPath}`, false);
        return ALCPath;
    }
}
exports.ALCExe = ALCExe;
//# sourceMappingURL=ALCExe.js.map