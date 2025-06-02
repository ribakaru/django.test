"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const mocha_1 = require("mocha");
const Settings_1 = require("../../Settings");
const NAVTestObjectLibrary = require("./NAVTestObjectLibrary");
const NAVObject_1 = require("../../NAVObject");
const WorkspaceFiles_1 = require("../../WorkspaceFiles");
(0, mocha_1.suite)("WorkspaceFiles Tests", () => {
    (0, mocha_1.test)("getDestinationFolder - test", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getTestCodeunit();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        let foldersuggestion = WorkspaceFiles_1.WorkspaceFiles.getDestinationFolder(navObject, testSettings);
        assert.strictEqual(foldersuggestion.toLowerCase(), 'test');
    });
    (0, mocha_1.test)("getDestinationFolder - no test", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithLongName();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        let foldersuggestion = WorkspaceFiles_1.WorkspaceFiles.getDestinationFolder(navObject, testSettings);
        assert.notStrictEqual(foldersuggestion.toLowerCase(), 'test');
    });
    (0, mocha_1.test)("getObjectTypeFolder - test", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getTestCodeunit();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        let foldersuggestion = WorkspaceFiles_1.WorkspaceFiles.getObjectTypeFolder(navObject, testSettings);
        assert.strictEqual(foldersuggestion.toLowerCase(), '');
    });
    (0, mocha_1.test)("getObjectTypeFolder - no test", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        let navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithLongName();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        let foldersuggestion = WorkspaceFiles_1.WorkspaceFiles.getObjectTypeFolder(navObject, testSettings);
        assert.strictEqual(foldersuggestion.toLowerCase().toString(), navObject.objectType.toString());
        assert.notStrictEqual(foldersuggestion.toLowerCase().toString(), '');
    });
    (0, mocha_1.test)("getObjectTypeFolder - return namespace", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        testSettings[Settings_1.Settings.ReorganizeByNamespace] = true;
        let navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithNamespace();
        let navObject = new NAVObject_1.NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        let foldersuggestion = WorkspaceFiles_1.WorkspaceFiles.getObjectTypeFolder(navObject, testSettings);
        assert.notStrictEqual(foldersuggestion.toLowerCase().toString(), navObject.objectNamespace.toLowerCase().toString());
        assert.strictEqual(foldersuggestion.toLowerCase().toString(), 'spycoclown\\test');
    });
});
//# sourceMappingURL=WorkspaceFiles.test.js.map