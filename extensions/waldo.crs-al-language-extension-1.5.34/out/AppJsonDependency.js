"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppJsonDependency = void 0;
class AppJsonDependency {
    constructor(appJsonDependency) {
        if (appJsonDependency) {
            this._appJsonDependency = appJsonDependency;
        }
        else {
            this._appJsonDependency = new Object();
        }
    }
    get name() {
        return this._appJsonDependency.name;
    }
    set name(value) {
        this._appJsonDependency.name = value;
    }
    get publisher() {
        return this._appJsonDependency.publisher;
    }
    set publisher(value) {
        this._appJsonDependency.publisher = value;
    }
    get id() {
        if (this._appJsonDependency.id) {
            return this._appJsonDependency.id;
        }
        else {
            return this._appJsonDependency.appId;
        }
    }
    set id(value) {
        this._appJsonDependency.id = value;
    }
    get version() {
        return this._appJsonDependency.version;
    }
    set version(value) {
        this._appJsonDependency.version = value;
    }
    get isTestApp() {
        //TODO:
        if ((this.isMicrosoft) && (this.name.toLocaleLowerCase().includes('test'))) {
            return true;
        }
        return (this.name.toLocaleLowerCase().endsWith('test'));
    }
    get isMicrosoft() {
        return (this._appJsonDependency.publisher.toLowerCase() == 'microsoft');
    }
}
exports.AppJsonDependency = AppJsonDependency;
//# sourceMappingURL=AppJsonDependency.js.map