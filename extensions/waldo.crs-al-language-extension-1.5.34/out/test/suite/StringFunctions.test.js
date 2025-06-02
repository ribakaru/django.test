"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const mocha_1 = require("mocha");
const StringFunctions_1 = require("../../StringFunctions");
(0, mocha_1.suite)("StringFunctions Tests", () => {
    (0, mocha_1.test)("replaceAll", () => {
        assert.strictEqual(StringFunctions_1.StringFunctions.replaceAll('Remove all "double" quotes" from this " text.', '"', ''), 'Remove all double quotes from this  text.');
    });
    (0, mocha_1.test)("removeAllButAlfaNumeric", () => {
        assert.strictEqual(StringFunctions_1.StringFunctions.removeAllButAlfaNumeric('E.x/a!m$p"l&e'), 'Example');
    });
});
//# sourceMappingURL=StringFunctions.test.js.map