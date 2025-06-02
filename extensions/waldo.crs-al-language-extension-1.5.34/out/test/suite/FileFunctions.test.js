"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const mocha_1 = require("mocha");
const FileFunctions_1 = require("../../FileFunctions");
(0, mocha_1.suite)("FileFunctions Tests", () => {
    (0, mocha_1.test)("getDirectory", () => {
        assert.strictEqual(FileFunctions_1.FileFunctions.getDirectory('c:\\program files\\somefolder\\myFolder\\myfile.al'), 'c:\\program files\\somefolder\\myFolder\\');
    });
    (0, mocha_1.test)("getFileName", () => {
        assert.strictEqual(FileFunctions_1.FileFunctions.getFileName('c:\\program files\\somefolder\\myFolder\\myfile.al'), 'myfile.al');
    });
});
//# sourceMappingURL=FileFunctions.test.js.map