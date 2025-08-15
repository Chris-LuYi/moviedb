/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 70024:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/browser/index.ts
var browser_exports = {};
__export(browser_exports, {
  createLogger: () => createLogger2,
  logger: () => logger
});
module.exports = __toCommonJS(browser_exports);

// src/browser/color.ts
var supportsSubstitutions = void 0;
var supportColor = () => {
  if (typeof supportsSubstitutions !== "undefined") {
    return supportsSubstitutions;
  }
  try {
    const testString = "color test";
    const css = "color: red;";
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      if (args[0] === `%c${testString}` && args[1] === css) {
        supportsSubstitutions = true;
      }
    };
    console.log(`%c${testString}`, css);
    console.log = originalConsoleLog;
  } catch (e) {
    supportsSubstitutions = false;
  }
  return supportsSubstitutions;
};
var ansiToCss = {
  "bold": "font-weight: bold;",
  "red": "color: red;",
  "green": "color: green;",
  "orange": "color: orange;",
  "dodgerblue": "color: dodgerblue;",
  "magenta": "color: magenta;",
  "gray": "color: gray;"
};
var formatter = (key) => supportColor() ? (input) => {
  if (Array.isArray(input)) {
    const [label, style] = input;
    return [`%c${label.replace("%c", "")}`, style ? `${ansiToCss[key]}${style}` : `${ansiToCss[key] || ""}`];
  }
  return [`%c${String(input).replace("%c", "")}`, ansiToCss[key] || ""];
} : (input) => [String(input)];
var bold = formatter("bold");
var red = formatter("red");
var green = formatter("green");
var orange = formatter("orange");
var dodgerblue = formatter("dodgerblue");
var magenta = formatter("magenta");
var gray = formatter("gray");

// src/browser/utils.ts
function getLabel(type, logType, labels) {
  let label = [""];
  if ("label" in logType) {
    label = [labels[type] || logType.label || ""];
    label = bold(logType.color ? logType.color(label) : label[0]);
  }
  label = label.filter(Boolean);
  return label;
}
function finalLog(label, text, args, message) {
  if (label.length) {
    if (Array.isArray(message)) {
      console.log(...label, ...message);
    } else {
      console.log(...label, text);
    }
  } else {
    Array.isArray(message) ? console.log(...message) : console.log(text, ...args);
  }
}

// src/constants.ts
var LOG_LEVEL = {
  error: 0,
  warn: 1,
  info: 2,
  log: 3,
  verbose: 4
};

// src/utils.ts
var errorStackRegExp = /at\s.*:\d+:\d+[\s\)]*$/;
var anonymousErrorStackRegExp = /at\s.*\(<anonymous>\)$/;
var isErrorStackMessage = (message) => errorStackRegExp.test(message) || anonymousErrorStackRegExp.test(message);

// src/createLogger.ts
var createLogger = (options = {}, { getLabel: getLabel2, handleError, finalLog: finalLog2, greet, LOG_TYPES: LOG_TYPES2 }) => {
  let maxLevel = options.level || "log";
  let customLabels = options.labels || {};
  let log = (type, message, ...args) => {
    if (LOG_LEVEL[LOG_TYPES2[type].level] > LOG_LEVEL[maxLevel]) {
      return;
    }
    if (message === void 0 || message === null) {
      return console.log();
    }
    let logType = LOG_TYPES2[type];
    let text = "";
    const label = getLabel2(type, logType, customLabels);
    if (message instanceof Error) {
      if (message.stack) {
        let [name, ...rest] = message.stack.split("\n");
        if (name.startsWith("Error: ")) {
          name = name.slice(7);
        }
        text = `${name}
${handleError(rest.join("\n"))}`;
      } else {
        text = message.message;
      }
    } else if (logType.level === "error" && typeof message === "string") {
      let lines = message.split("\n");
      text = lines.map((line) => isErrorStackMessage(line) ? handleError(line) : line).join("\n");
    } else {
      text = `${message}`;
    }
    finalLog2(label, text, args, message);
  };
  let logger2 = {
    // greet
    greet: (message) => log("log", greet(message))
  };
  Object.keys(LOG_TYPES2).forEach((key) => {
    logger2[key] = (...args) => log(key, ...args);
  });
  Object.defineProperty(logger2, "level", {
    get: () => maxLevel,
    set(val) {
      maxLevel = val;
    }
  });
  Object.defineProperty(logger2, "labels", {
    get: () => customLabels,
    set(val) {
      customLabels = val;
    }
  });
  logger2.override = (customLogger) => {
    Object.assign(logger2, customLogger);
  };
  return logger2;
};

// src/browser/gradient.ts
var startColor = [189, 255, 243];
var endColor = [74, 194, 154];
var isWord = (char) => !/[\s\n]/.test(char);
function gradient(message) {
  if (!supportColor()) {
    return [message];
  }
  const chars = [...message];
  const words = chars.filter(isWord);
  const steps = words.length - 1;
  if (steps === 0) {
    console.log(`%c${message}`, `color: rgb(${startColor.join(",")}); font-weight: bold;`);
    return [message];
  }
  let output = "";
  let styles = [];
  chars.forEach((char) => {
    if (isWord(char)) {
      const progress = words.indexOf(char) / steps;
      const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * progress);
      const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * progress);
      const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * progress);
      output += `%c${char}`;
      styles.push(`color: rgb(${r},${g},${b}); font-weight: bold;`);
    } else {
      output += char;
    }
  });
  return [output, ...styles];
}

// src/browser/constants.ts
var LOG_TYPES = {
  // Level error
  error: {
    label: "error",
    level: "error",
    color: red
  },
  // Level warn
  warn: {
    label: "warn",
    level: "warn",
    color: orange
  },
  // Level info
  info: {
    label: "info",
    level: "info",
    color: dodgerblue
  },
  start: {
    label: "start",
    level: "info",
    color: dodgerblue
  },
  ready: {
    label: "ready",
    level: "info",
    color: green
  },
  success: {
    label: "success",
    level: "info",
    color: green
  },
  // Level log
  log: {
    level: "log"
  },
  // Level debug
  debug: {
    label: "debug",
    level: "verbose",
    color: magenta
  }
};

// src/browser/createLogger.ts
function createLogger2(options = {}) {
  return createLogger(options, {
    handleError: (msg) => msg,
    getLabel,
    gradient,
    finalLog,
    LOG_TYPES,
    greet: (msg) => {
      return gradient(msg);
    }
  });
}

// src/browser/index.ts
var logger = createLogger2();
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 1018:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k0: () => (/* binding */ loadScript)
/* harmony export */ });
/* unused harmony exports BROWSER_LOG_KEY, BROWSER_LOG_VALUE, ENCODE_NAME_PREFIX, EncodedNameTransformMap, FederationModuleManifest, MANIFEST_EXT, MFModuleType, MFPrefetchCommon, MODULE_DEVTOOL_IDENTIFIER, ManifestFileName, NameTransformMap, NameTransformSymbol, SEPARATOR, StatsFileName, TEMP_DIR, assert, composeKeyWithSeparator, containerPlugin, containerReferencePlugin, createLink, createLogger, createScript, createScriptNode, decodeName, encodeName, error, generateExposeFilename, generateShareFilename, generateSnapshotFromManifest, getProcessEnv, getResourceUrl, inferAutoPublicPath, isBrowserEnv, isDebugMode, isManifestProvider, isRequiredVersion, isStaticResourcesEqual, loadScriptNode, logger, moduleFederationPlugin, normalizeOptions, parseEntry, safeToString, safeWrapper, sharePlugin, simpleJoinRemoteEntry, warn */
/* harmony import */ var isomorphic_rslog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(70024);
/* harmony import */ var _polyfills_esm_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66198);



const FederationModuleManifest = 'federation-manifest.json';
const MANIFEST_EXT = '.json';
const BROWSER_LOG_KEY = 'FEDERATION_DEBUG';
const BROWSER_LOG_VALUE = '1';
const NameTransformSymbol = {
    AT: '@',
    HYPHEN: '-',
    SLASH: '/'
};
const NameTransformMap = {
    [NameTransformSymbol.AT]: 'scope_',
    [NameTransformSymbol.HYPHEN]: '_',
    [NameTransformSymbol.SLASH]: '__'
};
const EncodedNameTransformMap = {
    [NameTransformMap[NameTransformSymbol.AT]]: NameTransformSymbol.AT,
    [NameTransformMap[NameTransformSymbol.HYPHEN]]: NameTransformSymbol.HYPHEN,
    [NameTransformMap[NameTransformSymbol.SLASH]]: NameTransformSymbol.SLASH
};
const SEPARATOR = ':';
const ManifestFileName = 'mf-manifest.json';
const StatsFileName = 'mf-stats.json';
const MFModuleType = {
    NPM: 'npm',
    APP: 'app'
};
const MODULE_DEVTOOL_IDENTIFIER = '__MF_DEVTOOLS_MODULE_INFO__';
const ENCODE_NAME_PREFIX = 'ENCODE_NAME_PREFIX';
const TEMP_DIR = '.federation';
const MFPrefetchCommon = {
    identifier: 'MFDataPrefetch',
    globalKey: '__PREFETCH__',
    library: 'mf-data-prefetch',
    exportsKey: '__PREFETCH_EXPORTS__',
    fileName: 'bootstrap.js'
};

var ContainerPlugin = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var ContainerReferencePlugin = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var ModuleFederationPlugin = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var SharePlugin = /*#__PURE__*/Object.freeze({
  __proto__: null
});

function isBrowserEnv() {
    return typeof window !== 'undefined';
}
function isBrowserDebug() {
    try {
        if (isBrowserEnv() && window.localStorage) {
            return localStorage.getItem(BROWSER_LOG_KEY) === BROWSER_LOG_VALUE;
        }
    } catch (error) {
        return false;
    }
    return false;
}
function isDebugMode() {
    if (typeof process !== 'undefined' && process.env && process.env['FEDERATION_DEBUG']) {
        return Boolean(process.env['FEDERATION_DEBUG']);
    }
    if (typeof FEDERATION_DEBUG !== 'undefined' && Boolean(FEDERATION_DEBUG)) {
        return true;
    }
    return isBrowserDebug();
}
const getProcessEnv = function() {
    return typeof process !== 'undefined' && process.env ? process.env : {};
};

const PREFIX = '[ Module Federation ]';
function setDebug(loggerInstance) {
    if (isDebugMode()) {
        loggerInstance.level = 'verbose';
    }
}
function setPrefix(loggerInstance, prefix) {
    loggerInstance.labels = {
        warn: `${prefix} Warn`,
        error: `${prefix} Error`,
        success: `${prefix} Success`,
        info: `${prefix} Info`,
        ready: `${prefix} Ready`,
        debug: `${prefix} Debug`
    };
}
function createLogger(prefix) {
    const loggerInstance = (0,isomorphic_rslog__WEBPACK_IMPORTED_MODULE_0__.createLogger)({
        labels: {
            warn: `${PREFIX} Warn`,
            error: `${PREFIX} Error`,
            success: `${PREFIX} Success`,
            info: `${PREFIX} Info`,
            ready: `${PREFIX} Ready`,
            debug: `${PREFIX} Debug`
        }
    });
    setDebug(loggerInstance);
    setPrefix(loggerInstance, prefix);
    return loggerInstance;
}
const logger = createLogger(PREFIX);

const LOG_CATEGORY = '[ Federation Runtime ]';
// entry: name:version   version : 1.0.0 | ^1.2.3
// entry: name:entry  entry:  https://localhost:9000/federation-manifest.json
const parseEntry = (str, devVerOrUrl, separator = SEPARATOR)=>{
    const strSplit = str.split(separator);
    const devVersionOrUrl = getProcessEnv()['NODE_ENV'] === 'development' && devVerOrUrl;
    const defaultVersion = '*';
    const isEntry = (s)=>s.startsWith('http') || s.includes(MANIFEST_EXT);
    // Check if the string starts with a type
    if (strSplit.length >= 2) {
        let [name, ...versionOrEntryArr] = strSplit;
        if (str.startsWith(separator)) {
            versionOrEntryArr = [
                devVersionOrUrl || strSplit.slice(-1)[0]
            ];
            name = strSplit.slice(0, -1).join(separator);
        }
        let versionOrEntry = devVersionOrUrl || versionOrEntryArr.join(separator);
        if (isEntry(versionOrEntry)) {
            return {
                name,
                entry: versionOrEntry
            };
        } else {
            // Apply version rule
            // devVersionOrUrl => inputVersion => defaultVersion
            return {
                name,
                version: versionOrEntry || defaultVersion
            };
        }
    } else if (strSplit.length === 1) {
        const [name] = strSplit;
        if (devVersionOrUrl && isEntry(devVersionOrUrl)) {
            return {
                name,
                entry: devVersionOrUrl
            };
        }
        return {
            name,
            version: devVersionOrUrl || defaultVersion
        };
    } else {
        throw `Invalid entry value: ${str}`;
    }
};
const composeKeyWithSeparator = function(...args) {
    if (!args.length) {
        return '';
    }
    return args.reduce((sum, cur)=>{
        if (!cur) {
            return sum;
        }
        if (!sum) {
            return cur;
        }
        return `${sum}${SEPARATOR}${cur}`;
    }, '');
};
const encodeName = function(name, prefix = '', withExt = false) {
    try {
        const ext = withExt ? '.js' : '';
        return `${prefix}${name.replace(new RegExp(`${NameTransformSymbol.AT}`, 'g'), NameTransformMap[NameTransformSymbol.AT]).replace(new RegExp(`${NameTransformSymbol.HYPHEN}`, 'g'), NameTransformMap[NameTransformSymbol.HYPHEN]).replace(new RegExp(`${NameTransformSymbol.SLASH}`, 'g'), NameTransformMap[NameTransformSymbol.SLASH])}${ext}`;
    } catch (err) {
        throw err;
    }
};
const decodeName = function(name, prefix, withExt) {
    try {
        let decodedName = name;
        if (prefix) {
            if (!decodedName.startsWith(prefix)) {
                return decodedName;
            }
            decodedName = decodedName.replace(new RegExp(prefix, 'g'), '');
        }
        decodedName = decodedName.replace(new RegExp(`${NameTransformMap[NameTransformSymbol.AT]}`, 'g'), EncodedNameTransformMap[NameTransformMap[NameTransformSymbol.AT]]).replace(new RegExp(`${NameTransformMap[NameTransformSymbol.SLASH]}`, 'g'), EncodedNameTransformMap[NameTransformMap[NameTransformSymbol.SLASH]]).replace(new RegExp(`${NameTransformMap[NameTransformSymbol.HYPHEN]}`, 'g'), EncodedNameTransformMap[NameTransformMap[NameTransformSymbol.HYPHEN]]);
        if (withExt) {
            decodedName = decodedName.replace('.js', '');
        }
        return decodedName;
    } catch (err) {
        throw err;
    }
};
const generateExposeFilename = (exposeName, withExt)=>{
    if (!exposeName) {
        return '';
    }
    let expose = exposeName;
    if (expose === '.') {
        expose = 'default_export';
    }
    if (expose.startsWith('./')) {
        expose = expose.replace('./', '');
    }
    return encodeName(expose, '__federation_expose_', withExt);
};
const generateShareFilename = (pkgName, withExt)=>{
    if (!pkgName) {
        return '';
    }
    return encodeName(pkgName, '__federation_shared_', withExt);
};
const getResourceUrl = (module, sourceUrl)=>{
    if ('getPublicPath' in module) {
        let publicPath;
        if (!module.getPublicPath.startsWith('function')) {
            publicPath = new Function(module.getPublicPath)();
        } else {
            publicPath = new Function('return ' + module.getPublicPath)()();
        }
        return `${publicPath}${sourceUrl}`;
    } else if ('publicPath' in module) {
        return `${module.publicPath}${sourceUrl}`;
    } else {
        console.warn('Cannot get resource URL. If in debug mode, please ignore.', module, sourceUrl);
        return '';
    }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const assert = (condition, msg)=>{
    if (!condition) {
        error(msg);
    }
};
const error = (msg)=>{
    throw new Error(`${LOG_CATEGORY}: ${msg}`);
};
const warn = (msg)=>{
    console.warn(`${LOG_CATEGORY}: ${msg}`);
};
function safeToString(info) {
    try {
        return JSON.stringify(info, null, 2);
    } catch (e) {
        return '';
    }
}
// RegExp for version string
const VERSION_PATTERN_REGEXP = /^([\d^=v<>~]|[*xX]$)/;
function isRequiredVersion(str) {
    return VERSION_PATTERN_REGEXP.test(str);
}

const simpleJoinRemoteEntry = (rPath, rName)=>{
    if (!rPath) {
        return rName;
    }
    const transformPath = (str)=>{
        if (str === '.') {
            return '';
        }
        if (str.startsWith('./')) {
            return str.replace('./', '');
        }
        if (str.startsWith('/')) {
            const strWithoutSlash = str.slice(1);
            if (strWithoutSlash.endsWith('/')) {
                return strWithoutSlash.slice(0, -1);
            }
            return strWithoutSlash;
        }
        return str;
    };
    const transformedPath = transformPath(rPath);
    if (!transformedPath) {
        return rName;
    }
    if (transformedPath.endsWith('/')) {
        return `${transformedPath}${rName}`;
    }
    return `${transformedPath}/${rName}`;
};
function inferAutoPublicPath(url) {
    return url.replace(/#.*$/, '').replace(/\?.*$/, '').replace(/\/[^\/]+$/, '/');
}
// Priority: overrides > remotes
// eslint-disable-next-line max-lines-per-function
function generateSnapshotFromManifest(manifest, options = {}) {
    var _manifest_metaData, _manifest_metaData1;
    const { remotes = {}, overrides = {}, version } = options;
    let remoteSnapshot;
    const getPublicPath = ()=>{
        if ('publicPath' in manifest.metaData) {
            if (manifest.metaData.publicPath === 'auto' && version) {
                // use same implementation as publicPath auto runtime module implements
                return inferAutoPublicPath(version);
            }
            return manifest.metaData.publicPath;
        } else {
            return manifest.metaData.getPublicPath;
        }
    };
    const overridesKeys = Object.keys(overrides);
    let remotesInfo = {};
    // If remotes are not provided, only the remotes in the manifest will be read
    if (!Object.keys(remotes).length) {
        var _manifest_remotes;
        remotesInfo = ((_manifest_remotes = manifest.remotes) == null ? void 0 : _manifest_remotes.reduce((res, next)=>{
            let matchedVersion;
            const name = next.federationContainerName;
            // overrides have higher priority
            if (overridesKeys.includes(name)) {
                matchedVersion = overrides[name];
            } else {
                if ('version' in next) {
                    matchedVersion = next.version;
                } else {
                    matchedVersion = next.entry;
                }
            }
            res[name] = {
                matchedVersion
            };
            return res;
        }, {})) || {};
    }
    // If remotes (deploy scenario) are specified, they need to be traversed again
    Object.keys(remotes).forEach((key)=>remotesInfo[key] = {
            // overrides will override dependencies
            matchedVersion: overridesKeys.includes(key) ? overrides[key] : remotes[key]
        });
    const { remoteEntry: { path: remoteEntryPath, name: remoteEntryName, type: remoteEntryType }, types: remoteTypes, buildInfo: { buildVersion }, globalName, ssrRemoteEntry } = manifest.metaData;
    const { exposes } = manifest;
    let basicRemoteSnapshot = {
        version: version ? version : '',
        buildVersion,
        globalName,
        remoteEntry: simpleJoinRemoteEntry(remoteEntryPath, remoteEntryName),
        remoteEntryType,
        remoteTypes: simpleJoinRemoteEntry(remoteTypes.path, remoteTypes.name),
        remoteTypesZip: remoteTypes.zip || '',
        remoteTypesAPI: remoteTypes.api || '',
        remotesInfo,
        shared: manifest == null ? void 0 : manifest.shared.map((item)=>({
                assets: item.assets,
                sharedName: item.name,
                version: item.version
            })),
        modules: exposes == null ? void 0 : exposes.map((expose)=>({
                moduleName: expose.name,
                modulePath: expose.path,
                assets: expose.assets
            }))
    };
    if ((_manifest_metaData = manifest.metaData) == null ? void 0 : _manifest_metaData.prefetchInterface) {
        const prefetchInterface = manifest.metaData.prefetchInterface;
        basicRemoteSnapshot = _extends({}, basicRemoteSnapshot, {
            prefetchInterface
        });
    }
    if ((_manifest_metaData1 = manifest.metaData) == null ? void 0 : _manifest_metaData1.prefetchEntry) {
        const { path, name, type } = manifest.metaData.prefetchEntry;
        basicRemoteSnapshot = _extends({}, basicRemoteSnapshot, {
            prefetchEntry: simpleJoinRemoteEntry(path, name),
            prefetchEntryType: type
        });
    }
    if ('publicPath' in manifest.metaData) {
        remoteSnapshot = _extends({}, basicRemoteSnapshot, {
            publicPath: getPublicPath()
        });
    } else {
        remoteSnapshot = _extends({}, basicRemoteSnapshot, {
            getPublicPath: getPublicPath()
        });
    }
    if (ssrRemoteEntry) {
        const fullSSRRemoteEntry = simpleJoinRemoteEntry(ssrRemoteEntry.path, ssrRemoteEntry.name);
        remoteSnapshot.ssrRemoteEntry = fullSSRRemoteEntry;
        remoteSnapshot.ssrRemoteEntryType = ssrRemoteEntry.type || 'commonjs-module';
    }
    return remoteSnapshot;
}
function isManifestProvider(moduleInfo) {
    if ('remoteEntry' in moduleInfo && moduleInfo.remoteEntry.includes(MANIFEST_EXT)) {
        return true;
    } else {
        return false;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function safeWrapper(callback, disableWarn) {
    try {
        const res = await callback();
        return res;
    } catch (e) {
        !disableWarn && warn(e);
        return;
    }
}
function isStaticResourcesEqual(url1, url2) {
    const REG_EXP = /^(https?:)?\/\//i;
    // Transform url1 and url2 into relative paths
    const relativeUrl1 = url1.replace(REG_EXP, '').replace(/\/$/, '');
    const relativeUrl2 = url2.replace(REG_EXP, '').replace(/\/$/, '');
    // Check if the relative paths are identical
    return relativeUrl1 === relativeUrl2;
}
function createScript(info) {
    // Retrieve the existing script element by its src attribute
    let script = null;
    let needAttach = true;
    let timeout = 20000;
    let timeoutId;
    const scripts = document.getElementsByTagName('script');
    for(let i = 0; i < scripts.length; i++){
        const s = scripts[i];
        const scriptSrc = s.getAttribute('src');
        if (scriptSrc && isStaticResourcesEqual(scriptSrc, info.url)) {
            script = s;
            needAttach = false;
            break;
        }
    }
    if (!script) {
        const attrs = info.attrs;
        script = document.createElement('script');
        script.type = (attrs == null ? void 0 : attrs['type']) === 'module' ? 'module' : 'text/javascript';
        let createScriptRes = undefined;
        if (info.createScriptHook) {
            createScriptRes = info.createScriptHook(info.url, info.attrs);
            if (createScriptRes instanceof HTMLScriptElement) {
                script = createScriptRes;
            } else if (typeof createScriptRes === 'object') {
                if ('script' in createScriptRes && createScriptRes.script) {
                    script = createScriptRes.script;
                }
                if ('timeout' in createScriptRes && createScriptRes.timeout) {
                    timeout = createScriptRes.timeout;
                }
            }
        }
        if (!script.src) {
            script.src = info.url;
        }
        if (attrs && !createScriptRes) {
            Object.keys(attrs).forEach((name)=>{
                if (script) {
                    if (name === 'async' || name === 'defer') {
                        script[name] = attrs[name];
                    // Attributes that do not exist are considered overridden
                    } else if (!script.getAttribute(name)) {
                        script.setAttribute(name, attrs[name]);
                    }
                }
            });
        }
    }
    const onScriptComplete = async (prev, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event)=>{
        var _info_cb;
        clearTimeout(timeoutId);
        // Prevent memory leaks in IE.
        if (script) {
            script.onerror = null;
            script.onload = null;
            safeWrapper(()=>{
                const { needDeleteScript = true } = info;
                if (needDeleteScript) {
                    (script == null ? void 0 : script.parentNode) && script.parentNode.removeChild(script);
                }
            });
            if (prev && typeof prev === 'function') {
                var _info_cb1;
                const result = prev(event);
                if (result instanceof Promise) {
                    var _info_cb2;
                    const res = await result;
                    info == null ? void 0 : (_info_cb2 = info.cb) == null ? void 0 : _info_cb2.call(info);
                    return res;
                }
                info == null ? void 0 : (_info_cb1 = info.cb) == null ? void 0 : _info_cb1.call(info);
                return result;
            }
        }
        info == null ? void 0 : (_info_cb = info.cb) == null ? void 0 : _info_cb.call(info);
    };
    script.onerror = onScriptComplete.bind(null, script.onerror);
    script.onload = onScriptComplete.bind(null, script.onload);
    timeoutId = setTimeout(()=>{
        onScriptComplete(null, new Error(`Remote script "${info.url}" time-outed.`));
    }, timeout);
    return {
        script,
        needAttach
    };
}
function createLink(info) {
    // <link rel="preload" href="script.js" as="script">
    // Retrieve the existing script element by its src attribute
    let link = null;
    let needAttach = true;
    const links = document.getElementsByTagName('link');
    for(let i = 0; i < links.length; i++){
        const l = links[i];
        const linkHref = l.getAttribute('href');
        const linkRef = l.getAttribute('ref');
        if (linkHref && isStaticResourcesEqual(linkHref, info.url) && linkRef === info.attrs['ref']) {
            link = l;
            needAttach = false;
            break;
        }
    }
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('href', info.url);
        let createLinkRes = undefined;
        const attrs = info.attrs;
        if (info.createLinkHook) {
            createLinkRes = info.createLinkHook(info.url, attrs);
            if (createLinkRes instanceof HTMLLinkElement) {
                link = createLinkRes;
            }
        }
        if (attrs && !createLinkRes) {
            Object.keys(attrs).forEach((name)=>{
                if (link && !link.getAttribute(name)) {
                    link.setAttribute(name, attrs[name]);
                }
            });
        }
    }
    const onLinkComplete = (prev, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event)=>{
        // Prevent memory leaks in IE.
        if (link) {
            link.onerror = null;
            link.onload = null;
            safeWrapper(()=>{
                const { needDeleteLink = true } = info;
                if (needDeleteLink) {
                    (link == null ? void 0 : link.parentNode) && link.parentNode.removeChild(link);
                }
            });
            if (prev) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const res = prev(event);
                info.cb();
                return res;
            }
        }
        info.cb();
    };
    link.onerror = onLinkComplete.bind(null, link.onerror);
    link.onload = onLinkComplete.bind(null, link.onload);
    return {
        link,
        needAttach
    };
}
function loadScript(url, info) {
    const { attrs = {}, createScriptHook } = info;
    return new Promise((resolve, _reject)=>{
        const { script, needAttach } = createScript({
            url,
            cb: resolve,
            attrs: (0,_polyfills_esm_mjs__WEBPACK_IMPORTED_MODULE_1__._)({
                fetchpriority: 'high'
            }, attrs),
            createScriptHook,
            needDeleteScript: true
        });
        needAttach && document.head.appendChild(script);
    });
}

function importNodeModule(name) {
    if (!name) {
        throw new Error('import specifier is required');
    }
    const importModule = new Function('name', `return import(name)`);
    return importModule(name).then((res)=>res).catch((error)=>{
        console.error(`Error importing module ${name}:`, error);
        throw error;
    });
}
const loadNodeFetch = async ()=>{
    const fetchModule = await importNodeModule('node-fetch');
    return fetchModule.default || fetchModule;
};
const lazyLoaderHookFetch = async (input, init, loaderHook)=>{
    const hook = (url, init)=>{
        return loaderHook.lifecycle.fetch.emit(url, init);
    };
    const res = await hook(input, init || {});
    if (!res || !(res instanceof Response)) {
        const fetchFunction = typeof fetch === 'undefined' ? await loadNodeFetch() : fetch;
        return fetchFunction(input, init || {});
    }
    return res;
};
function createScriptNode(url, cb, attrs, loaderHook) {
    if (loaderHook == null ? void 0 : loaderHook.createScriptHook) {
        const hookResult = loaderHook.createScriptHook(url);
        if (hookResult && typeof hookResult === 'object' && 'url' in hookResult) {
            url = hookResult.url;
        }
    }
    let urlObj;
    try {
        urlObj = new URL(url);
    } catch (e) {
        console.error('Error constructing URL:', e);
        cb(new Error(`Invalid URL: ${e}`));
        return;
    }
    const getFetch = async ()=>{
        if (loaderHook == null ? void 0 : loaderHook.fetch) {
            return (input, init)=>lazyLoaderHookFetch(input, init, loaderHook);
        }
        return typeof fetch === 'undefined' ? loadNodeFetch() : fetch;
    };
    const handleScriptFetch = async (f, urlObj)=>{
        try {
            var //@ts-ignore
            _vm_constants;
            const res = await f(urlObj.href);
            const data = await res.text();
            const [path, vm] = await Promise.all([
                importNodeModule('path'),
                importNodeModule('vm')
            ]);
            const scriptContext = {
                exports: {},
                module: {
                    exports: {}
                }
            };
            const urlDirname = urlObj.pathname.split('/').slice(0, -1).join('/');
            const filename = path.basename(urlObj.pathname);
            var _vm_constants_USE_MAIN_CONTEXT_DEFAULT_LOADER;
            const script = new vm.Script(`(function(exports, module, require, __dirname, __filename) {${data}\n})`, {
                filename,
                importModuleDynamically: (_vm_constants_USE_MAIN_CONTEXT_DEFAULT_LOADER = (_vm_constants = vm.constants) == null ? void 0 : _vm_constants.USE_MAIN_CONTEXT_DEFAULT_LOADER) != null ? _vm_constants_USE_MAIN_CONTEXT_DEFAULT_LOADER : importNodeModule
            });
            script.runInThisContext()(scriptContext.exports, scriptContext.module, eval('require'), urlDirname, filename);
            const exportedInterface = scriptContext.module.exports || scriptContext.exports;
            if (attrs && exportedInterface && attrs['globalName']) {
                const container = exportedInterface[attrs['globalName']] || exportedInterface;
                cb(undefined, container);
                return;
            }
            cb(undefined, exportedInterface);
        } catch (e) {
            cb(e instanceof Error ? e : new Error(`Script execution error: ${e}`));
        }
    };
    getFetch().then(async (f)=>{
        if ((attrs == null ? void 0 : attrs['type']) === 'esm' || (attrs == null ? void 0 : attrs['type']) === 'module') {
            return loadModule(urlObj.href, {
                fetch: f,
                vm: await importNodeModule('vm')
            }).then(async (module)=>{
                await module.evaluate();
                cb(undefined, module.namespace);
            }).catch((e)=>{
                cb(e instanceof Error ? e : new Error(`Script execution error: ${e}`));
            });
        }
        handleScriptFetch(f, urlObj);
    }).catch((err)=>{
        cb(err);
    });
}
function loadScriptNode(url, info) {
    return new Promise((resolve, reject)=>{
        createScriptNode(url, (error, scriptContext)=>{
            if (error) {
                reject(error);
            } else {
                var _info_attrs, _info_attrs1;
                const remoteEntryKey = (info == null ? void 0 : (_info_attrs = info.attrs) == null ? void 0 : _info_attrs['globalName']) || `__FEDERATION_${info == null ? void 0 : (_info_attrs1 = info.attrs) == null ? void 0 : _info_attrs1['name']}:custom__`;
                const entryExports = globalThis[remoteEntryKey] = scriptContext;
                resolve(entryExports);
            }
        }, info.attrs, info.loaderHook);
    });
}
async function loadModule(url, options) {
    const { fetch: fetch1, vm } = options;
    const response = await fetch1(url);
    const code = await response.text();
    const module = new vm.SourceTextModule(code, {
        // @ts-ignore
        importModuleDynamically: async (specifier, script)=>{
            const resolvedUrl = new URL(specifier, url).href;
            return loadModule(resolvedUrl, options);
        }
    });
    await module.link(async (specifier)=>{
        const resolvedUrl = new URL(specifier, url).href;
        const module = await loadModule(resolvedUrl, options);
        return module;
    });
    return module;
}

function normalizeOptions(enableDefault, defaultOptions, key) {
    return function(options) {
        if (options === false) {
            return false;
        }
        if (typeof options === 'undefined') {
            if (enableDefault) {
                return defaultOptions;
            } else {
                return false;
            }
        }
        if (options === true) {
            return defaultOptions;
        }
        if (options && typeof options === 'object') {
            return _extends({}, defaultOptions, options);
        }
        throw new Error(`Unexpected type for \`${key}\`, expect boolean/undefined/object, got: ${typeof options}`);
    };
}




/***/ }),

/***/ 66198:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
    _extends = Object.assign || function assign(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
        }
        return target;
    };
    return _extends.apply(this, arguments);
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// ../../node_modules/.pnpm/@babel+runtime@7.26.0/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

;// ../../node_modules/.pnpm/@babel+runtime@7.26.0/node_modules/@babel/runtime/helpers/esm/toPrimitive.js

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

;// ../../node_modules/.pnpm/@babel+runtime@7.26.0/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js


function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

;// ../../node_modules/.pnpm/@babel+runtime@7.26.0/node_modules/@babel/runtime/helpers/esm/defineProperty.js

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

;// ../../node_modules/.pnpm/@babel+runtime@7.26.0/node_modules/@babel/runtime/helpers/esm/objectSpread2.js

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}

;// ../../node_modules/.pnpm/@babel+runtime@7.26.0/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function asyncToGenerator_asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}

;// ../../node_modules/.pnpm/@babel+runtime@7.26.0/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}

;// ../../node_modules/.pnpm/@babel+runtime@7.26.0/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js

function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}

// EXTERNAL MODULE: ../sdk/dist/index.esm.mjs
var index_esm = __webpack_require__(1018);
;// ./src/template/constant.ts
const constant_FormID='FormID';const ENABLEHMR='enableHMR';const proxyFormField='proxyFormField';const defaultDataItem={key:'',value:'',checked:true};const defaultModuleData={proxyFormField:[_objectSpread2({},defaultDataItem)]};const statusInfo={noProxy:{status:'noProxy',message:'Modules are not currently proxied',color:'#698cee'},processing:{status:'processing',message:'Obtaining remote module information',color:'#FF7D00'},success:{status:'success',message:'The proxy configuration has taken effect and the corresponding page has been automatically refreshed.',color:'#50b042'},error:{status:'error',message:'Calculating Snapshot failed, please confirm whether the package information is correct',color:'#F53F3F'}};const __ENABLE_FAST_REFRESH__='enableFastRefresh';const BROWSER_ENV_KEY='MF_ENV';const __FEDERATION_DEVTOOLS__='__MF_DEVTOOLS__';
;// ./src/utils/chrome/storage.ts
const mergeStorage=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref=_asyncToGenerator(function*(...args){return injectScript(mergeLocalStorage,false,...args);});return function mergeStorage(){return _ref.apply(this,arguments);};}()));const removeStorageKey=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref2=_asyncToGenerator(function*(...args){return injectScript(removeLocalStorageKey,false,...args);});return function removeStorageKey(){return _ref2.apply(this,arguments);};}()));const removeStorage=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref3=_asyncToGenerator(function*(...args){return injectScript(removeLocalStorage,false,...args);});return function removeStorage(){return _ref3.apply(this,arguments);};}()));const setStorage=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref4=_asyncToGenerator(function*(...args){return injectScript(setLocalStorage,false,...args);});return function setStorage(){return _ref4.apply(this,arguments);};}()));
;// ./src/utils/chrome/index.ts
const sleep=num=>{return new Promise(resolve=>{setTimeout(()=>{resolve();},num);});};const injectPostMessage=postMessageUrl=>{const script=document.createElement('script');script.src=postMessageUrl;document.getElementsByTagName('head')[0].appendChild(script);};const TabInfo={currentTabId:0};function getCurrentTabId(){return TabInfo.currentTabId;}function getInspectWindowTabId(){return new Promise((resolve,reject)=>{var _chrome;if((_chrome=chrome)!==null&&_chrome!==void 0&&(_chrome=_chrome.devtools)!==null&&_chrome!==void 0&&_chrome.inspectedWindow){// @ts-expect-error In dev mode, should resolve by hand
if(chrome.isDevMode){resolve(0);}chrome.devtools.inspectedWindow.eval('typeof window.__FEDERATION__ !== "undefined" || typeof window.__VMOK__ !== "undefined"',function(info,error){const{tabId}=chrome.devtools.inspectedWindow;getTabs().then(tabs=>{const target=tabs.find(tab=>tab.id===tabId);window.targetTab=target;});console.log('chrome.devtools.inspectedWindow.tabId',chrome.devtools.inspectedWindow.tabId);TabInfo.currentTabId=tabId;resolve(tabId);if(error){reject(error);}});}else{// chrome devtool e2e test，The test window opens independently
if(window.targetTab&&window.targetTab.id){const tabId=window.targetTab.id;TabInfo.currentTabId=tabId;resolve(tabId);}else{throw Error(`can't get active tab`);}}});}const getGlobalModuleInfo=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref=_asyncToGenerator(function*(callback){yield sleep(300);chrome.runtime.onMessage.addListener(message=>{var _window;const{origin,data}=message;if(!data||data!==null&&data!==void 0&&data.appInfos){return;}if(!((_window=window)!==null&&_window!==void 0&&_window.__FEDERATION__)){definePropertyGlobalVal(window,'__FEDERATION__',{});definePropertyGlobalVal(window,'__VMOK__',window.__FEDERATION__);}window.__FEDERATION__.originModuleInfo=JSON.parse(JSON.stringify(data===null||data===void 0?void 0:data.moduleInfo));if(data!==null&&data!==void 0&&data.updateModule){const moduleIds=Object.keys(window.__FEDERATION__.originModuleInfo);const shouldUpdate=!moduleIds.some(id=>id.includes(data.updateModule.name));if(shouldUpdate){const destination=data.updateModule.entry||data.updateModule.version;window.__FEDERATION__.originModuleInfo[`${data.updateModule.name}:${destination}`]={remoteEntry:destination,version:destination};}}window.__FEDERATION__.moduleInfo=JSON.parse(JSON.stringify(window.__FEDERATION__.originModuleInfo));callback(window.__FEDERATION__.moduleInfo);});const postMessageStartUrl=getUrl('post-message-start.js');yield chrome_injectScript(injectPostMessage,false,postMessageStartUrl);});return function getGlobalModuleInfo(_x){return _ref.apply(this,arguments);};}()));const getTabs=(queryOptions={})=>chrome.tabs.query(queryOptions);const getScope=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref2=_asyncToGenerator(function*(){const activeTab=window.targetTab;const favIconUrl=activeTab===null||activeTab===void 0?void 0:activeTab.favIconUrl;return favIconUrl||'noScope';});return function getScope(){return _ref2.apply(this,arguments);};}()));const chrome_injectScript=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref3=_asyncToGenerator(function*(excuteScript,world=false,...args){yield getInspectWindowTabId();return chrome.scripting.executeScript({target:{tabId:getCurrentTabId()},func:excuteScript,world:world?'MAIN':'ISOLATED',args}).then(()=>{console.log('InjectScript success, excuteScript:',args);}).catch(e=>{console.log(e,'InjectScript fail, excuteScript:',args);});});return function injectScript(_x2){return _ref3.apply(this,arguments);};}()));const getUrl=file=>{try{const pathSet=chrome.runtime.getURL(file).split('/');const fileName=pathSet.pop();pathSet.push('static','js',fileName);return pathSet.join('/');}catch(e){return'';}};const injectToast=(toastUtilUrl,e2eFlag)=>{const ele=document.querySelector(`[data-e2e=${e2eFlag}]`);if(ele){return;}const scriptToast=document.createElement('script');scriptToast.src=toastUtilUrl;scriptToast.dataset.e2e=e2eFlag;document.getElementsByTagName('head')[0].appendChild(scriptToast);};const setChromeStorage=formData=>{getScope().then(/*#__PURE__*/function(){var _ref4=_asyncToGenerator(function*(scope){const data=yield chrome.storage.sync.get('FormID');const storeData=data[FormID];const scopes=Object.keys(storeData||{});// Remove outdated data to avoid exceeded memory
let filterOutDatedData=storeData||{};const{length}=scopes;if(length>=10){filterOutDatedData=scopes.slice(0,length-3).reduce((memo,cur)=>{memo[cur]=storeData[cur];return memo;},{});}const existRules=storeData===null||storeData===void 0?void 0:storeData[scope];chrome.storage.sync.set({[FormID]:_objectSpread(_objectSpread({},filterOutDatedData),{},{[scope]:_objectSpread(_objectSpread({},existRules),formData)})});});return function(_x3){return _ref4.apply(this,arguments);};}());};
;// ./src/utils/sdk/index.ts
const sdk_setLocalStorage=(key,value)=>{localStorage.setItem(key,value);};const sdk_removeLocalStorage=key=>{const data=localStorage.getItem(key);if(data){localStorage.removeItem(key);}};const sdk_mergeLocalStorage=(target,key,value)=>{const str=localStorage.getItem(target);const obj=JSON.parse(str||'{}');obj[key]=value;localStorage.setItem(target,JSON.stringify(obj));};const sdk_removeLocalStorageKey=(target,key)=>{const str=localStorage.getItem(target);if(str){const obj=JSON.parse(str||'{}');delete obj[key];localStorage.setItem(target,JSON.stringify(obj));}};const isObject=target=>Object.prototype.toString.call(target)==='[object Object]';const reloadPage=()=>{var _globalThis$location;globalThis===null||globalThis===void 0||(_globalThis$location=globalThis.location)===null||_globalThis$location===void 0||_globalThis$location.reload();};const validateCustom=schema=>schema===null||schema===void 0?void 0:schema.endsWith('.json');const getUnpkgUrl=(pkg,version)=>{if(pkg==='react'){return`https://unpkg.com/react@${version}/umd/react.development.js`;}else if(pkg==='react-dom'){return`https://unpkg.com/react-dom@${version}/umd/react-dom.development.js`;}};const sdk_definePropertyGlobalVal=(target,key,val)=>{Object.defineProperty(target,key,{value:val,configurable:false,writable:true});};
;// ./src/utils/index.ts

;// ./src/template/index.ts

;// ./src/utils/chrome/fast-refresh.ts
var _window,_window2,_window$__FEDERATION_;const _excluded=["userOptions"];const fastRefreshPlugin=()=>{return{name:'mf-fast-refresh-plugin',beforeInit(_ref){let{userOptions}=_ref,args=_objectWithoutProperties(_ref,_excluded);const shareInfo=userOptions.shared;const twinsShareInfo=args.shareInfo;let enableFastRefresh;let devtoolsMessage;const devtoolsMessageStr=localStorage.getItem(__FEDERATION_DEVTOOLS__);if(devtoolsMessageStr){try{var _devtoolsMessage;devtoolsMessage=JSON.parse(devtoolsMessageStr);enableFastRefresh=(_devtoolsMessage=devtoolsMessage)===null||_devtoolsMessage===void 0?void 0:_devtoolsMessage.enableFastRefresh;}catch(e){console.debug('Fast Refresh Plugin Error: ',e);}}if(shareInfo&&isObject(shareInfo)){let orderResolve;const orderPromise=new Promise(resolve=>{orderResolve=resolve;});Object.keys(shareInfo).forEach(/*#__PURE__*/function(){var _ref2=asyncToGenerator_asyncToGenerator(function*(share){// @ts-ignore legacy runtime shareInfo[share] is shared , and latest i shard[]
const sharedArr=Array.isArray(shareInfo[share])?shareInfo[share]:[shareInfo[share]];let twinsSharedArr;if(twinsShareInfo){// @ts-ignore
twinsSharedArr=Array.isArray(twinsShareInfo[share])?twinsShareInfo[share]:[twinsShareInfo[share]];}sharedArr.forEach((shared,idx)=>{let get;if(share==='react'){get=()=>(0,index_esm/* loadScript */.k0)(getUnpkgUrl(share,shared.version),{attrs:{defer:true,async:false}}).then(()=>{orderResolve();});}if(share==='react-dom'){get=()=>orderPromise.then(()=>(0,index_esm/* loadScript */.k0)(getUnpkgUrl(share,shared.version),{attrs:{defer:true,async:false}}));}// @ts-expect-error
if(enableFastRefresh&&typeof get==='function'){if(share==='react'){shared.get=/*#__PURE__*/asyncToGenerator_asyncToGenerator(function*(){if(!window.React){yield get();console.warn('[Module Federation HMR]: You are using Module Federation Devtools to debug online host, it will cause your project load Dev mode React and ReactDOM. If not in this mode, please disable it in Module Federation Devtools');}shared.lib=()=>window.React;return()=>window.React;});}if(share==='react-dom'){shared.get=/*#__PURE__*/asyncToGenerator_asyncToGenerator(function*(){if(!window.ReactDOM){yield get();}shared.lib=()=>window.ReactDOM;return()=>window.ReactDOM;});}if(twinsShareInfo){twinsSharedArr[idx].get=shared.get;}}});});return function(_x){return _ref2.apply(this,arguments);};}());return _objectSpread2({userOptions},args);}else{return _objectSpread2({userOptions},args);}}};};if(!((_window=window)!==null&&_window!==void 0&&_window.__FEDERATION__)){sdk_definePropertyGlobalVal(window,'__FEDERATION__',{});sdk_definePropertyGlobalVal(window,'__VMOK__',window.__FEDERATION__);}if(!((_window2=window)!==null&&_window2!==void 0&&_window2.__FEDERATION__.__GLOBAL_PLUGIN__)){window.__FEDERATION__.__GLOBAL_PLUGIN__=[];}(_window$__FEDERATION_=window.__FEDERATION__.__GLOBAL_PLUGIN__)===null||_window$__FEDERATION_===void 0?void 0:_window$__FEDERATION_.push(fastRefreshPlugin());
/******/ })()
;