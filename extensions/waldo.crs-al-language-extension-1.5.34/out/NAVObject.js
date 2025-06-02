"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAVObject = void 0;
const Settings_1 = require("./Settings");
const StringFunctions_1 = require("./StringFunctions");
const DynamicsNAV_1 = require("./DynamicsNAV");
const vscode = require("vscode");
class NAVObject {
    constructor(navObject, workSpaceSettings, navObjectFileBaseName) {
        this.objectActions = new Array();
        this.tableFields = new Array();
        this.pageFields = new Array();
        this.pageGroups = new Array();
        this.reportColumns = new Array();
        // Windows chars not allowed in filenames or paths (includes Linux):
        // < (less than)
        // > (greater than)
        // : (colon - sometimes works, but is actually NTFS Alternate Data Streams)
        // " (double quote)
        // / (forward slash)
        // \ (backslash)
        // | (vertical bar or pipe)
        // ? (question mark)
        // * (asterisk)
        this.prohibitedFilenameCharsPattern = '<>:"/\\\\|\\?\\*';
        this.NAVObjectText = navObject;
        this.objectFileName = navObjectFileBaseName;
        this._workSpaceSettings = workSpaceSettings;
        if (this.NAVObjectText)
            this.loadObjectProperties();
    }
    setObjectProperies(objectType, objectId, objectName) {
        this._objectFileNamePattern = this._workSpaceSettings[Settings_1.Settings.FileNamePattern];
        this.objectType = objectType;
        this.objectId = objectId;
        this.objectName = objectName;
        this.extendedObjectName = '';
        this.extendedObjectId = '';
    }
    setObjectExtensionProperies(objectType, objectId, objectName, extendedObjectId, extendedObjectName) {
        this._objectFileNamePattern = this._workSpaceSettings[Settings_1.Settings.FileNamePatternExtensions];
        this.objectType = objectType;
        this.objectId = objectId;
        this.objectName = objectName;
        this.extendedObjectName = extendedObjectName;
        this.extendedObjectId = extendedObjectId;
    }
    get objectTypeShort() {
        return DynamicsNAV_1.DynamicsNAV.getBestPracticeAbbreviatedObjectType(this.objectType);
    }
    get ObjectTypeShortPascalCase() {
        return DynamicsNAV_1.DynamicsNAV.getBestPracticeObjectTypeInPascalCase(this.objectType);
    }
    get objectNameFixed() {
        let objectNameFixed = this.ApplyExtensionObjectNamePattern(this.objectName.trim().toString());
        if (objectNameFixed == this.objectName.trim().toString()) {
            objectNameFixed = this.AddPrefixAndSuffixToObjectNameFixed(objectNameFixed);
        }
        //Accept original value when characters added to the end of the objectname
        if (this.objectName.startsWith(objectNameFixed)) {
            objectNameFixed = this.objectName;
        }
        return objectNameFixed;
    }
    get objectNameFixedForFileName() {
        let objectNameFixed = this.RemovePrefixAndSuffix(this.objectNameFixed);
        return objectNameFixed.replace(new RegExp(`[${this.prohibitedFilenameCharsPattern}]`, 'g'), '_');
    }
    get objectNameFixedShort() {
        if (this.objectNameFixed.length > 30) {
            return StringFunctions_1.StringFunctions.removeAllButAlfaNumeric(this.RemovePrefixAndSuffix(this.objectName));
        }
        else {
            return StringFunctions_1.StringFunctions.removeAllButAlfaNumeric(this.RemovePrefixAndSuffix(this.objectNameFixed));
        }
    }
    get extendedObjectNameFixed() {
        let extendedObjectName = this.extendedObjectName.trim().toString();
        return extendedObjectName;
    }
    get extendedObjectNameFixedForFileName() {
        let extendedObjectName = this.extendedObjectNameFixed;
        return extendedObjectName.replace(new RegExp(`[${this.prohibitedFilenameCharsPattern}]`, 'g'), '_');
    }
    get extendedObjectNameFixedShort() {
        return StringFunctions_1.StringFunctions.removeAllButAlfaNumeric(this.extendedObjectNameFixed);
    }
    get NAVObjectTextFixed() {
        let NAVObjectTextFixed = this.NAVObjectText;
        NAVObjectTextFixed = this.updateObjectNameInObjectText(NAVObjectTextFixed);
        NAVObjectTextFixed = this.AddPrefixAndSuffixToActions(NAVObjectTextFixed);
        NAVObjectTextFixed = this.AddPrefixAndSuffixToFields(NAVObjectTextFixed);
        NAVObjectTextFixed = this.AddPrefixAndSuffixToPageFields(NAVObjectTextFixed);
        NAVObjectTextFixed = this.AddPrefixAndSuffixToPageGroups(NAVObjectTextFixed);
        NAVObjectTextFixed = this.AddPrefixAndSuffixToReportColumns(NAVObjectTextFixed);
        return NAVObjectTextFixed;
    }
    get objectFileNameFixed() {
        if (!this._objectFileNamePattern) {
            return this.objectFileName;
        }
        let objectFileNameFixed = this._objectFileNamePattern;
        objectFileNameFixed = this.ApplyPatternToFileName(objectFileNameFixed);
        objectFileNameFixed = this.RemoveUnderscore(objectFileNameFixed);
        return objectFileNameFixed;
    }
    get objectCodeunitSubType() {
        if (this.objectType.toLowerCase() != 'codeunit') {
            return null;
        }
        var reg = /(Subtype) *= *(.+);/g;
        var result = reg.exec(this.NAVObjectText);
        if (result !== null) {
            return result[2];
        }
        return null;
    }
    loadObjectProperties() {
        var patternObjectType = new RegExp('(codeunit |page |pagecustomization |pageextension |reportextension |permissionset |permissionsetextension |profile |query |report |requestpage |table |tableextension |xmlport |enum |enumextension |controladdin |interface |entitlement)', "i");
        //Remove content between crs-al disable -> enable
        var initNAVObjectText = this.NAVObjectText;
        var patternIgnoreRange = new RegExp('\/\/crs\-al\ disable.*?\/\/crs\-al\ enable', "gis");
        this.NAVObjectText = this.NAVObjectText.replace(patternIgnoreRange, "");
        //Remove comments to apply regex to
        var lines = this.NAVObjectText.split('\n');
        var filteredlines = lines.filter(function (line) {
            return line.trimLeft().indexOf('//') != 0;
        });
        let ObjectTypeArr = filteredlines.toString().match(patternObjectType);
        this._objectFileNamePattern = '';
        this.objectType = '';
        this.objectId = '';
        this.objectName = '';
        this.objectNamespace = '';
        this.extendedObjectName = '';
        this.extendedObjectId = '';
        var ObjectNamePattern = '"[^"]*"'; // All characters except "
        var ObjectNameNoQuotesPattern = '[\\w]*';
        if (!ObjectTypeArr) {
            return null;
        }
        if (ObjectTypeArr) {
            const objectType = ObjectTypeArr[0].trim().toLowerCase();
            switch (objectType) {
                case 'page':
                case 'codeunit':
                case 'query':
                case 'report':
                case 'requestpage':
                case 'table':
                case 'xmlport':
                case 'permissionset':
                case 'enum': {
                    var patternObject = new RegExp(`(${ObjectTypeArr[0].trim().toLowerCase()}) +([0-9]+) +(${ObjectNamePattern}|${ObjectNameNoQuotesPattern})([^"\n]*"[^"\n]*)?`, "i");
                    let currObject = this.NAVObjectText.match(patternObject);
                    if (currObject == null) {
                        //throw new Error(`File '${this.objectFileName}' does not have valid object name. Maybe it got double quotes (") in the object name?`)
                        vscode.window.showErrorMessage(`File '${this.objectFileName}' does not have valid object name. Maybe it got double quotes (") in the object name?`);
                        return null;
                    }
                    this.objectType = currObject[1];
                    this.objectId = currObject[2];
                    this.objectName = currObject[3];
                    this._objectFileNamePattern = this._workSpaceSettings[Settings_1.Settings.FileNamePattern];
                    break;
                }
                case 'pageextension':
                case 'tableextension':
                case 'reportextension':
                case 'permissionsetextension':
                case 'enumextension': {
                    var patternObject = new RegExp(`(${ObjectTypeArr[0].trim().toLowerCase()}) +([0-9]+) +(${ObjectNamePattern}|${ObjectNameNoQuotesPattern}) +extends +(${ObjectNamePattern}|${ObjectNameNoQuotesPattern})\\s*(\\/\\/\\s*)?([0-9]+)?`, "i");
                    let currObject = this.NAVObjectText.match(patternObject);
                    if (currObject == null) {
                        //throw new Error(`File '${this.objectFileName}' does not have valid object names. Maybe it got double quotes (") in the object name?`)
                        vscode.window.showErrorMessage(`File '${this.objectFileName}' does not have valid object name. Maybe it got double quotes (") in the object name?`);
                        return null;
                    }
                    this.objectType = currObject[1];
                    this.objectId = currObject[2];
                    this.objectName = currObject[3];
                    this.extendedObjectName = currObject[4];
                    this.extendedObjectId = currObject[6] ? currObject[6] : '';
                    this._objectFileNamePattern = this._workSpaceSettings[Settings_1.Settings.FileNamePatternExtensions];
                    break;
                }
                case 'entitlement':
                case 'interface': {
                    var patternObject = new RegExp(`(${objectType})( +"?[ a-zA-Z0-9._/&-]+"?)`, "i");
                    let currObject = this.NAVObjectText.match(patternObject);
                    this.objectType = currObject[1];
                    this.objectId = '';
                    this.objectName = currObject[2];
                    this._objectFileNamePattern = this._workSpaceSettings[Settings_1.Settings.FileNamePattern];
                    break;
                }
                case 'profile': {
                    var patternObject = new RegExp('(profile)( +"?[ a-zA-Z0-9._/&-]+"?)', "i");
                    let currObject = this.NAVObjectText.match(patternObject);
                    this.objectType = currObject[1];
                    this.objectId = '';
                    this.objectName = currObject[2];
                    this._objectFileNamePattern = this._workSpaceSettings[Settings_1.Settings.FileNamePattern];
                    break;
                }
                case 'controladdin': {
                    var patternObject = new RegExp('(controladdin)( +"?[ a-zA-Z0-9._/&-]+"?)', "i");
                    let currObject = this.NAVObjectText.match(patternObject);
                    this.objectType = currObject[1];
                    this.objectId = '';
                    this.objectName = currObject[2];
                    this._objectFileNamePattern = this._workSpaceSettings[Settings_1.Settings.FileNamePattern];
                    break;
                }
                case 'pagecustomization': {
                    var patternObject = new RegExp(`(${ObjectTypeArr[0].trim().toLowerCase()})( +"?[ a-zA-Z0-9._/&-]+"?) +customizes( +"?[ a-zA-Z0-9._&-]+\\/?[ a-zA-Z0-9._&-]+"?) (\\/\\/+ *)?([0-9]+)?`, "i");
                    let currObject = this.NAVObjectText.match(patternObject);
                    this.objectType = currObject[1];
                    this.objectId = '';
                    this.objectName = currObject[2];
                    this.extendedObjectName = currObject[3];
                    this.extendedObjectId = currObject[5] ? currObject[5] : '';
                    this._objectFileNamePattern = this._workSpaceSettings[Settings_1.Settings.FileNamePatternPageCustomizations];
                    break;
                }
                default: {
                    //Error('Not able to parse this file: ' + this.NAVObjectText);
                    vscode.window.showErrorMessage('Not able to parse this file: ' + this.NAVObjectText);
                    return null;
                }
            }
            var patternObject = new RegExp('namespace\\s+([A-Za-z0-9_.]+?)\\s*;', "i");
            var match = this.NAVObjectText.match(patternObject);
            if (match && match[1]) {
                this.objectNamespace = match[1];
            }
            this.objectType = this.objectType.trim().toString();
            this.objectId = this.objectId.trim().toString();
            this.objectName = this.objectName.trim().toString().replace(/["]/g, '');
            this.extendedObjectName = this.extendedObjectName.trim().toString().replace(/["]/g, '');
            this.extendedObjectId = this.extendedObjectId.trim().toString();
        }
        if (!(this.IsValidObjectType(this.objectType))) {
            //reset variables
            this._objectFileNamePattern = '';
            this.objectType = '';
            this.objectId = '';
            this.objectName = '';
            this.objectNamespace = '';
            this.extendedObjectName = '';
            this.extendedObjectId = '';
            return null;
        }
        var reg = NAVObjectAction.actionRegEx();
        var result;
        while ((result = reg.exec(this.NAVObjectText)) !== null) {
            this.objectActions.push(new NAVObjectAction(result[1], this.objectType, this._workSpaceSettings[Settings_1.Settings.ObjectNamePrefix], this._workSpaceSettings[Settings_1.Settings.ObjectNameSuffix], this._workSpaceSettings[Settings_1.Settings.MandatoryAffixes]));
        }
        var reg = NAVTableField.fieldRegEx();
        var result;
        while ((result = reg.exec(this.NAVObjectText)) !== null) {
            this.tableFields.push(new NAVTableField(result[1], this.objectType, this._workSpaceSettings[Settings_1.Settings.ObjectNamePrefix], this._workSpaceSettings[Settings_1.Settings.ObjectNameSuffix], this._workSpaceSettings[Settings_1.Settings.MandatoryAffixes]));
        }
        if ((this.objectType.toLocaleLowerCase().startsWith('page')) || (this.objectType.toLocaleLowerCase().startsWith('report'))) { //page-stuff should only be parsed for pages
            var reg = NAVPageField.fieldRegEx();
            var result;
            while ((result = reg.exec(this.NAVObjectText)) !== null) {
                this.pageFields.push(new NAVPageField(result[1], this.objectType, this._workSpaceSettings[Settings_1.Settings.ObjectNamePrefix], this._workSpaceSettings[Settings_1.Settings.ObjectNameSuffix], this._workSpaceSettings[Settings_1.Settings.MandatoryAffixes]));
            }
            var reg = NAVPageGroup.fieldRegEx();
            var result;
            while ((result = reg.exec(this.NAVObjectText)) !== null) {
                this.pageGroups.push(new NAVPageGroup(result[1], this.objectType, this._workSpaceSettings[Settings_1.Settings.ObjectNamePrefix], this._workSpaceSettings[Settings_1.Settings.ObjectNameSuffix], this._workSpaceSettings[Settings_1.Settings.MandatoryAffixes]));
            }
        }
        var reg = NAVReportColumn.columnRegEx();
        var result;
        while ((result = reg.exec(this.NAVObjectText)) !== null) {
            this.reportColumns.push(new NAVReportColumn(result[1], this.objectType, this._workSpaceSettings[Settings_1.Settings.ObjectNamePrefix], this._workSpaceSettings[Settings_1.Settings.ObjectNameSuffix], this._workSpaceSettings[Settings_1.Settings.MandatoryAffixes]));
        }
        this.NAVObjectText = initNAVObjectText;
    }
    IsValidObjectType(objectType) {
        switch (objectType.toLowerCase()) {
            case 'codeunit':
            case 'page':
            case 'pagecustomization':
            case 'pageextension':
            case 'reportextension':
            case 'profile':
            case 'query':
            case 'report':
            case 'requestpage':
            case 'table':
            case 'tableextension':
            case 'xmlport':
            case 'enum':
            case 'enumextension':
            case 'controladdin':
            case 'interface':
            case 'permissionset':
            case 'permissionsetextension':
            case 'entitlement':
                return true;
            default: return false;
        }
    }
    ApplyExtensionObjectNamePattern(objectName) {
        if (!this._workSpaceSettings[Settings_1.Settings.ExtensionObjectNamePattern] || !this.objectType.toLocaleLowerCase().endsWith('extension')) {
            return objectName;
        }
        let result = this._workSpaceSettings[Settings_1.Settings.ExtensionObjectNamePattern];
        result = this.ApplyPatternToObjectName(result);
        return result;
    }
    ApplyPatternToObjectName(pattern) {
        let result = pattern;
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<Prefix>', this._workSpaceSettings[Settings_1.Settings.ObjectNamePrefix]);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<Suffix>', this._workSpaceSettings[Settings_1.Settings.ObjectNameSuffix]);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<ObjectType>', this.objectType);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<ObjectTypeShort>', this.objectTypeShort);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<ObjectTypeShortPascalCase>', this.ObjectTypeShortPascalCase);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<ObjectTypeShortUpper>', this.objectTypeShort.toUpperCase());
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<ObjectId>', this.objectId);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<BaseName>', this.extendedObjectNameFixedForFileName);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<BaseNameShort>', this.extendedObjectNameFixedShort);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<BaseId>', this.extendedObjectId);
        return result;
    }
    ApplyPatternToFileName(pattern) {
        let result = pattern;
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<Prefix>', this._workSpaceSettings[Settings_1.Settings.ObjectNamePrefix]);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<Suffix>', this._workSpaceSettings[Settings_1.Settings.ObjectNameSuffix]);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<ObjectType>', this.objectType);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<ObjectTypeShort>', this.objectTypeShort);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<ObjectTypeShortPascalCase>', this.ObjectTypeShortPascalCase);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<ObjectTypeShortUpper>', this.objectTypeShort.toUpperCase());
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<ObjectId>', this.objectId);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<ObjectName>', this.objectNameFixedForFileName);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<ObjectNameShort>', this.objectNameFixedShort);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<BaseName>', this.extendedObjectNameFixedForFileName);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<BaseNameShort>', this.extendedObjectNameFixedShort);
        result = StringFunctions_1.StringFunctions.replaceAll(result, '<BaseId>', this.extendedObjectId);
        return result;
    }
    AddPrefixAndSuffixToObjectNameFixed(objectName) {
        let prefix = this._workSpaceSettings[Settings_1.Settings.ObjectNamePrefix];
        let suffix = this._workSpaceSettings[Settings_1.Settings.ObjectNameSuffix];
        if (!prefix && !suffix) {
            return objectName;
        }
        if (prefix && !objectName.startsWith(prefix)) {
            objectName = prefix + objectName;
        }
        if (suffix && !objectName.endsWith(suffix)) {
            objectName = objectName + suffix;
        }
        return objectName;
    }
    RemovePrefixAndSuffix(objectName) {
        let removePrefix = this._workSpaceSettings[Settings_1.Settings.RemovePrefixFromFilename];
        let removeSuffix = this._workSpaceSettings[Settings_1.Settings.RemoveSuffixFromFilename];
        if (!removePrefix && !removeSuffix) {
            return objectName;
        }
        let prefix = this._workSpaceSettings[Settings_1.Settings.ObjectNamePrefix];
        let suffix = this._workSpaceSettings[Settings_1.Settings.ObjectNameSuffix];
        if (!prefix && !suffix) {
            return objectName;
        }
        if (prefix && removePrefix && objectName.startsWith(prefix)) {
            objectName = objectName.substr(prefix.length);
        }
        if (suffix && removeSuffix && objectName.endsWith(suffix)) {
            objectName = objectName.substr(0, objectName.length - suffix.length);
        }
        return objectName;
    }
    RemoveUnderscore(objectName) {
        let removeUnderscores = this._workSpaceSettings[Settings_1.Settings.RemoveUnderscoreFromFilename];
        if (removeUnderscores) {
            return objectName.replace(/[_]/g, "");
        }
        else {
            return objectName;
        }
    }
    updateObjectNameInObjectText(objectText) {
        if (!this.objectName) {
            return objectText;
        }
        ;
        var escapedObjectName = this.escapeRegExp(this.objectName);
        var searchPattern = RegExp(escapedObjectName);
        let fixedObjectName = this.objectNameFixed.length <= 30 ? this.objectNameFixed : this.objectName;
        if (objectText.indexOf("\"" + this.objectName + "\"") >= 0) {
            return objectText.replace(searchPattern, fixedObjectName);
        }
        else {
            if (this.objectNameRequiresQuotes(fixedObjectName)) {
                return objectText.replace(searchPattern, "\"" + fixedObjectName + "\"");
            }
            else {
                return objectText.replace(searchPattern, fixedObjectName);
            }
        }
    }
    objectNameRequiresQuotes(objectName) {
        return !(/^[A-Za-z0-9]+$/.test(objectName));
    }
    escapeRegExp(str) {
        // Ref. https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    AddPrefixAndSuffixToActions(objectText) {
        this.objectActions.forEach(action => {
            objectText = objectText.replace(action.fullActionText, action.fullActionTextFixed);
        });
        return objectText;
    }
    AddPrefixAndSuffixToFields(objectText) {
        if (!/table/.test(this.objectType)) {
            return objectText;
        }
        this.tableFields.forEach(field => {
            objectText = objectText.replace(field.fullFieldText, field.fullFieldTextFixed);
        });
        return objectText;
    }
    AddPrefixAndSuffixToPageFields(objectText) {
        if (!/page/.test(this.objectType)) {
            return objectText;
        }
        this.pageFields.forEach(field => {
            objectText = objectText.replace(field.fullFieldText, field.fullFieldTextFixed);
        });
        return objectText;
    }
    AddPrefixAndSuffixToPageGroups(objectText) {
        if (!/page/.test(this.objectType)) {
            return objectText;
        }
        this.pageGroups.forEach(group => {
            objectText = objectText.replace(group.fullGroupText, group.fullGroupTextFixed);
        });
        return objectText;
    }
    AddPrefixAndSuffixToReportColumns(objectText) {
        if (!/report/.test(this.objectType)) {
            return objectText;
        }
        this.reportColumns.forEach(column => {
            objectText = objectText.replace(column.fullColumnText, column.fullColumnTextFixed);
        });
        return objectText;
    }
}
exports.NAVObject = NAVObject;
class NAVObjectAction {
    static actionRegEx() {
        return /.*( (action\("?)([ a-zA-Z0-9._/&-]+)"?\))/g;
    }
    get nameFixed() {
        if (!this._prefix && !this._suffix && !this.hasAffixesDefined()) {
            return this.name;
        }
        if (!this._objectType.toLocaleLowerCase().endsWith('extension')) {
            return this.name;
        }
        ; //only for extensionobjects
        if (this.hasAffixesDefined()) {
            var affixNeeded = true;
            this._affixes.forEach(affix => {
                if (this.name.startsWith(affix) || this.name.endsWith(affix)) {
                    affixNeeded = false;
                    return;
                }
            });
            if (!affixNeeded) {
                return this.name;
            }
        }
        let result = this.name;
        if (this._prefix && !this.name.startsWith(this._prefix)) {
            result = this._prefix + result;
        }
        if (this._suffix && !this.name.endsWith(this._suffix)) {
            result = result + this._suffix;
        }
        return result;
    }
    get fullActionTextFixed() {
        if (!this._prefix && !this._suffix && !this.hasAffixesDefined()) {
            return this.fullActionText;
        }
        ;
        return " action(" + StringFunctions_1.StringFunctions.encloseInQuotesIfNecessary(this.nameFixed) + ")";
    }
    constructor(fullActionText, objectType, prefix, suffix, affixes) {
        this.fullActionText = fullActionText;
        this._prefix = prefix ? prefix : null;
        this._suffix = suffix ? suffix : null;
        this._affixes = affixes ? affixes : null;
        this._objectType = objectType;
        this.parseActionText();
    }
    parseActionText() {
        var reg = NAVObjectAction.actionRegEx();
        var result = reg.exec(this.fullActionText);
        if (result !== null) {
            this.name = result[3];
        }
    }
    hasAffixesDefined() {
        return (Array.isArray(this._affixes) && this._affixes.length > 0);
    }
}
class NAVTableField {
    static fieldRegEx() {
        return /.*(field\((\d+); *"?([ a-zA-Z0-9._/&%\/()-]+)"?;(.*)\))/g;
    }
    get nameFixed() {
        if (!this._prefix && !this._suffix && !this.hasAffixesDefined()) {
            return this.name;
        }
        if (!this._objectType.toLocaleLowerCase().endsWith('extension')) {
            return this.name;
        }
        ; //only for extensionobjects
        if (this.hasAffixesDefined()) {
            var affixNeeded = true;
            this._affixes.forEach(affix => {
                if (this.name.startsWith(affix) || this.name.endsWith(affix)) {
                    affixNeeded = false;
                    return;
                }
            });
            if (!affixNeeded) {
                return this.name;
            }
        }
        let result = this.name;
        if (this._prefix && !this.name.startsWith(this._prefix)) {
            result = this._prefix + result;
        }
        if (this._suffix && !this.name.endsWith(this._suffix)) {
            result = result + this._suffix;
        }
        return result;
    }
    get fullFieldTextFixed() {
        if (!this._prefix && !this._suffix && !this.hasAffixesDefined()) {
            return this.fullFieldText;
        }
        return "field(" + this.number + "; " + StringFunctions_1.StringFunctions.encloseInQuotesIfNecessary(this.nameFixed) + "; " + this.type + ")";
    }
    constructor(fullFieldText, objectType, prefix, suffix, affixes) {
        this.fullFieldText = fullFieldText;
        this._prefix = prefix ? prefix : null;
        this._suffix = suffix ? suffix : null;
        this._affixes = affixes ? affixes : null;
        this._objectType = objectType;
        this.parseFieldText();
    }
    parseFieldText() {
        var reg = NAVTableField.fieldRegEx();
        var result = reg.exec(this.fullFieldText);
        if (result !== null) {
            this.number = result[2].trim().toString();
            this.name = result[3].trim().toString();
            this.type = result[4].trim().toString();
        }
    }
    hasAffixesDefined() {
        return (Array.isArray(this._affixes) && this._affixes.length > 0);
    }
}
class NAVPageField {
    static fieldRegEx() {
        return /.*(field\( *"?([ a-zA-Z0-9._/&%\/()-]+)"? *; *([" a-zA-Z0-9._/&%\/()-]+(\[([1-9]\d*)\])?) *\))/g;
    }
    get nameFixed() {
        if (!this._prefix && !this._suffix && !this.hasAffixesDefined()) {
            return this.name;
        }
        if (!this._objectType.toLocaleLowerCase().endsWith('extension')) {
            return this.name;
        }
        ; //only for extensionobjects
        if (this._objectType.toLocaleLowerCase().startsWith('table')) {
            return this.name;
        }
        ; //table-fields should not be parsed as pagefields
        if (this.hasAffixesDefined()) {
            var affixNeeded = true;
            this._affixes.forEach(affix => {
                if (this.name.startsWith(affix) || this.name.endsWith(affix)) {
                    affixNeeded = false;
                    return;
                }
            });
            if (!affixNeeded) {
                return this.name;
            }
        }
        let result = this.name;
        if (this._prefix && !this.name.startsWith(this._prefix)) {
            result = this._prefix + result;
        }
        if (this._suffix && !this.name.endsWith(this._suffix)) {
            result = result + this._suffix;
        }
        return result;
    }
    get fullFieldTextFixed() {
        if (!this._prefix && !this._suffix && !this.hasAffixesDefined()) {
            return this.fullFieldText;
        }
        return "field(" + StringFunctions_1.StringFunctions.encloseInQuotesIfNecessary(this.nameFixed) + "; " + this.expression + ")";
    }
    constructor(fullFieldText, objectType, prefix, suffix, affixes) {
        this.fullFieldText = fullFieldText;
        this._prefix = prefix ? prefix : null;
        this._suffix = suffix ? suffix : null;
        this._affixes = affixes ? affixes : null;
        this._objectType = objectType;
        this.parseFieldText();
    }
    parseFieldText() {
        var reg = NAVPageField.fieldRegEx();
        var result = reg.exec(this.fullFieldText);
        if (result !== null) {
            this.name = result[2].trim().toString();
            this.expression = result[3].trim().toString();
        }
    }
    hasAffixesDefined() {
        return (Array.isArray(this._affixes) && this._affixes.length > 0);
    }
}
class NAVPageGroup {
    static fieldRegEx() {
        return /.*(group\( *"?([ a-zA-Z0-9._/&%\/()-]+)"? *\))/g;
    }
    get nameFixed() {
        if (!this._prefix && !this._suffix && !this.hasAffixesDefined()) {
            return this.name;
        }
        if (!this._objectType.toLocaleLowerCase().endsWith('extension')) {
            return this.name;
        }
        ; //only for extensionobjects
        if (this.hasAffixesDefined()) {
            var affixNeeded = true;
            this._affixes.forEach(affix => {
                if (this.name.startsWith(affix) || this.name.endsWith(affix)) {
                    affixNeeded = false;
                    return;
                }
            });
            if (!affixNeeded) {
                return this.name;
            }
        }
        let result = this.name;
        if (this._prefix && !this.name.startsWith(this._prefix)) {
            result = this._prefix + result;
        }
        if (this._suffix && !this.name.endsWith(this._suffix)) {
            result = result + this._suffix;
        }
        return result;
    }
    get fullGroupTextFixed() {
        if (!this._prefix && !this._suffix && !this.hasAffixesDefined()) {
            return this.fullGroupText;
        }
        return "group(" + StringFunctions_1.StringFunctions.encloseInQuotesIfNecessary(this.nameFixed) + ")";
    }
    constructor(fullGroupText, objectType, prefix, suffix, affixes) {
        this.fullGroupText = fullGroupText;
        this._prefix = prefix ? prefix : null;
        this._suffix = suffix ? suffix : null;
        this._affixes = affixes ? affixes : null;
        this._objectType = objectType;
        this.parseFieldText();
    }
    parseFieldText() {
        var reg = NAVPageGroup.fieldRegEx();
        var result = reg.exec(this.fullGroupText);
        if (result !== null) {
            this.name = result[2].trim().toString();
        }
    }
    hasAffixesDefined() {
        return (Array.isArray(this._affixes) && this._affixes.length > 0);
    }
}
class NAVReportColumn {
    static columnRegEx() {
        // return /.*(column\( *"?([ a-zA-Z0-9._/&%\/()-]+)"? *; *([" a-zA-Z0-9._/&%\/()-]+) *\))/g;
        return /.*(column\( *"?([ a-zA-Z0-9._/&%\/()-]+)"? *; *([" a-zA-Z0-9._/&%\/()-]+(\[([1-9]\d*)\])?) *\))/g;
    }
    get nameFixed() {
        if (!this._prefix && !this._suffix && !this.hasAffixesDefined()) {
            return this.name;
        }
        if (!this._objectType.toLocaleLowerCase().endsWith('extension')) {
            return this.name;
        }
        ; //only for extensionobjects
        if (this.hasAffixesDefined()) {
            var affixNeeded = true;
            this._affixes.forEach(affix => {
                if (this.name.startsWith(affix) || this.name.endsWith(affix)) {
                    affixNeeded = false;
                    return;
                }
            });
            if (!affixNeeded) {
                return this.name;
            }
        }
        let result = this.name;
        if (this._prefix && !this.name.startsWith(this._prefix.replace(" ", ""))) {
            result = this._prefix + result;
        }
        if (this._suffix && !this.name.endsWith(this._suffix.replace(" ", ""))) {
            result = result + this._suffix;
        }
        result = result.replace(" ", "");
        return result;
    }
    get fullColumnTextFixed() {
        if (!this._prefix && !this._suffix && !this.hasAffixesDefined()) {
            return this.fullColumnText;
        }
        return "column(" + StringFunctions_1.StringFunctions.encloseInQuotesIfNecessary(this.nameFixed) + "; " + this.expression + ")";
    }
    constructor(fullColumnText, objectType, prefix, suffix, affixes) {
        this.fullColumnText = fullColumnText;
        this._prefix = prefix ? prefix : null;
        this._suffix = suffix ? suffix : null;
        this._affixes = affixes ? affixes : null;
        this._objectType = objectType;
        this.parseColumnText();
    }
    parseColumnText() {
        var reg = NAVReportColumn.columnRegEx();
        var result = reg.exec(this.fullColumnText);
        if (result !== null) {
            this.name = result[2].trim().toString();
            this.expression = result[3].trim().toString();
        }
    }
    hasAffixesDefined() {
        return (Array.isArray(this._affixes) && this._affixes.length > 0);
    }
}
//# sourceMappingURL=NAVObject.js.map