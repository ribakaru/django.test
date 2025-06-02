"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRSExtensionPublicApi = void 0;
const RunObjectApi_1 = require("./RunObjectApi");
const ObjectNamesApi_1 = require("./ObjectNamesApi");
class CRSExtensionPublicApi {
    constructor() {
        this.RunObjectApi = new RunObjectApi_1.RunObjectApi();
        this.ObjectNamesApi = new ObjectNamesApi_1.ObjectNamesApi();
    }
}
exports.CRSExtensionPublicApi = CRSExtensionPublicApi;
//# sourceMappingURL=CRSExtensionPublicApi.js.map