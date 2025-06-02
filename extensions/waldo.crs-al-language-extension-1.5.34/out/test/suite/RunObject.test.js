"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const mocha_1 = require("mocha");
const Settings_1 = require("../../Settings");
const DynamicsNAV_1 = require("../../DynamicsNAV");
(0, mocha_1.suite)("RunObject Tests", () => {
    (0, mocha_1.test)("CRS.PublicWebBaseUrl - RunObject in WebClient - NoSetting", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        testSettings[Settings_1.Settings.WebServer] = 'http://navserver';
        testSettings[Settings_1.Settings.WebServerInstance] = 'NAV';
        testSettings[Settings_1.Settings.WebServerInstancePort] = '';
        testSettings[Settings_1.Settings.Tenant] = 'default';
        let url = DynamicsNAV_1.DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'WebClient', 'page', 50100);
        assert.notStrictEqual(url.indexOf('navserver'), -1);
        assert.strictEqual(url.indexOf('undefined'), -1);
    });
    (0, mocha_1.test)("CRS.PublicWebBaseUrl - RunObject in WebClient - Overriding setting", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        testSettings[Settings_1.Settings.WebServer] = 'http://navserver';
        testSettings[Settings_1.Settings.WebServerInstance] = 'NAV';
        testSettings[Settings_1.Settings.WebServerInstancePort] = '';
        testSettings[Settings_1.Settings.Tenant] = '';
        testSettings[Settings_1.Settings.PublicWebBaseUrl] = 'http://SomeServer.Cronus.com/NAV';
        let url = DynamicsNAV_1.DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'WebClient', 'page', 22);
        assert.strictEqual(url.indexOf('navserver'), -1);
        assert.notStrictEqual(url.indexOf('SomeServer'), -1);
        assert.strictEqual(url.indexOf('undefined'), -1);
        assert.strictEqual(url.indexOf('default'), -1);
    });
    (0, mocha_1.test)("CRS.PublicWebBaseUrl - RunObject in Phone - Overriding setting", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        testSettings[Settings_1.Settings.WebServer] = 'http://navserver';
        testSettings[Settings_1.Settings.WebServerInstance] = 'NAV';
        testSettings[Settings_1.Settings.WebServerInstancePort] = '';
        testSettings[Settings_1.Settings.Tenant] = '';
        testSettings[Settings_1.Settings.PublicWebBaseUrl] = 'http://SomeServer.Cronus.com/NAV';
        let url = DynamicsNAV_1.DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'phone', 'page', 22);
        assert.strictEqual(url.indexOf('navserver'), -1);
        assert.notStrictEqual(url.indexOf('SomeServer'), -1);
        assert.strictEqual(url.indexOf('undefined'), -1);
        assert.strictEqual(url.indexOf('default'), -1);
        assert.notStrictEqual(url.indexOf('phone'), -1);
    });
    (0, mocha_1.test)("Run Object on SaaS with no Named Sandbox", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        testSettings[Settings_1.Settings.WebServer] = null;
        testSettings[Settings_1.Settings.WebServerInstance] = null;
        testSettings[Settings_1.Settings.WebServerInstancePort] = null;
        testSettings[Settings_1.Settings.Tenant] = null;
        testSettings[Settings_1.Settings.PublicWebBaseUrl] = null;
        testSettings[Settings_1.Settings.SandboxName] = null;
        let url = DynamicsNAV_1.DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'WebClient', 'page', 22);
        assert.notStrictEqual(url.indexOf('sandbox'), -1);
        assert.strictEqual(url.indexOf('dev'), -1);
    });
    (0, mocha_1.test)("Run Object on SaaS with Named Sandbox", () => {
        let testSettings = Settings_1.Settings.GetConfigSettings(null);
        testSettings[Settings_1.Settings.WebServer] = null;
        testSettings[Settings_1.Settings.WebServerInstance] = null;
        testSettings[Settings_1.Settings.WebServerInstancePort] = null;
        testSettings[Settings_1.Settings.Tenant] = null;
        testSettings[Settings_1.Settings.PublicWebBaseUrl] = null;
        testSettings[Settings_1.Settings.SandboxName] = 'dev';
        let url = DynamicsNAV_1.DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'WebClient', 'page', 22);
        assert.strictEqual(url.indexOf('sandbox'), -1);
        assert.notStrictEqual(url.indexOf('dev'), -1);
    });
});
//# sourceMappingURL=RunObject.test.js.map