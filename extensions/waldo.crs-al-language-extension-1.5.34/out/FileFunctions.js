"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFunctions = void 0;
class FileFunctions {
    static getDirectory(fullPath) {
        return fullPath.substring(0, fullPath.lastIndexOf("\\") + 1);
    }
    static getFileName(fullPath) {
        return fullPath.substr(this.getDirectory(fullPath).length);
    }
}
exports.FileFunctions = FileFunctions;
//# sourceMappingURL=FileFunctions.js.map