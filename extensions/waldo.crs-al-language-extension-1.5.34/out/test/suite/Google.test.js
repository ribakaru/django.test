"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const mocha_1 = require("mocha");
const Google_1 = require("../../Google");
(0, mocha_1.suite)("Google Tests", () => {
    (0, mocha_1.test)("GetSearchUrl", () => {
        let SearchString = 'Option Types';
        let Result = Google_1.Google.GetSearchUrl(SearchString);
        assert.notStrictEqual(Result.indexOf('Option'), -1);
        assert.notStrictEqual(Result.indexOf('Types'), -1);
        assert.strictEqual(Result.indexOf('Option Types'), -1);
        assert.notStrictEqual(Result.indexOf('Option+Types'), -1);
        assert.strictEqual(Result.length > 12, true);
    });
});
//# sourceMappingURL=Google.test.js.map