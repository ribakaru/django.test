"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigureBestPracticeNaming = exports.HandleOnChangeActiveTextEditor = exports.HandleOnOpenTextDocument = exports.HandleOnSaveTextDocument = exports.SetupSnippets = exports.SearchObjectNames = exports.SearchGoogle = exports.SearchMicrosoftDocs = exports.ReorganizeAllFiles = exports.ReorganizeCurrentFile = exports.RenameAllFiles = exports.RenameCurrentFile = exports.RunObjectWindows = exports.RunObjectPhone = exports.RunObjectTablet = exports.RunDatabaseLocks = exports.RunEventSubscribers = exports.RunTestTool = exports.RunObjectWeb = exports.PublishAndRunCurrentObjectWeb = exports.RunCurrentObjectWeb = exports.CompileDGML = exports.CreateGraphVizDependencyGraph = exports.InstallWaldosModules = void 0;
const vscode = require("vscode");
const Settings_1 = require("./Settings");
const DynamicsNAV_1 = require("./DynamicsNAV");
const WorkspaceFiles_1 = require("./WorkspaceFiles");
const SnippetFunctions_1 = require("./SnippetFunctions");
const fs = require("fs");
const NAVObject_1 = require("./NAVObject");
const path = require("path");
const MSDocs_1 = require("./MSDocs");
const Google_1 = require("./Google");
const CRSStatusBar = require("./UI/CRSStatusBar");
const Configuration = require("./Configuration");
const ALCExe_1 = require("./ALCExe");
const ApplicationInsights_1 = require("./ApplicationInsights");
function InstallWaldosModules() {
    console.log('Running: InstallWaldosModules');
    vscode.window.showErrorMessage('This function has been temporarily disabled');
    console.log('Done: InstallWaldosModules');
}
exports.InstallWaldosModules = InstallWaldosModules;
function CreateGraphVizDependencyGraph() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Running: CreateGraphVizDependencyGraph');
        ApplicationInsights_1.AppInsights.getInstance().trackCommand('CreateGraphVizDependencyGraph');
        yield WorkspaceFiles_1.WorkspaceFiles.CreateGraphVizDependencyGraph();
        console.log('Done: CreateGraphVizDependencyGraph');
    });
}
exports.CreateGraphVizDependencyGraph = CreateGraphVizDependencyGraph;
function CompileDGML() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Running: CompileDGML');
        ApplicationInsights_1.AppInsights.getInstance().trackCommand('CompileDGML');
        ALCExe_1.ALCExe.CompileDGML();
        console.log('Done: CompileDGML');
    });
}
exports.CompileDGML = CompileDGML;
function RunCurrentObjectWeb(currFile) {
    console.log('Running: RunCurrentObjectWeb');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('RunCurrentObjectWeb');
    let currentdocument = currFile;
    if (!currentdocument) {
        currentdocument = vscode.window.activeTextEditor.document.uri;
    }
    let navObject = new NAVObject_1.NAVObject(fs.readFileSync(currentdocument.fsPath).toString(), Settings_1.Settings.GetConfigSettings(currentdocument), path.basename(currentdocument.fsPath));
    let objectId = navObject.objectType.toLowerCase().endsWith('extension') ? navObject.extendedObjectId : navObject.objectId;
    let objectType = navObject.objectType.toLowerCase().endsWith('extension') ? navObject.objectType.toLowerCase().replace('extension', '') : navObject.objectType;
    if (objectId) {
        DynamicsNAV_1.DynamicsNAV.RunObjectInWebClient(objectType, objectId, 'WebClient');
    }
    console.log('Done: RunCurrentObjectWeb');
}
exports.RunCurrentObjectWeb = RunCurrentObjectWeb;
function PublishAndRunCurrentObjectWeb(currFile) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Running: PublishAndRunCurrentObjectWeb');
        ApplicationInsights_1.AppInsights.getInstance().trackCommand('PublishAndRunCurrentObjectWeb');
        let currentdocument = currFile;
        if (!currentdocument) {
            currentdocument = vscode.window.activeTextEditor.document.uri;
        }
        let navObject = new NAVObject_1.NAVObject(fs.readFileSync(currentdocument.fsPath).toString(), Settings_1.Settings.GetConfigSettings(currentdocument), path.basename(currentdocument.fsPath));
        let objectId = navObject.objectType.toLowerCase().endsWith('extension') ? navObject.extendedObjectId : navObject.objectId;
        let objectType = navObject.objectType.toLowerCase().endsWith('extension') ? navObject.objectType.toLowerCase().replace('extension', '') : navObject.objectType;
        if (objectId) {
            yield vscode.commands.executeCommand('al.publishNoDebug');
            DynamicsNAV_1.DynamicsNAV.RunObjectInWebClient(objectType, objectId, 'WebClient');
        }
        console.log('Done: PublishAndRunCurrentObjectWeb');
    });
}
exports.PublishAndRunCurrentObjectWeb = PublishAndRunCurrentObjectWeb;
function RunObjectWeb() {
    console.log('Running: RunObjectWeb');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('RunObjectWeb');
    vscode.window.showQuickPick(DynamicsNAV_1.DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype => vscode.window.showInputBox({ prompt: 'ObjectID:' }).then(objectid => DynamicsNAV_1.DynamicsNAV.RunObjectInWebClient(objecttype, objectid, 'WebClient')));
    console.log('Done: RunObjectWeb');
}
exports.RunObjectWeb = RunObjectWeb;
function RunTestTool() {
    console.log('Running: RunTestTool');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('RunTestTool');
    DynamicsNAV_1.DynamicsNAV.RunObjectInWebClient('Page', 130451, 'WebClient');
    console.log('Done: RunTestTool');
}
exports.RunTestTool = RunTestTool;
function RunEventSubscribers() {
    console.log('Running: RunEventSubscribers');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('RunEventSubscribers');
    DynamicsNAV_1.DynamicsNAV.RunObjectInWebClient('Page', 9510, 'WebClient');
    console.log('Done: RunEventSubscribers');
}
exports.RunEventSubscribers = RunEventSubscribers;
function RunDatabaseLocks() {
    console.log('Running: RunDatabaseLocks');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('RunDatabaseLocks');
    DynamicsNAV_1.DynamicsNAV.RunObjectInWebClient('Page', 9511, 'WebClient');
    console.log('Done: RunDatabaseLocks');
}
exports.RunDatabaseLocks = RunDatabaseLocks;
function RunObjectTablet() {
    console.log('Running: RunObjectTablet');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('RunObjectTablet');
    vscode.window.showQuickPick(DynamicsNAV_1.DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype => vscode.window.showInputBox({ prompt: 'ObjectID:' }).then(objectid => DynamicsNAV_1.DynamicsNAV.RunObjectInWebClient(objecttype, objectid, 'Tablet')));
    console.log('Done: RunObjectTablet');
}
exports.RunObjectTablet = RunObjectTablet;
function RunObjectPhone() {
    console.log('Running: RunObjectPhone');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('RunObjectPhone');
    vscode.window.showQuickPick(DynamicsNAV_1.DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype => vscode.window.showInputBox({ prompt: 'ObjectID:' }).then(objectid => DynamicsNAV_1.DynamicsNAV.RunObjectInWebClient(objecttype, objectid, 'Phone')));
    console.log('Done: RunObjectPhone');
}
exports.RunObjectPhone = RunObjectPhone;
function RunObjectWindows() {
    console.log('Running: RunObjectWindows');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('RunObjectWindows');
    vscode.window.showQuickPick(DynamicsNAV_1.DynamicsNAV.GetRunRTCObjectTypesAsQuickPickItem()).then(objecttype => vscode.window.showInputBox({ prompt: 'ObjectID:' }).then(objectid => DynamicsNAV_1.DynamicsNAV.RunObjectInWindowsClient(objecttype, objectid)));
    console.log('Done: RunObjectWindows');
}
exports.RunObjectWindows = RunObjectWindows;
function RenameCurrentFile() {
    console.log('Running: RenameCurrentFile');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('RenameCurrentFile');
    vscode.window.activeTextEditor.document.save().then(saved => {
        let oldFilename = vscode.window.activeTextEditor.document;
        let newFileName = WorkspaceFiles_1.WorkspaceFiles.RenameFile(oldFilename.uri);
        if (oldFilename.uri.fsPath != newFileName) {
            WorkspaceFiles_1.WorkspaceFiles.openRenamedFile(newFileName);
        }
    });
    console.log('Done: RenameCurrentFile');
}
exports.RenameCurrentFile = RenameCurrentFile;
function RenameAllFiles() {
    console.log('Running: RenameAllFiles');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('RenameAllFiles');
    let mySettings = Settings_1.Settings.GetConfigSettings(null);
    let SkipWarningMessageOnRenameAll = mySettings[Settings_1.Settings.SkipWarningMessageOnRenameAll];
    if (!SkipWarningMessageOnRenameAll) {
        vscode.window.showWarningMessage('Are you sure to rename all files from all opened workspaces?', 'Yes', 'No').then((action) => {
            if (action === 'Yes') {
                WorkspaceFiles_1.WorkspaceFiles.RenameAllFiles();
                vscode.commands.executeCommand('workbench.action.closeAllEditors');
            }
        });
    }
    else {
        WorkspaceFiles_1.WorkspaceFiles.RenameAllFiles();
        vscode.commands.executeCommand('workbench.action.closeAllEditors');
    }
    console.log('Done: RenameAllFiles');
}
exports.RenameAllFiles = RenameAllFiles;
function ReorganizeCurrentFile() {
    console.log('Running: ReorganizeCurrentFile');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('ReorganizeCurrentFile');
    vscode.window.activeTextEditor.document.save().then(saved => {
        let newFileName = WorkspaceFiles_1.WorkspaceFiles.ReorganizeFile(vscode.window.activeTextEditor.document.uri);
        vscode.workspace.openTextDocument(newFileName).then(doc => vscode.window.showTextDocument(doc));
    });
    console.log('Done: ReorganizeCurrentFile');
}
exports.ReorganizeCurrentFile = ReorganizeCurrentFile;
function ReorganizeAllFiles() {
    console.log('Running: ReorganizeAllFiles');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('ReorganizeAllFiles');
    vscode.window.showWarningMessage('Are you sure to reorganize all files from all opened workspaces?', 'Yes', 'No').then((action) => {
        if (action === 'Yes') {
            WorkspaceFiles_1.WorkspaceFiles.ReorganizeAllFiles();
            vscode.commands.executeCommand('workbench.action.closeAllEditors');
        }
    });
    console.log('Done: ReorganizeAllFiles');
}
exports.ReorganizeAllFiles = ReorganizeAllFiles;
function SearchMicrosoftDocs() {
    console.log('Running: SearchMicrosoftDocs');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('SearchMicrosoftDocs');
    let currentword = vscode.window.activeTextEditor ? getWord(vscode.window.activeTextEditor) : "";
    vscode.window.showInputBox({ value: currentword, prompt: "Search String:" }).then(SearchString => MSDocs_1.MSDocs.OpenSearchUrl(SearchString));
    console.log('Done: SearchMicrosoftDocs');
}
exports.SearchMicrosoftDocs = SearchMicrosoftDocs;
function SearchGoogle() {
    console.log('Running: SearchGoogle');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('SearchGoogle');
    let currentword = vscode.window.activeTextEditor ? getWord(vscode.window.activeTextEditor) : "";
    vscode.window.showInputBox({ value: currentword, prompt: "Search String:" }).then(SearchString => Google_1.Google.OpenSearchUrl(SearchString));
    console.log('Done: SearchGoogle');
}
exports.SearchGoogle = SearchGoogle;
function SearchObjectNames() {
    console.log('Running: SearchObjectNames');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('SearchObjectNames');
    let currentword = vscode.window.activeTextEditor ? getWord(vscode.window.activeTextEditor) : "";
    vscode.window.showInputBox({ value: currentword, prompt: "Search String:" }).then(SearchString => DynamicsNAV_1.DynamicsNAV.SearchObjectNames(SearchString));
    console.log('Done: SearchObjectNames');
}
exports.SearchObjectNames = SearchObjectNames;
function SetupSnippets() {
    console.log('Running: SetupSnippets');
    SnippetFunctions_1.SnippetFunctions.SetupDefaultAlSnippets();
    SnippetFunctions_1.SnippetFunctions.SetupCRSAlSnippets();
    console.log('Done: SetupSnippets');
}
exports.SetupSnippets = SetupSnippets;
function HandleOnSaveTextDocument() {
    console.log('Running: HandleOnSaveTextDocument');
    WorkspaceFiles_1.WorkspaceFiles.renameFileOnSave();
    console.log('Done: HandleOnSaveTextDocument');
}
exports.HandleOnSaveTextDocument = HandleOnSaveTextDocument;
/*** changed to onDidChangeActiveTextEditor eventhandler
 * @deprecated
 */
function HandleOnOpenTextDocument() {
    console.log('Running: HandleOnOpenTextDocument');
    CRSStatusBar.toggleRunObjectFromStatusBar();
    console.log('Done: HandleOnOpenTextDocument');
}
exports.HandleOnOpenTextDocument = HandleOnOpenTextDocument;
function HandleOnChangeActiveTextEditor(editor) {
    console.log('Running: HandleOnChangeActiveTextEditor');
    CRSStatusBar.toggleRunObjectFromStatusBar(editor === null || editor === void 0 ? void 0 : editor.document);
    console.log('Done: HandleOnChangeActiveTextEditor');
}
exports.HandleOnChangeActiveTextEditor = HandleOnChangeActiveTextEditor;
function ConfigureBestPracticeNaming() {
    console.log('Running: ConfigureBestPracticeNaming');
    ApplicationInsights_1.AppInsights.getInstance().trackCommand('ConfigureBestPracticeNaming');
    Configuration.configureBestPracticesNaming();
    console.log('Done: ConfigureBestPracticeNaming');
}
exports.ConfigureBestPracticeNaming = ConfigureBestPracticeNaming;
function getWord(editor) {
    const selection = editor.selection;
    const doc = editor.document;
    if (selection.isEmpty) {
        const cursorWordRange = doc.getWordRangeAtPosition(selection.active);
        if (cursorWordRange) {
            let newSe = new vscode.Selection(cursorWordRange.start.line, cursorWordRange.start.character, cursorWordRange.end.line, cursorWordRange.end.character);
            editor.selection = newSe;
            return editor.document.getText(editor.selection);
        }
        else {
            return '';
        }
    }
    else {
        return editor.document.getText(editor.selection);
    }
}
//# sourceMappingURL=CRSFunctions.js.map