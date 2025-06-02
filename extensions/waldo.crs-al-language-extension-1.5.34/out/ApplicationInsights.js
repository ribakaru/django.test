"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventName = exports.AppInsights = void 0;
const Settings_1 = require("./Settings");
class AppInsights {
    constructor() {
    }
    static getInstance() {
        if (!AppInsights._instance) {
            AppInsights._instance = new AppInsights();
        }
        return AppInsights._instance;
    }
    start() {
        if (this.started) {
            return;
        }
        ;
        this.appInsights = require('applicationinsights');
        this.appInsights.setup("InstrumentationKey=b3550667-aa59-41e0-b132-41e7e0d7a70d;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com/;LiveEndpoint=https://westeurope.livediagnostics.monitor.azure.com/")
            .setAutoCollectPerformance(false, false)
            .setAutoCollectExceptions(false)
            .start();
        this.client = this.appInsights.defaultClient;
        this.started = true;
    }
    trackTrace(message) {
        this.start();
        this.client.trackTrace({ message: message });
    }
    trackCommand(command) {
        this.start();
        this.trackTrace(`Command ${command} was executed.`);
    }
    trackEvent(name, properties) {
        this.start();
        try {
            let workspacesettings = Settings_1.Settings.GetAllSettings(null);
            properties.AppId = workspacesettings[Settings_1.Settings.AppId];
        }
        catch (error) {
            properties.AppId = 'unknown';
        }
        this.client.trackEvent({ name: name.toString(), properties: properties });
    }
}
exports.AppInsights = AppInsights;
var EventName;
(function (EventName) {
    EventName["ConsoleLog"] = "ConsoleLog";
    EventName["GitMove"] = "GitMove";
    EventName["SetupSnippets"] = "SetupSnippets";
    EventName["SnippetsEnabled"] = "SnippetsEnabled";
    EventName["SnippetsDisabled"] = "SnippetsDisabled";
    EventName["CreateGraphVizDependencyGraph"] = "CreateGraphVizDependencyGraph";
    EventName["CompileDGML"] = "CompileDGML";
    EventName["RunCurrentObjectWeb"] = "RunCurrentObjectWeb";
    EventName["PublishAndRunCurrentObjectWeb"] = "PublishAndRunCurrentObjectWeb";
    EventName["RunObjectWeb"] = "RunObjectWeb";
    EventName["RunTestTool"] = "RunTestTool";
    EventName["RunEventSubscribers"] = "RunEventSubscribers";
    EventName["RunDatabaseLocks"] = "RunDatabaseLocks";
    EventName["RunObjectTablet"] = "RunObjectTablet";
    EventName["RunObjectPhone"] = "RunObjectPhone";
    EventName["RunObjectWindows"] = "RunObjectWindows";
    EventName["RenameFile"] = "RenameFile";
    EventName["RenameCurrentFile"] = "RenameCurrentFile";
    EventName["RenameAllFiles"] = "RenameAllFiles";
    EventName["ReorganizeCurrentFile"] = "ReorganizeCurrentFile";
    EventName["ReorganizeAllFiles"] = "ReorganizeAllFiles";
    EventName["SearchMicrosoftDocs"] = "SearchMicrosoftDocs";
    EventName["SearchGoogle"] = "SearchGoogle";
    EventName["SearchObjectNames"] = "SearchObjectNames";
    EventName["HandleOnSaveTextDocument"] = "HandleOnSaveTextDocument";
    EventName["HandleOnOpenTextDocument"] = "HandleOnOpenTextDocument";
    EventName["HandleOnChangeActiveTextEditor"] = "HandleOnChangeActiveTextEditor";
    EventName["ConfigureBestPracticeNaming"] = "ConfigureBestPracticeNaming";
})(EventName = exports.EventName || (exports.EventName = {}));
//# sourceMappingURL=ApplicationInsights.js.map