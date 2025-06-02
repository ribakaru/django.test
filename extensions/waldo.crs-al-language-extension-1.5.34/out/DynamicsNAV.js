"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicsNAV = void 0;
const Settings_1 = require("./Settings");
const crsOutput = require("./CRSOutput");
const child_process_1 = require("child_process");
const vscode = require("vscode");
const ApplicationInsights_1 = require("./ApplicationInsights");
const open = require('open');
class DynamicsNAV {
    static GetAllObjectTypesAsQuickPickItem() {
        let items = [];
        items.push({ label: 'Table', description: 'Table' });
        items.push({ label: 'Page', description: 'Page' });
        items.push({ label: 'Report', description: 'Report' });
        items.push({ label: 'Codeunit', description: 'Codeunit' });
        items.push({ label: 'Query', description: 'Query' });
        items.push({ label: 'XMLPort', description: 'XMLPort' });
        items.push({ label: 'MenuSuite', description: 'MenuSuite' });
        items.push({ label: 'Interface', description: 'Interface' });
        items.push({ label: 'PermissionSet', description: 'PermissionSet' });
        return items;
    }
    static GetAllObjectTypes() {
        let items = [];
        items.push('Table');
        items.push('Page');
        items.push('Report');
        items.push('Codeunit');
        items.push('Query');
        items.push('XMLPort');
        items.push('MenuSuite');
        items.push('Interface');
        items.push('PermissionSet');
        return items;
    }
    static GetRunRTCObjectTypesAsQuickPickItem() {
        let items = [];
        items.push({ label: 'Table', description: 'Table' });
        items.push({ label: 'Page', description: 'Page' });
        items.push({ label: 'Report', description: 'Report' });
        items.push({ label: 'Codeunit', description: 'Codeunit' });
        items.push({ label: 'Query', description: 'Query' });
        items.push({ label: 'XMLPort', description: 'XMLPort' });
        return items;
    }
    static GetRunRTCObjectTypes() {
        let items = [];
        items.push('Table');
        items.push('Page');
        items.push('Report');
        items.push('Codeunit');
        items.push('Query');
        items.push('XMLPort');
        return items;
    }
    static GetRunWebObjectTypesAsQuickPickItem() {
        let items = [];
        items.push({ label: 'Page', description: 'Page' });
        items.push({ label: 'Query', description: 'Query' });
        items.push({ label: 'Report', description: 'Report' });
        items.push({ label: 'Table', description: 'Table' });
        return items;
    }
    static GetRunWebObjectTypes() {
        let items = [];
        items.push('Page');
        items.push('Query');
        items.push('Report');
        items.push('Table');
        return items;
    }
    static RunObjectInWebClient(objecttype, objectid, clienttype) {
        let workspacesettings = Settings_1.Settings.GetAllSettings(null);
        if (clienttype != 'WebClient') {
            clienttype = clienttype + '.aspx';
        }
        let objectType = (!objecttype.label) ? objecttype : objecttype.label;
        let runURL = this.ComposeRunObjectInWebClientURL(workspacesettings, clienttype, objectType.toString(), objectid);
        console.log('url: ' + runURL);
        switch (workspacesettings[Settings_1.Settings.Browser]) {
            case 'Edge':
            case 'EdgeBeta':
                open(`microsoft-edge:${runURL}`);
                break;
            case 'Firefox':
                runURL = workspacesettings[Settings_1.Settings.Incognito] == true ? '-private-window ' + runURL : runURL;
                (0, child_process_1.exec)(`start firefox "${runURL}"`, { shell: 'cmd.exe' });
                break;
            case 'Chrome':
                runURL = workspacesettings[Settings_1.Settings.Incognito] == true ? '-incognito ' + runURL : runURL;
                (0, child_process_1.exec)(`start chrome "${runURL}"`, { shell: 'cmd.exe' });
                vscode.window.showWarningMessage('Running an object in Chrome might not work.  Use Edge instead (you can set al.Browser setting to Edge (in User Settings)).');
                break;
            default:
                crsOutput.showOutput("If you're using Chrome, the 'run object' command might not work.  Use Edge instead (you can set al.Browser setting to Edge (in User Settings)).", true);
                open(runURL);
                break;
        }
        crsOutput.showOutput(`RunObjectInWebClient - ${runURL}`);
        let appInsightsEntryProperties = {};
        appInsightsEntryProperties.runURL = runURL;
        ApplicationInsights_1.AppInsights.getInstance().trackEvent(ApplicationInsights_1.EventName.RunObjectWeb, appInsightsEntryProperties);
    }
    static ComposeRunObjectInWebClientURL(workspacesettings, ClientType, runObjectType, runObjectid) {
        let returnUrl = "https://businesscentral.dynamics.com/";
        returnUrl += workspacesettings[Settings_1.Settings.SandboxName] ? workspacesettings[Settings_1.Settings.SandboxName] : 'sandbox';
        returnUrl += '?';
        if (workspacesettings[Settings_1.Settings.WebServer]) {
            if (workspacesettings[Settings_1.Settings.PublicWebBaseUrl]) {
                returnUrl = workspacesettings[Settings_1.Settings.PublicWebBaseUrl];
            }
            else {
                returnUrl = workspacesettings[Settings_1.Settings.WebServer];
                if (workspacesettings[Settings_1.Settings.WebServerInstancePort] != "") {
                    returnUrl += ':' + workspacesettings[Settings_1.Settings.WebServerInstancePort];
                }
                returnUrl += '/' + workspacesettings[Settings_1.Settings.WebServerInstance];
            }
            returnUrl += '/' + ClientType;
            if (workspacesettings[Settings_1.Settings.Tenant] != '') {
                returnUrl += '?tenant=' + workspacesettings[Settings_1.Settings.Tenant] + '&';
            }
            else {
                returnUrl += '?';
            }
        }
        returnUrl += runObjectType + '=' + runObjectid;
        return returnUrl;
    }
    static RunObjectInWindowsClient(objecttype, objectid) {
        let workspacesettings = Settings_1.Settings.GetAllSettings(null);
        let runURL = this.ComposeRunObjectInWindowsClientURL(workspacesettings[Settings_1.Settings.WinServer], workspacesettings[Settings_1.Settings.WinServerInstancePort], workspacesettings[Settings_1.Settings.WinServerInstance], workspacesettings[Settings_1.Settings.Tenant], objecttype.label, objectid);
        console.log('url: ' + runURL);
        open(runURL);
    }
    static ComposeRunObjectInWindowsClientURL(server, Port, NAVInstance, Tenant, runObjectType, runObjectid) {
        return "DynamicsNAV://" + server + ':' + Port + '/' + NAVInstance + '//Run' + runObjectType + '?' + runObjectType + '=' + runObjectid + '&tenant=' + Tenant;
    }
    static getBestPracticeAbbreviatedObjectType(ObjectType) {
        //https://docs.microsoft.com/da-dk/dynamics-nav/compliance/apptest-bestpracticesforalcode
        switch (ObjectType.trim().toLowerCase()) {
            case 'page': return 'Pag';
            case 'pageextension': return 'Pag';
            case 'codeunit': return 'Cod';
            case 'table': return 'Tab';
            case 'tableextension': return 'Tab';
            case 'reportextension': return 'Rep';
            case 'xmlport': return 'Xml';
            case 'report': return 'Rep';
            case 'query': return 'Que';
            case 'profile': return 'Prof';
            case 'pagecustomization': return 'Pag';
            case 'enum': return 'Enum';
            case 'enumextension': return 'Enum';
            case 'controladdin': return 'ControlAddIn';
            case 'interface': return 'Iface';
            case 'requestpage': return 'RequestPage';
            case 'dotnet': return 'Dotnet';
            case 'permissionset': return 'PermissionSet';
            case 'permissionsetextension': return 'PermissionSetExt';
            case 'entitlement': return 'Entitlement';
        }
    }
    static getBestPracticeObjectTypeInPascalCase(ObjectType) {
        switch (ObjectType.trim().toLowerCase()) {
            case 'page': return 'Page';
            case 'pageextension': return 'PageExt';
            case 'codeunit': return 'Codeunit';
            case 'table': return 'Table';
            case 'tableextension': return 'TableExt';
            case 'reportextension': return 'ReportExt';
            case 'xmlport': return 'XmlPort';
            case 'report': return 'Report';
            case 'query': return 'Query';
            case 'profile': return 'Profile';
            case 'pagecustomization': return 'PageCust';
            case 'enum': return 'Enum';
            case 'enumextension': return 'EnumExt';
            case 'controladdin': return 'ControlAddin';
            case 'interface': return 'Interface';
            case 'permissionset': return 'PermissionSet';
            case 'permissionsetextension': return 'PermissionSetExt';
            case 'entitlement': return 'Entitlement';
        }
    }
    static SearchObjectNames(SearchString) {
        let workspacesettings = Settings_1.Settings.GetConfigSettings(null);
        SearchString = workspacesettings[Settings_1.Settings.SearchObjectNamesRegexPattern] + SearchString;
        vscode.commands.executeCommand('workbench.action.findInFiles', {
            query: SearchString,
            triggerSearch: true,
            matchWholeWord: false,
            isCaseSensitive: false,
        });
        crsOutput.showOutput('SearchObjectNames: ' + SearchString);
        let appInsightsEntryProperties = {};
        appInsightsEntryProperties.SearchString = SearchString;
        ApplicationInsights_1.AppInsights.getInstance().trackEvent(ApplicationInsights_1.EventName.SearchObjectNames, appInsightsEntryProperties);
    }
    static isKeyWord(value) {
        return DynamicsNAV.getAllKeywordsLowerCased().indexOf(value.toLowerCase()) != -1;
    }
    static getAllKeywordsLowerCased() {
        var lowerCasedNames = this.getAllKeywords().map(value => {
            return value.toLowerCase();
        });
        return lowerCasedNames;
    }
    static getAllKeywords() {
        //Source: AL Variable Helper Source Code (Thank you Rasmus ;-))
        let keywords = [
            "Confirm",
            "Count",
            "TestField",
            "BigText",
            "DateTime",
            "Validate",
            "Blob",
            "Codeunit",
            "DateFormula",
            "Dialog",
            "FieldRef",
            "File",
            "Guid",
            "InStream",
            "OutStream",
            "KeyRef",
            "Page",
            "Record",
            "RecordId",
            "RecordRef",
            "Report",
            "System",
            "TableFilter",
            "BigInteger",
            "Binary",
            "Boolean",
            "Char",
            "Code",
            "Date",
            "DateTime",
            "Decimal",
            "Duration",
            "Integer",
            "Option",
            "Text",
            "Time",
            "Variant",
            "and",
            "AssertError",
            "begin",
            "case",
            "div",
            "do",
            "downto",
            "else",
            "end",
            "exit",
            "for",
            "if",
            "in",
            "mod",
            "not",
            "of",
            "or",
            "repeat",
            "then",
            "to",
            "until",
            "while",
            "with",
            "with",
            "var",
            "procedure",
            "temporary",
            "true",
            "false",
            "XmlPort",
            "TextConst",
            "Error",
            "Message",
            "CalcFields",
            "CalcSums",
            "SetRange",
            "SetFilter",
            "Format",
            "RunModal",
            "Run",
            "Action",
            "SetTableView",
            "where",
            "field",
            "SetRecord",
            "GetRecord",
            "LookupMode",
            "const",
            "filter",
            "LowerCase",
            "StrSubstNo",
            "TextEncoding",
            "Enum",
            "Label",
            "StrLen",
            "ConvertStr",
            "CopyStr",
            "sorting",
            "Next",
            "Evaluate",
            "SelectStr",
            "Editable",
            "FieldError",
            "Round",
            "Commit",
            "GuiAllowed",
            "FindSet",
            "FindFirst",
            "FindLast",
            "Find",
            "IsEmpty",
            "Reset",
            "DeleteAll",
            "Clear",
            "UserId",
            "Update",
            "Insert",
            "HasValue",
            "Delete",
            "Init",
            "Get",
            "Count",
            "Skip",
            "GetFilters",
            "UseRequestPage",
            "Preview",
            "TableCaption",
            "codeunit",
            "record",
            "page",
            "pagecustomization",
            "pageextension",
            "reportextension",
            "permissionset",
            "entitlement",
            "permissionsetextension",
            "extends",
            "tableextension",
            "table",
            "xmlport",
            "query",
            "report",
            "FieldCaption",
            "grid",
            "profile",
            "Key",
            "Area",
            "Actions",
            "Trigger",
            "Interface",
            "Event"
        ];
        return keywords;
    }
}
exports.DynamicsNAV = DynamicsNAV;
//# sourceMappingURL=DynamicsNAV.js.map