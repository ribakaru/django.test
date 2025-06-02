"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
7; //
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//
// The module 'assert' provides assertion methods from node
const assert = require("assert");
const mocha_1 = require("mocha");
const NAVObject_1 = require("../../NAVObject");
const NAVTestObjectLibrary = require("./NAVTestObjectLibrary");
const Settings_1 = require("../../Settings");
const DynamicsNAV_1 = require("../../DynamicsNAV");
// Defines a Mocha test suite to group tests of similar kind together
(0, mocha_1.suite)("NAVObject General Tests", () => {
    (0, mocha_1.test)("Al File without real code", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getAlFileWithoutCode();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.NAVObjectText, navObject.NAVObjectTextFixed);
        assert.strictEqual(navObject.objectFileName, navObject.objectFileNameFixed);
        assert.strictEqual(navObject.objectName, navObject.objectNameFixed);
        assert.strictEqual(navObject.objectNameFixedShort, '');
    });
    (0, mocha_1.test)("Reorganize Test Codeunits to 'test'-folder", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getTestCodeunit();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        let navTestObject2 = NAVTestObjectLibrary.getNormalCodeunitWithLongName();
        let navObject2 = new NAVObject_1.NAVObject(navTestObject2.ObjectText, testSettings, navTestObject2.ObjectFileName);
        assert.strictEqual(navObject.objectCodeunitSubType.toLowerCase(), 'test');
        assert.strictEqual(navObject2.objectCodeunitSubType, null);
    });
    (0, mocha_1.test)("Filename - <ObjectName[Short]> Normal object With Spaces", () => {
        //Long
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        testSettings[Settings_1.Settings.FileNamePattern] = '<ObjectName>.al';
        let navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithLongName();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.notStrictEqual(navObject.objectFileNameFixed.indexOf(' '), -1);
        //Short
        testSettings[Settings_1.Settings.FileNamePattern] = '<ObjectNameShort>.al';
        navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithLongName();
        navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed.indexOf(' '), -1);
    });
    (0, mocha_1.test)("Filename - Wrong Extension Casing", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.GetFileNameWithWrongCasing();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed.toLocaleLowerCase().endsWith('.al'), true);
    });
    (0, mocha_1.test)("PageExtension - Automatic Naming without settings", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectNameFixed, navObject.objectName);
    });
    (0, mocha_1.test)("TableExtension - Automatic Naming without settings", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectNameFixed, navObject.objectName);
    });
    (0, mocha_1.test)("Case Sensitive Object Types", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getPascalCasedObjectType_Report();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectType.toLocaleLowerCase(), 'report');
    });
    (0, mocha_1.test)("Filename - Rename enum", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getEnumObject();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.notStrictEqual(navObject.extendedObjectName, navObject.objectName);
    });
    (0, mocha_1.test)("Filename - Rename enumExtension", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getEnumExtensionObject();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.notStrictEqual(navObject.extendedObjectName, navObject.objectName);
    });
    (0, mocha_1.test)("Comments in table", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        testSettings[Settings_1.Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings_1.Settings.ObjectNameSuffix] = 'waldo';
        testSettings[Settings_1.Settings.FileNamePattern] = '<Prefix><Suffix><ObjectType><ObjectTypeShort><ObjectTypeShortPascalCase><ObjectTypeShortUpper><ObjectId>';
        let navTestObject = NAVTestObjectLibrary.getTableWithComments();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectType.toLowerCase().startsWith('table'), true);
        assert.strictEqual(navObject.objectFileNameFixed, testSettings[Settings_1.Settings.ObjectNamePrefix]
            + testSettings[Settings_1.Settings.ObjectNameSuffix]
            + navObject.objectType
            + navObject.objectTypeShort
            + navObject.ObjectTypeShortPascalCase
            + navObject.objectTypeShort.toUpperCase()
            + navObject.objectId);
    });
    (0, mocha_1.test)("TableExtension - Fields with keyword-names", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        let navObject2 = new NAVObject_1.NAVObject(navObject.NAVObjectTextFixed, testSettings, navObject.objectFileNameFixed);
        navObject2.tableFields.forEach(tableField => {
            if (DynamicsNAV_1.DynamicsNAV.getAllKeywordsLowerCased().indexOf(tableField.name.toLowerCase()) != -1) {
                var expectedValueToFind = `"${tableField.name}"`;
                //console.log(tableField.fullFieldTextFixed);
                assert.strictEqual((tableField.fullFieldText.indexOf(expectedValueToFind) > -1), true, `"${tableField.name}" is a keyword and should be surrounded with quotes, while this is the fixed text: "${tableField.fullFieldText}"`);
            }
        });
    });
    (0, mocha_1.test)("TableExtension - Fields with keyword-names (with Prefix)", () => {
        //same as above, but now with prefix
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        testSettings[Settings_1.Settings.ObjectNamePrefix] = 'waldo';
        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        let navObject2 = new NAVObject_1.NAVObject(navObject.NAVObjectTextFixed, testSettings, navObject.objectFileNameFixed);
        navObject2.tableFields.forEach(tableField => {
            if (DynamicsNAV_1.DynamicsNAV.getAllKeywordsLowerCased().indexOf(tableField.name.toLowerCase()) != -1) {
                var expectedValueToFind = `"${tableField.name}"`;
                //console.log(tableField.fullFieldTextFixed);
                assert.strictEqual((tableField.fullFieldText.indexOf(expectedValueToFind) > -1), true, `"${tableField.name}" is a keyword and should be surrounded with quotes, while this is the fixed text: "${tableField.fullFieldText}"`);
            }
        });
    });
    (0, mocha_1.test)("Table - Fields with keyword-names", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getTableWrongFileNameAndKeyWord();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        let navObject2 = new NAVObject_1.NAVObject(navObject.NAVObjectTextFixed, testSettings, navObject.objectFileNameFixed);
        navObject2.tableFields.forEach(tableField => {
            if (DynamicsNAV_1.DynamicsNAV.getAllKeywordsLowerCased().indexOf(tableField.name.toLowerCase()) != -1) {
                var expectedValueToFind = `"${tableField.name}"`;
                //console.log(tableField.fullFieldTextFixed);
                assert.strictEqual((tableField.fullFieldText.indexOf(expectedValueToFind) > -1), true, `"${tableField.name}" is a keyword and should be surrounded with quotes, while this is the fixed text: "${tableField.fullFieldText}"`);
            }
        });
    });
    (0, mocha_1.test)("Table - Fields with keyword-names (With Prefix)", () => {
        //same as above, but now with prefix
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        testSettings[Settings_1.Settings.ObjectNamePrefix] = 'waldo';
        let navTestObject = NAVTestObjectLibrary.getTableWrongFileNameAndKeyWord();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        let navObject2 = new NAVObject_1.NAVObject(navObject.NAVObjectTextFixed, testSettings, navObject.objectFileNameFixed);
        navObject2.tableFields.forEach(tableField => {
            if (DynamicsNAV_1.DynamicsNAV.getAllKeywordsLowerCased().indexOf(tableField.name.toLowerCase()) != -1) {
                var expectedValueToFind = `"${tableField.name}"`;
                //console.log(tableField.fullFieldTextFixed);
                assert.strictEqual((tableField.fullFieldText.indexOf(expectedValueToFind) > -1), true, `"${tableField.name}" is a keyword and should be surrounded with quotes, while this is the fixed text: "${tableField.fullFieldText}"`);
            }
        });
    });
    (0, mocha_1.test)("Table - Fields with special characters in names", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getTableFieldNamesWithSpecialCharacters();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        navObject.tableFields.forEach(tableField => {
            if (tableField.name === '') {
                assert.fail('Table field name contains unrecognized characters.');
            }
        });
    });
    (0, mocha_1.test)("Page - Fields with special characters in names", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getPageFieldNamesWithSpecialCharacters();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.pageFields.length, 4, "The system should recognize 4 fields");
    });
    (0, mocha_1.test)("Page - Actions with keyword-names (With Prefix)", () => {
        //TODO: this should be changed so that transaction(false) functioncall isn't going to get a "fix"
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        testSettings[Settings_1.Settings.ObjectNamePrefix] = 'waldo';
        let navTestObject = NAVTestObjectLibrary.getPageWithWaldoPrefixWrongName();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        let navObject2 = new NAVObject_1.NAVObject(navObject.NAVObjectTextFixed, testSettings, navObject.objectFileNameFixed);
        navObject2.objectActions.forEach(pageAction => {
            if (DynamicsNAV_1.DynamicsNAV.getAllKeywordsLowerCased().indexOf(pageAction.name.toLowerCase()) != -1) {
                var expectedValueToFind = `"${pageAction.name}"`;
                //console.log(pageAction.fullFieldTextFixed);
                assert.strictEqual((pageAction.fullActionText.indexOf(expectedValueToFind) > -1), true, `"${pageAction.name}" is a keyword and should be surrounded with quotes, while this is the fixed text: "${pageAction.fullActionText}"`);
            }
        });
    });
});
//# sourceMappingURL=NAVObject.test.js.map