"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALGraphVis = void 0;
const crsOutput = require("./CRSOutput");
const Settings_1 = require("./Settings");
const ApplicationInsights_1 = require("./ApplicationInsights");
class ALGraphVis {
    constructor() {
        this._graphVizText = [];
        this._workSpaceSettings = Settings_1.Settings.GetConfigSettings(null);
    }
    // addDependency(dependency: any);
    addDependency(app, dependency) {
        if (this._workSpaceSettings[Settings_1.Settings.DependencyGraphExcludePublishers].includes(dependency.publisher)) {
            return;
        }
        ;
        if (this._workSpaceSettings[Settings_1.Settings.DependencyGraphExcludePublishers].includes(app.publisher)) {
            return;
        }
        ;
        if (this._workSpaceSettings[Settings_1.Settings.DependencyGraphExcludeAppNames].includes(dependency.name)) {
            return;
        }
        ;
        if (this._workSpaceSettings[Settings_1.Settings.DependencyGraphExcludeAppNames].includes(app.name)) {
            return;
        }
        ;
        if ((!this._workSpaceSettings[Settings_1.Settings.DependencyGraphIncludeTestApps]) && dependency.isTestApp) {
            return;
        }
        ;
        if ((!this._workSpaceSettings[Settings_1.Settings.DependencyGraphIncludeTestApps]) && app.isTestApp) {
            return;
        }
        ;
        let removePrefix = this._workSpaceSettings[Settings_1.Settings.DependencyGraphRemovePrefix];
        let appName = app.name.startsWith(removePrefix) ? app.name.substr(removePrefix.length) : app.name;
        let dependencyName = dependency.name.startsWith(removePrefix) ? dependency.name.substr(removePrefix.length) : dependency.name;
        let dependencyTxt = `"${appName}" -> "${dependencyName}"`;
        crsOutput.showOutput(dependencyTxt, false);
        this._graphVizText.push(dependencyTxt);
    }
    get graphVizText() {
        return this._graphVizText;
    }
    get dotContent() {
        let result = `digraph G {\n`;
        this._graphVizText.forEach(line => {
            result += line + '\n';
        });
        result += '}';
        let appInsightsEntryProperties = {};
        appInsightsEntryProperties.Result = result;
        ApplicationInsights_1.AppInsights.getInstance().trackEvent(ApplicationInsights_1.EventName.CreateGraphVizDependencyGraph, appInsightsEntryProperties);
        return result;
    }
}
exports.ALGraphVis = ALGraphVis;
//# sourceMappingURL=ALGraphVis.js.map