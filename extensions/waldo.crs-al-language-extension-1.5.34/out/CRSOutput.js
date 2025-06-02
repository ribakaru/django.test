"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showOutput = void 0;
const vscode = require("vscode");
var outputChannel = vscode.window.createOutputChannel("crs-al-language");
function showOutput(text, show) {
    if (text) {
        let currTime = new Date();
        outputChannel.append('\n' + currTime.toLocaleString() + ' - ' + text);
    }
    if (!text || show) {
        show ? outputChannel.show(vscode.ViewColumn.Three) : null;
    }
    // let appInsightsEntryProperties: any = {};
    // appInsightsEntryProperties.ConsoleLog = text;
    // AppInsights.getInstance().trackEvent(EventName.ConsoleLog, appInsightsEntryProperties);
}
exports.showOutput = showOutput;
//# sourceMappingURL=CRSOutput.js.map