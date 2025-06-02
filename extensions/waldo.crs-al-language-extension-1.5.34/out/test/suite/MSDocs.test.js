"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const mocha_1 = require("mocha");
const MSDocs_1 = require("../../MSDocs");
(0, mocha_1.suite)("MSDocs Tests", () => {
    (0, mocha_1.test)("GetSearchUrl", () => {
        let SearchString = 'Option Types';
        let Result = MSDocs_1.MSDocs.GetSearchUrl(SearchString);
        assert.notStrictEqual(Result.indexOf('Option'), -1);
        assert.notStrictEqual(Result.indexOf('Types'), -1);
        assert.strictEqual(Result.indexOf('Option Types'), -1);
        assert.notStrictEqual(Result.indexOf('Option+Types'), -1);
        assert.strictEqual(Result.length > 12, true);
    });
});
//# sourceMappingURL=MSDocs.test.js.map