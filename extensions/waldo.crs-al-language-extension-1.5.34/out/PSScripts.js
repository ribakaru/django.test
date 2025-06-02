"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RUNOBJECTWEB = exports.INSTALLWALDOSMODULES = exports.POWERSHELLPATH = void 0;
const path_1 = require("path");
exports.POWERSHELLPATH = (0, path_1.join)(__dirname, 'powershell');
exports.INSTALLWALDOSMODULES = (0, path_1.join)(exports.POWERSHELLPATH, 'InstallWaldosModules.ps1');
exports.RUNOBJECTWEB = (0, path_1.join)(exports.POWERSHELLPATH, 'RunObjectWeb.ps1');
//# sourceMappingURL=PSScripts.js.map