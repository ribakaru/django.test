"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTerminal = exports.CompileDGML = exports.OpenFileFromTerminal = exports.GitCommit = exports.GitMove = void 0;
const vscode = require("vscode");
const extension_1 = require("./extension");
function GitMove(from, to) {
    (0, extension_1.Terminal)().sendText(`git mv ${from} ${to}`);
}
exports.GitMove = GitMove;
function GitCommit(filepath) {
    (0, extension_1.Terminal)().sendText(`git add ${filepath}`);
    (0, extension_1.Terminal)().sendText(`git stage ${filepath}`);
    (0, extension_1.Terminal)().sendText(`git commit -m 'Commit ${filepath} before rename'`);
}
exports.GitCommit = GitCommit;
function OpenFileFromTerminal(path) {
    //Terminal().show();
    (0, extension_1.Terminal)().sendText(`code "${path}"`);
}
exports.OpenFileFromTerminal = OpenFileFromTerminal;
function CompileDGML(alcpath, projectpath, packagecachepath) {
    packagecachepath = packagecachepath ? packagecachepath : projectpath + '/.alpackages';
    (0, extension_1.Terminal)().sendText(`$Temp = Get-Location`);
    (0, extension_1.Terminal)().sendText(`Set-Location "${alcpath}"`);
    (0, extension_1.Terminal)().sendText(`./alc.exe /project:"${projectpath}" /packagecachepath:"${packagecachepath}" /generatecrossreferences`);
    (0, extension_1.Terminal)().sendText(`Set-Location $Temp`);
    (0, extension_1.Terminal)().show();
}
exports.CompileDGML = CompileDGML;
function GetTerminal(terminalName = 'crs') {
    const terminals = vscode.window.terminals.filter(element => element.name === terminalName);
    if (terminals.length > 0) {
        return terminals.shift();
    }
    else {
        return vscode.window.createTerminal(terminalName);
    }
}
exports.GetTerminal = GetTerminal;
//# sourceMappingURL=CRSTerminal.js.map