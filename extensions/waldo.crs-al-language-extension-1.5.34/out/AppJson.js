"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppJson = void 0;
const AppJsonDependency_1 = require("./AppJsonDependency");
class AppJson {
    constructor(appJson) {
        this._appJson = require(appJson.fsPath);
        this._appJsonDependencies = [];
        if (this._appJson.dependencies) {
            this._appJson.dependencies.forEach(dependency => {
                let _dep = new AppJsonDependency_1.AppJsonDependency(dependency);
                this._appJsonDependencies.push(_dep);
            });
        }
        if (this._appJson.application) {
            let _dep = new AppJsonDependency_1.AppJsonDependency(null);
            _dep.id = 'NoGuidAvailable';
            _dep.name = 'Microsoft BaseApp';
            _dep.publisher = 'Microsoft';
            _dep.version = this._appJson.application;
            this._appJsonDependencies.push(_dep);
        }
        if (this._appJson.platform) {
            let _dep = new AppJsonDependency_1.AppJsonDependency(null);
            _dep.id = 'NoGuidAvailable';
            _dep.name = 'Microsoft System';
            _dep.publisher = 'Microsoft';
            _dep.version = this._appJson.platform;
            this._appJsonDependencies.push(_dep);
        }
    }
    get dependencies() {
        return this._appJsonDependencies;
    }
    get name() {
        return this._appJson.name;
    }
    get application() {
        return this._appJson.application;
    }
    get platform() {
        return this._appJson.platform;
    }
    get publisher() {
        return this._appJson.publisher;
    }
    get isTestApp() {
        //TODO:
        if ((this.isMicrosoft) && (this.name.toLocaleLowerCase().includes('test'))) {
            return true;
        }
        return (this.name.toLocaleLowerCase().endsWith('test'));
    }
    get isMicrosoft() {
        return (this.publisher.toLowerCase() == 'microsoft');
    }
}
exports.AppJson = AppJson;
//# sourceMappingURL=AppJson.js.map