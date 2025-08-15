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
/* harmony export */   Bb: () => (/* binding */ isDebugMode),
/* harmony export */   Bf: () => (/* binding */ MODULE_DEVTOOL_IDENTIFIER),
/* harmony export */   h: () => (/* binding */ createLogger)
/* harmony export */ });
/* unused harmony exports BROWSER_LOG_KEY, BROWSER_LOG_VALUE, ENCODE_NAME_PREFIX, EncodedNameTransformMap, FederationModuleManifest, MANIFEST_EXT, MFModuleType, MFPrefetchCommon, ManifestFileName, NameTransformMap, NameTransformSymbol, SEPARATOR, StatsFileName, TEMP_DIR, assert, composeKeyWithSeparator, containerPlugin, containerReferencePlugin, createLink, createScript, createScriptNode, decodeName, encodeName, error, generateExposeFilename, generateShareFilename, generateSnapshotFromManifest, getProcessEnv, getResourceUrl, inferAutoPublicPath, isBrowserEnv, isManifestProvider, isRequiredVersion, isStaticResourcesEqual, loadScript, loadScriptNode, logger, moduleFederationPlugin, normalizeOptions, parseEntry, safeToString, safeWrapper, sharePlugin, simpleJoinRemoteEntry, warn */
/* harmony import */ var isomorphic_rslog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(70024);



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
            attrs: _extends({
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

// EXTERNAL MODULE: ../sdk/dist/index.esm.mjs
var index_esm = __webpack_require__(1018);
;// ../runtime/dist/polyfills.esm.mjs
function polyfills_esm_extends() {
    polyfills_esm_extends = Object.assign || function assign(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
        }
        return target;
    };
    return polyfills_esm_extends.apply(this, arguments);
}

function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}



;// ../runtime/dist/share.esm.mjs



function getBuilderId() {
    //@ts-ignore
    return typeof FEDERATION_BUILD_IDENTIFIER !== 'undefined' ? FEDERATION_BUILD_IDENTIFIER : '';
}

const LOG_CATEGORY = '[ Federation Runtime ]';
// FIXME: pre-bundle ?
const logger = (0,index_esm/* createLogger */.h)(LOG_CATEGORY);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function assert(condition, msg) {
    if (!condition) {
        error(msg);
    }
}
function error(msg) {
    if (msg instanceof Error) {
        msg.message = `${LOG_CATEGORY}: ${msg.message}`;
        throw msg;
    }
    throw new Error(`${LOG_CATEGORY}: ${msg}`);
}
function warn(msg) {
    if (msg instanceof Error) {
        msg.message = `${LOG_CATEGORY}: ${msg.message}`;
        logger.warn(msg);
    } else {
        logger.warn(msg);
    }
}

function addUniqueItem(arr, item) {
    if (arr.findIndex((name)=>name === item) === -1) {
        arr.push(item);
    }
    return arr;
}
function getFMId(remoteInfo) {
    if ('version' in remoteInfo && remoteInfo.version) {
        return `${remoteInfo.name}:${remoteInfo.version}`;
    } else if ('entry' in remoteInfo && remoteInfo.entry) {
        return `${remoteInfo.name}:${remoteInfo.entry}`;
    } else {
        return `${remoteInfo.name}`;
    }
}
function isRemoteInfoWithEntry(remote) {
    return typeof remote.entry !== 'undefined';
}
function isPureRemoteEntry(remote) {
    return !remote.entry.includes('.json') && remote.entry.includes('.js');
}
function isObject(val) {
    return val && typeof val === 'object';
}
const objectToString = Object.prototype.toString;
// eslint-disable-next-line @typescript-eslint/ban-types
function isPlainObject(val) {
    return objectToString.call(val) === '[object Object]';
}
function arrayOptions(options) {
    return Array.isArray(options) ? options : [
        options
    ];
}
function getRemoteEntryInfoFromSnapshot(snapshot) {
    const defaultRemoteEntryInfo = {
        url: '',
        type: 'global',
        globalName: ''
    };
    if (isBrowserEnv()) {
        return 'remoteEntry' in snapshot ? {
            url: snapshot.remoteEntry,
            type: snapshot.remoteEntryType,
            globalName: snapshot.globalName
        } : defaultRemoteEntryInfo;
    }
    if ('ssrRemoteEntry' in snapshot) {
        return {
            url: snapshot.ssrRemoteEntry || defaultRemoteEntryInfo.url,
            type: snapshot.ssrRemoteEntryType || defaultRemoteEntryInfo.type,
            globalName: snapshot.globalName
        };
    }
    return defaultRemoteEntryInfo;
}
const processModuleAlias = (name, subPath)=>{
    // @host/ ./button -> @host/button
    let moduleName;
    if (name.endsWith('/')) {
        moduleName = name.slice(0, -1);
    } else {
        moduleName = name;
    }
    if (subPath.startsWith('.')) {
        subPath = subPath.slice(1);
    }
    moduleName = moduleName + subPath;
    return moduleName;
};

const CurrentGlobal = typeof globalThis === 'object' ? globalThis : window;
const nativeGlobal = (()=>{
    try {
        // get real window (incase of sandbox)
        return document.defaultView;
    } catch (e) {
        // node env
        return CurrentGlobal;
    }
})();
const Global = nativeGlobal;
function definePropertyGlobalVal(target, key, val) {
    Object.defineProperty(target, key, {
        value: val,
        configurable: false,
        writable: true
    });
}
function includeOwnProperty(target, key) {
    return Object.hasOwnProperty.call(target, key);
}
// This section is to prevent encapsulation by certain microfrontend frameworks. Due to reuse policies, sandbox escapes.
// The sandbox in the microfrontend does not replicate the value of 'configurable'.
// If there is no loading content on the global object, this section defines the loading object.
if (!includeOwnProperty(CurrentGlobal, '__GLOBAL_LOADING_REMOTE_ENTRY__')) {
    definePropertyGlobalVal(CurrentGlobal, '__GLOBAL_LOADING_REMOTE_ENTRY__', {});
}
const globalLoading = CurrentGlobal.__GLOBAL_LOADING_REMOTE_ENTRY__;
function setGlobalDefaultVal(target) {
    var _target___FEDERATION__, _target___FEDERATION__1, _target___FEDERATION__2, _target___FEDERATION__3, _target___FEDERATION__4, _target___FEDERATION__5;
    if (includeOwnProperty(target, '__VMOK__') && !includeOwnProperty(target, '__FEDERATION__')) {
        definePropertyGlobalVal(target, '__FEDERATION__', target.__VMOK__);
    }
    if (!includeOwnProperty(target, '__FEDERATION__')) {
        definePropertyGlobalVal(target, '__FEDERATION__', {
            __GLOBAL_PLUGIN__: [],
            __INSTANCES__: [],
            moduleInfo: {},
            __SHARE__: {},
            __MANIFEST_LOADING__: {},
            __PRELOADED_MAP__: new Map()
        });
        definePropertyGlobalVal(target, '__VMOK__', target.__FEDERATION__);
    }
    var ___GLOBAL_PLUGIN__;
    (___GLOBAL_PLUGIN__ = (_target___FEDERATION__ = target.__FEDERATION__).__GLOBAL_PLUGIN__) != null ? ___GLOBAL_PLUGIN__ : _target___FEDERATION__.__GLOBAL_PLUGIN__ = [];
    var ___INSTANCES__;
    (___INSTANCES__ = (_target___FEDERATION__1 = target.__FEDERATION__).__INSTANCES__) != null ? ___INSTANCES__ : _target___FEDERATION__1.__INSTANCES__ = [];
    var _moduleInfo;
    (_moduleInfo = (_target___FEDERATION__2 = target.__FEDERATION__).moduleInfo) != null ? _moduleInfo : _target___FEDERATION__2.moduleInfo = {};
    var ___SHARE__;
    (___SHARE__ = (_target___FEDERATION__3 = target.__FEDERATION__).__SHARE__) != null ? ___SHARE__ : _target___FEDERATION__3.__SHARE__ = {};
    var ___MANIFEST_LOADING__;
    (___MANIFEST_LOADING__ = (_target___FEDERATION__4 = target.__FEDERATION__).__MANIFEST_LOADING__) != null ? ___MANIFEST_LOADING__ : _target___FEDERATION__4.__MANIFEST_LOADING__ = {};
    var ___PRELOADED_MAP__;
    (___PRELOADED_MAP__ = (_target___FEDERATION__5 = target.__FEDERATION__).__PRELOADED_MAP__) != null ? ___PRELOADED_MAP__ : _target___FEDERATION__5.__PRELOADED_MAP__ = new Map();
}
setGlobalDefaultVal(CurrentGlobal);
setGlobalDefaultVal(nativeGlobal);
function resetFederationGlobalInfo() {
    CurrentGlobal.__FEDERATION__.__GLOBAL_PLUGIN__ = [];
    CurrentGlobal.__FEDERATION__.__INSTANCES__ = [];
    CurrentGlobal.__FEDERATION__.moduleInfo = {};
    CurrentGlobal.__FEDERATION__.__SHARE__ = {};
    CurrentGlobal.__FEDERATION__.__MANIFEST_LOADING__ = {};
    Object.keys(globalLoading).forEach((key)=>{
        delete globalLoading[key];
    });
}
function getGlobalFederationInstance(name, version) {
    const buildId = getBuilderId();
    return CurrentGlobal.__FEDERATION__.__INSTANCES__.find((GMInstance)=>{
        if (buildId && GMInstance.options.id === getBuilderId()) {
            return true;
        }
        if (GMInstance.options.name === name && !GMInstance.options.version && !version) {
            return true;
        }
        if (GMInstance.options.name === name && version && GMInstance.options.version === version) {
            return true;
        }
        return false;
    });
}
function setGlobalFederationInstance(FederationInstance) {
    CurrentGlobal.__FEDERATION__.__INSTANCES__.push(FederationInstance);
}
function getGlobalFederationConstructor() {
    return CurrentGlobal.__FEDERATION__.__DEBUG_CONSTRUCTOR__;
}
function setGlobalFederationConstructor(FederationConstructor, isDebug = (0,index_esm/* isDebugMode */.Bb)()) {
    if (isDebug) {
        CurrentGlobal.__FEDERATION__.__DEBUG_CONSTRUCTOR__ = FederationConstructor;
        CurrentGlobal.__FEDERATION__.__DEBUG_CONSTRUCTOR_VERSION__ = "0.8.1";
    }
}
// eslint-disable-next-line @typescript-eslint/ban-types
function getInfoWithoutType(target, key) {
    if (typeof key === 'string') {
        const keyRes = target[key];
        if (keyRes) {
            return {
                value: target[key],
                key: key
            };
        } else {
            const targetKeys = Object.keys(target);
            for (const targetKey of targetKeys){
                const [targetTypeOrName, _] = targetKey.split(':');
                const nKey = `${targetTypeOrName}:${key}`;
                const typeWithKeyRes = target[nKey];
                if (typeWithKeyRes) {
                    return {
                        value: typeWithKeyRes,
                        key: nKey
                    };
                }
            }
            return {
                value: undefined,
                key: key
            };
        }
    } else {
        throw new Error('key must be string');
    }
}
const getGlobalSnapshot = ()=>nativeGlobal.__FEDERATION__.moduleInfo;
const getTargetSnapshotInfoByModuleInfo = (moduleInfo, snapshot)=>{
    // Check if the remote is included in the hostSnapshot
    const moduleKey = getFMId(moduleInfo);
    const getModuleInfo = getInfoWithoutType(snapshot, moduleKey).value;
    // The remoteSnapshot might not include a version
    if (getModuleInfo && !getModuleInfo.version && 'version' in moduleInfo && moduleInfo['version']) {
        getModuleInfo.version = moduleInfo['version'];
    }
    if (getModuleInfo) {
        return getModuleInfo;
    }
    // If the remote is not included in the hostSnapshot, deploy a micro app snapshot
    if ('version' in moduleInfo && moduleInfo['version']) {
        const { version } = moduleInfo, resModuleInfo = _object_without_properties_loose(moduleInfo, [
            "version"
        ]);
        const moduleKeyWithoutVersion = getFMId(resModuleInfo);
        const getModuleInfoWithoutVersion = getInfoWithoutType(nativeGlobal.__FEDERATION__.moduleInfo, moduleKeyWithoutVersion).value;
        if ((getModuleInfoWithoutVersion == null ? void 0 : getModuleInfoWithoutVersion.version) === version) {
            return getModuleInfoWithoutVersion;
        }
    }
    return;
};
const getGlobalSnapshotInfoByModuleInfo = (moduleInfo)=>getTargetSnapshotInfoByModuleInfo(moduleInfo, nativeGlobal.__FEDERATION__.moduleInfo);
const setGlobalSnapshotInfoByModuleInfo = (remoteInfo, moduleDetailInfo)=>{
    const moduleKey = getFMId(remoteInfo);
    nativeGlobal.__FEDERATION__.moduleInfo[moduleKey] = moduleDetailInfo;
    return nativeGlobal.__FEDERATION__.moduleInfo;
};
const addGlobalSnapshot = (moduleInfos)=>{
    nativeGlobal.__FEDERATION__.moduleInfo = polyfills_esm_extends({}, nativeGlobal.__FEDERATION__.moduleInfo, moduleInfos);
    return ()=>{
        const keys = Object.keys(moduleInfos);
        for (const key of keys){
            delete nativeGlobal.__FEDERATION__.moduleInfo[key];
        }
    };
};
const getRemoteEntryExports = (name, globalName)=>{
    const remoteEntryKey = globalName || `__FEDERATION_${name}:custom__`;
    const entryExports = CurrentGlobal[remoteEntryKey];
    return {
        remoteEntryKey,
        entryExports
    };
};
// This function is used to register global plugins.
// It iterates over the provided plugins and checks if they are already registered.
// If a plugin is not registered, it is added to the global plugins.
// If a plugin is already registered, a warning message is logged.
const registerGlobalPlugins = (plugins)=>{
    const { __GLOBAL_PLUGIN__ } = nativeGlobal.__FEDERATION__;
    plugins.forEach((plugin)=>{
        if (__GLOBAL_PLUGIN__.findIndex((p)=>p.name === plugin.name) === -1) {
            __GLOBAL_PLUGIN__.push(plugin);
        } else {
            warn(`The plugin ${plugin.name} has been registered.`);
        }
    });
};
const getGlobalHostPlugins = ()=>nativeGlobal.__FEDERATION__.__GLOBAL_PLUGIN__;
const getPreloaded = (id)=>CurrentGlobal.__FEDERATION__.__PRELOADED_MAP__.get(id);
const setPreloaded = (id)=>CurrentGlobal.__FEDERATION__.__PRELOADED_MAP__.set(id, true);

const DEFAULT_SCOPE = 'default';
const DEFAULT_REMOTE_TYPE = 'global';

// fork from https://github.com/originjs/vite-plugin-federation/blob/v1.1.12/packages/lib/src/utils/semver/index.ts
// those constants are based on https://www.rubydoc.info/gems/semantic_range/3.0.0/SemanticRange#BUILDIDENTIFIER-constant
// Copyright (c)
// vite-plugin-federation is licensed under Mulan PSL v2.
// You can use this software according to the terms and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//      http://license.coscl.org.cn/MulanPSL2
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.
const buildIdentifier = '[0-9A-Za-z-]+';
const build = `(?:\\+(${buildIdentifier}(?:\\.${buildIdentifier})*))`;
const numericIdentifier = '0|[1-9]\\d*';
const numericIdentifierLoose = '[0-9]+';
const nonNumericIdentifier = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';
const preReleaseIdentifierLoose = `(?:${numericIdentifierLoose}|${nonNumericIdentifier})`;
const preReleaseLoose = `(?:-?(${preReleaseIdentifierLoose}(?:\\.${preReleaseIdentifierLoose})*))`;
const preReleaseIdentifier = `(?:${numericIdentifier}|${nonNumericIdentifier})`;
const preRelease = `(?:-(${preReleaseIdentifier}(?:\\.${preReleaseIdentifier})*))`;
const xRangeIdentifier = `${numericIdentifier}|x|X|\\*`;
const xRangePlain = `[v=\\s]*(${xRangeIdentifier})(?:\\.(${xRangeIdentifier})(?:\\.(${xRangeIdentifier})(?:${preRelease})?${build}?)?)?`;
const hyphenRange = `^\\s*(${xRangePlain})\\s+-\\s+(${xRangePlain})\\s*$`;
const mainVersionLoose = `(${numericIdentifierLoose})\\.(${numericIdentifierLoose})\\.(${numericIdentifierLoose})`;
const loosePlain = `[v=\\s]*${mainVersionLoose}${preReleaseLoose}?${build}?`;
const gtlt = '((?:<|>)?=?)';
const comparatorTrim = `(\\s*)${gtlt}\\s*(${loosePlain}|${xRangePlain})`;
const loneTilde = '(?:~>?)';
const tildeTrim = `(\\s*)${loneTilde}\\s+`;
const loneCaret = '(?:\\^)';
const caretTrim = `(\\s*)${loneCaret}\\s+`;
const star = '(<|>)?=?\\s*\\*';
const caret = `^${loneCaret}${xRangePlain}$`;
const mainVersion = `(${numericIdentifier})\\.(${numericIdentifier})\\.(${numericIdentifier})`;
const fullPlain = `v?${mainVersion}${preRelease}?${build}?`;
const tilde = `^${loneTilde}${xRangePlain}$`;
const xRange = `^${gtlt}\\s*${xRangePlain}$`;
const comparator = `^${gtlt}\\s*(${fullPlain})$|^$`;
// copy from semver package
const gte0 = '^\\s*>=\\s*0.0.0\\s*$';

// fork from https://github.com/originjs/vite-plugin-federation/blob/v1.1.12/packages/lib/src/utils/semver/index.ts
// Copyright (c)
// vite-plugin-federation is licensed under Mulan PSL v2.
// You can use this software according to the terms and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//      http://license.coscl.org.cn/MulanPSL2
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.
function parseRegex(source) {
    return new RegExp(source);
}
function isXVersion(version) {
    return !version || version.toLowerCase() === 'x' || version === '*';
}
function pipe(...fns) {
    return (x)=>fns.reduce((v, f)=>f(v), x);
}
function extractComparator(comparatorString) {
    return comparatorString.match(parseRegex(comparator));
}
function combineVersion(major, minor, patch, preRelease) {
    const mainVersion = `${major}.${minor}.${patch}`;
    if (preRelease) {
        return `${mainVersion}-${preRelease}`;
    }
    return mainVersion;
}

// fork from https://github.com/originjs/vite-plugin-federation/blob/v1.1.12/packages/lib/src/utils/semver/index.ts
// Copyright (c)
// vite-plugin-federation is licensed under Mulan PSL v2.
// You can use this software according to the terms and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//      http://license.coscl.org.cn/MulanPSL2
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.
function parseHyphen(range) {
    return range.replace(parseRegex(hyphenRange), (_range, from, fromMajor, fromMinor, fromPatch, _fromPreRelease, _fromBuild, to, toMajor, toMinor, toPatch, toPreRelease)=>{
        if (isXVersion(fromMajor)) {
            from = '';
        } else if (isXVersion(fromMinor)) {
            from = `>=${fromMajor}.0.0`;
        } else if (isXVersion(fromPatch)) {
            from = `>=${fromMajor}.${fromMinor}.0`;
        } else {
            from = `>=${from}`;
        }
        if (isXVersion(toMajor)) {
            to = '';
        } else if (isXVersion(toMinor)) {
            to = `<${Number(toMajor) + 1}.0.0-0`;
        } else if (isXVersion(toPatch)) {
            to = `<${toMajor}.${Number(toMinor) + 1}.0-0`;
        } else if (toPreRelease) {
            to = `<=${toMajor}.${toMinor}.${toPatch}-${toPreRelease}`;
        } else {
            to = `<=${to}`;
        }
        return `${from} ${to}`.trim();
    });
}
function parseComparatorTrim(range) {
    return range.replace(parseRegex(comparatorTrim), '$1$2$3');
}
function parseTildeTrim(range) {
    return range.replace(parseRegex(tildeTrim), '$1~');
}
function parseCaretTrim(range) {
    return range.replace(parseRegex(caretTrim), '$1^');
}
function parseCarets(range) {
    return range.trim().split(/\s+/).map((rangeVersion)=>rangeVersion.replace(parseRegex(caret), (_, major, minor, patch, preRelease)=>{
            if (isXVersion(major)) {
                return '';
            } else if (isXVersion(minor)) {
                return `>=${major}.0.0 <${Number(major) + 1}.0.0-0`;
            } else if (isXVersion(patch)) {
                if (major === '0') {
                    return `>=${major}.${minor}.0 <${major}.${Number(minor) + 1}.0-0`;
                } else {
                    return `>=${major}.${minor}.0 <${Number(major) + 1}.0.0-0`;
                }
            } else if (preRelease) {
                if (major === '0') {
                    if (minor === '0') {
                        return `>=${major}.${minor}.${patch}-${preRelease} <${major}.${minor}.${Number(patch) + 1}-0`;
                    } else {
                        return `>=${major}.${minor}.${patch}-${preRelease} <${major}.${Number(minor) + 1}.0-0`;
                    }
                } else {
                    return `>=${major}.${minor}.${patch}-${preRelease} <${Number(major) + 1}.0.0-0`;
                }
            } else {
                if (major === '0') {
                    if (minor === '0') {
                        return `>=${major}.${minor}.${patch} <${major}.${minor}.${Number(patch) + 1}-0`;
                    } else {
                        return `>=${major}.${minor}.${patch} <${major}.${Number(minor) + 1}.0-0`;
                    }
                }
                return `>=${major}.${minor}.${patch} <${Number(major) + 1}.0.0-0`;
            }
        })).join(' ');
}
function parseTildes(range) {
    return range.trim().split(/\s+/).map((rangeVersion)=>rangeVersion.replace(parseRegex(tilde), (_, major, minor, patch, preRelease)=>{
            if (isXVersion(major)) {
                return '';
            } else if (isXVersion(minor)) {
                return `>=${major}.0.0 <${Number(major) + 1}.0.0-0`;
            } else if (isXVersion(patch)) {
                return `>=${major}.${minor}.0 <${major}.${Number(minor) + 1}.0-0`;
            } else if (preRelease) {
                return `>=${major}.${minor}.${patch}-${preRelease} <${major}.${Number(minor) + 1}.0-0`;
            }
            return `>=${major}.${minor}.${patch} <${major}.${Number(minor) + 1}.0-0`;
        })).join(' ');
}
function parseXRanges(range) {
    return range.split(/\s+/).map((rangeVersion)=>rangeVersion.trim().replace(parseRegex(xRange), (ret, gtlt, major, minor, patch, preRelease)=>{
            const isXMajor = isXVersion(major);
            const isXMinor = isXMajor || isXVersion(minor);
            const isXPatch = isXMinor || isXVersion(patch);
            if (gtlt === '=' && isXPatch) {
                gtlt = '';
            }
            preRelease = '';
            if (isXMajor) {
                if (gtlt === '>' || gtlt === '<') {
                    // nothing is allowed
                    return '<0.0.0-0';
                } else {
                    // nothing is forbidden
                    return '*';
                }
            } else if (gtlt && isXPatch) {
                // replace X with 0
                if (isXMinor) {
                    minor = 0;
                }
                patch = 0;
                if (gtlt === '>') {
                    // >1 => >=2.0.0
                    // >1.2 => >=1.3.0
                    gtlt = '>=';
                    if (isXMinor) {
                        major = Number(major) + 1;
                        minor = 0;
                        patch = 0;
                    } else {
                        minor = Number(minor) + 1;
                        patch = 0;
                    }
                } else if (gtlt === '<=') {
                    // <=0.7.x is actually <0.8.0, since any 0.7.x should pass
                    // Similarly, <=7.x is actually <8.0.0, etc.
                    gtlt = '<';
                    if (isXMinor) {
                        major = Number(major) + 1;
                    } else {
                        minor = Number(minor) + 1;
                    }
                }
                if (gtlt === '<') {
                    preRelease = '-0';
                }
                return `${gtlt + major}.${minor}.${patch}${preRelease}`;
            } else if (isXMinor) {
                return `>=${major}.0.0${preRelease} <${Number(major) + 1}.0.0-0`;
            } else if (isXPatch) {
                return `>=${major}.${minor}.0${preRelease} <${major}.${Number(minor) + 1}.0-0`;
            }
            return ret;
        })).join(' ');
}
function parseStar(range) {
    return range.trim().replace(parseRegex(star), '');
}
function parseGTE0(comparatorString) {
    return comparatorString.trim().replace(parseRegex(gte0), '');
}

// fork from https://github.com/originjs/vite-plugin-federation/blob/v1.1.12/packages/lib/src/utils/semver/index.ts
// Copyright (c)
// vite-plugin-federation is licensed under Mulan PSL v2.
// You can use this software according to the terms and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//      http://license.coscl.org.cn/MulanPSL2
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.
function compareAtom(rangeAtom, versionAtom) {
    rangeAtom = Number(rangeAtom) || rangeAtom;
    versionAtom = Number(versionAtom) || versionAtom;
    if (rangeAtom > versionAtom) {
        return 1;
    }
    if (rangeAtom === versionAtom) {
        return 0;
    }
    return -1;
}
function comparePreRelease(rangeAtom, versionAtom) {
    const { preRelease: rangePreRelease } = rangeAtom;
    const { preRelease: versionPreRelease } = versionAtom;
    if (rangePreRelease === undefined && Boolean(versionPreRelease)) {
        return 1;
    }
    if (Boolean(rangePreRelease) && versionPreRelease === undefined) {
        return -1;
    }
    if (rangePreRelease === undefined && versionPreRelease === undefined) {
        return 0;
    }
    for(let i = 0, n = rangePreRelease.length; i <= n; i++){
        const rangeElement = rangePreRelease[i];
        const versionElement = versionPreRelease[i];
        if (rangeElement === versionElement) {
            continue;
        }
        if (rangeElement === undefined && versionElement === undefined) {
            return 0;
        }
        if (!rangeElement) {
            return 1;
        }
        if (!versionElement) {
            return -1;
        }
        return compareAtom(rangeElement, versionElement);
    }
    return 0;
}
function compareVersion(rangeAtom, versionAtom) {
    return compareAtom(rangeAtom.major, versionAtom.major) || compareAtom(rangeAtom.minor, versionAtom.minor) || compareAtom(rangeAtom.patch, versionAtom.patch) || comparePreRelease(rangeAtom, versionAtom);
}
function eq(rangeAtom, versionAtom) {
    return rangeAtom.version === versionAtom.version;
}
function compare(rangeAtom, versionAtom) {
    switch(rangeAtom.operator){
        case '':
        case '=':
            return eq(rangeAtom, versionAtom);
        case '>':
            return compareVersion(rangeAtom, versionAtom) < 0;
        case '>=':
            return eq(rangeAtom, versionAtom) || compareVersion(rangeAtom, versionAtom) < 0;
        case '<':
            return compareVersion(rangeAtom, versionAtom) > 0;
        case '<=':
            return eq(rangeAtom, versionAtom) || compareVersion(rangeAtom, versionAtom) > 0;
        case undefined:
            {
                // mean * or x -> all versions
                return true;
            }
        default:
            return false;
    }
}

// fork from https://github.com/originjs/vite-plugin-federation/blob/v1.1.12/packages/lib/src/utils/semver/index.ts
// Copyright (c)
// vite-plugin-federation is licensed under Mulan PSL v2.
// You can use this software according to the terms and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//      http://license.coscl.org.cn/MulanPSL2
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.
function parseComparatorString(range) {
    return pipe(// handle caret
    // ^ --> * (any, kinda silly)
    // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
    // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
    // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
    // ^1.2.3 --> >=1.2.3 <2.0.0-0
    // ^1.2.0 --> >=1.2.0 <2.0.0-0
    parseCarets, // handle tilde
    // ~, ~> --> * (any, kinda silly)
    // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
    // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
    // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
    // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
    // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
    parseTildes, parseXRanges, parseStar)(range);
}
function parseRange(range) {
    return pipe(// handle hyphenRange
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    parseHyphen, // handle trim comparator
    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    parseComparatorTrim, // handle trim tilde
    // `~ 1.2.3` => `~1.2.3`
    parseTildeTrim, // handle trim caret
    // `^ 1.2.3` => `^1.2.3`
    parseCaretTrim)(range.trim()).split(/\s+/).join(' ');
}
function satisfy(version, range) {
    if (!version) {
        return false;
    }
    const parsedRange = parseRange(range);
    const parsedComparator = parsedRange.split(' ').map((rangeVersion)=>parseComparatorString(rangeVersion)).join(' ');
    const comparators = parsedComparator.split(/\s+/).map((comparator)=>parseGTE0(comparator));
    const extractedVersion = extractComparator(version);
    if (!extractedVersion) {
        return false;
    }
    const [, versionOperator, , versionMajor, versionMinor, versionPatch, versionPreRelease] = extractedVersion;
    const versionAtom = {
        operator: versionOperator,
        version: combineVersion(versionMajor, versionMinor, versionPatch, versionPreRelease),
        major: versionMajor,
        minor: versionMinor,
        patch: versionPatch,
        preRelease: versionPreRelease == null ? void 0 : versionPreRelease.split('.')
    };
    for (const comparator of comparators){
        const extractedComparator = extractComparator(comparator);
        if (!extractedComparator) {
            return false;
        }
        const [, rangeOperator, , rangeMajor, rangeMinor, rangePatch, rangePreRelease] = extractedComparator;
        const rangeAtom = {
            operator: rangeOperator,
            version: combineVersion(rangeMajor, rangeMinor, rangePatch, rangePreRelease),
            major: rangeMajor,
            minor: rangeMinor,
            patch: rangePatch,
            preRelease: rangePreRelease == null ? void 0 : rangePreRelease.split('.')
        };
        if (!compare(rangeAtom, versionAtom)) {
            return false; // early return
        }
    }
    return true;
}

function formatShare(shareArgs, from, name, shareStrategy) {
    let get;
    if ('get' in shareArgs) {
        // eslint-disable-next-line prefer-destructuring
        get = shareArgs.get;
    } else if ('lib' in shareArgs) {
        get = ()=>Promise.resolve(shareArgs.lib);
    } else {
        get = ()=>Promise.resolve(()=>{
                throw new Error(`Can not get shared '${name}'!`);
            });
    }
    if (shareArgs.strategy) {
        warn(`"shared.strategy is deprecated, please set in initOptions.shareStrategy instead!"`);
    }
    var _shareArgs_version, _shareArgs_scope, _shareArgs_strategy;
    return _extends({
        deps: [],
        useIn: [],
        from,
        loading: null
    }, shareArgs, {
        shareConfig: _extends({
            requiredVersion: `^${shareArgs.version}`,
            singleton: false,
            eager: false,
            strictVersion: false
        }, shareArgs.shareConfig),
        get,
        loaded: (shareArgs == null ? void 0 : shareArgs.loaded) || 'lib' in shareArgs ? true : undefined,
        version: (_shareArgs_version = shareArgs.version) != null ? _shareArgs_version : '0',
        scope: Array.isArray(shareArgs.scope) ? shareArgs.scope : [
            (_shareArgs_scope = shareArgs.scope) != null ? _shareArgs_scope : 'default'
        ],
        strategy: ((_shareArgs_strategy = shareArgs.strategy) != null ? _shareArgs_strategy : shareStrategy) || 'version-first'
    });
}
function formatShareConfigs(globalOptions, userOptions) {
    const shareArgs = userOptions.shared || {};
    const from = userOptions.name;
    const shareInfos = Object.keys(shareArgs).reduce((res, pkgName)=>{
        const arrayShareArgs = arrayOptions(shareArgs[pkgName]);
        res[pkgName] = res[pkgName] || [];
        arrayShareArgs.forEach((shareConfig)=>{
            res[pkgName].push(formatShare(shareConfig, from, pkgName, userOptions.shareStrategy));
        });
        return res;
    }, {});
    const shared = _extends({}, globalOptions.shared);
    Object.keys(shareInfos).forEach((shareKey)=>{
        if (!shared[shareKey]) {
            shared[shareKey] = shareInfos[shareKey];
        } else {
            shareInfos[shareKey].forEach((newUserSharedOptions)=>{
                const isSameVersion = shared[shareKey].find((sharedVal)=>sharedVal.version === newUserSharedOptions.version);
                if (!isSameVersion) {
                    shared[shareKey].push(newUserSharedOptions);
                }
            });
        }
    });
    return {
        shared,
        shareInfos
    };
}
function versionLt(a, b) {
    const transformInvalidVersion = (version)=>{
        const isNumberVersion = !Number.isNaN(Number(version));
        if (isNumberVersion) {
            const splitArr = version.split('.');
            let validVersion = version;
            for(let i = 0; i < 3 - splitArr.length; i++){
                validVersion += '.0';
            }
            return validVersion;
        }
        return version;
    };
    if (satisfy(transformInvalidVersion(a), `<=${transformInvalidVersion(b)}`)) {
        return true;
    } else {
        return false;
    }
}
const findVersion = (shareVersionMap, cb)=>{
    const callback = cb || function(prev, cur) {
        return versionLt(prev, cur);
    };
    return Object.keys(shareVersionMap).reduce((prev, cur)=>{
        if (!prev) {
            return cur;
        }
        if (callback(prev, cur)) {
            return cur;
        }
        // default version is '0' https://github.com/webpack/webpack/blob/main/lib/sharing/ProvideSharedModule.js#L136
        if (prev === '0') {
            return cur;
        }
        return prev;
    }, 0);
};
const isLoaded = (shared)=>{
    return Boolean(shared.loaded) || typeof shared.lib === 'function';
};
const isLoading = (shared)=>{
    return Boolean(shared.loading);
};
function findSingletonVersionOrderByVersion(shareScopeMap, scope, pkgName) {
    const versions = shareScopeMap[scope][pkgName];
    const callback = function(prev, cur) {
        return !isLoaded(versions[prev]) && versionLt(prev, cur);
    };
    return findVersion(shareScopeMap[scope][pkgName], callback);
}
function findSingletonVersionOrderByLoaded(shareScopeMap, scope, pkgName) {
    const versions = shareScopeMap[scope][pkgName];
    const callback = function(prev, cur) {
        const isLoadingOrLoaded = (shared)=>{
            return isLoaded(shared) || isLoading(shared);
        };
        if (isLoadingOrLoaded(versions[cur])) {
            if (isLoadingOrLoaded(versions[prev])) {
                return Boolean(versionLt(prev, cur));
            } else {
                return true;
            }
        }
        if (isLoadingOrLoaded(versions[prev])) {
            return false;
        }
        return versionLt(prev, cur);
    };
    return findVersion(shareScopeMap[scope][pkgName], callback);
}
function getFindShareFunction(strategy) {
    if (strategy === 'loaded-first') {
        return findSingletonVersionOrderByLoaded;
    }
    return findSingletonVersionOrderByVersion;
}
function getRegisteredShare(localShareScopeMap, pkgName, shareInfo, resolveShare) {
    if (!localShareScopeMap) {
        return;
    }
    const { shareConfig, scope = DEFAULT_SCOPE, strategy } = shareInfo;
    const scopes = Array.isArray(scope) ? scope : [
        scope
    ];
    for (const sc of scopes){
        if (shareConfig && localShareScopeMap[sc] && localShareScopeMap[sc][pkgName]) {
            const { requiredVersion } = shareConfig;
            const findShareFunction = getFindShareFunction(strategy);
            const maxOrSingletonVersion = findShareFunction(localShareScopeMap, sc, pkgName);
            //@ts-ignore
            const defaultResolver = ()=>{
                if (shareConfig.singleton) {
                    if (typeof requiredVersion === 'string' && !satisfy(maxOrSingletonVersion, requiredVersion)) {
                        const msg = `Version ${maxOrSingletonVersion} from ${maxOrSingletonVersion && localShareScopeMap[sc][pkgName][maxOrSingletonVersion].from} of shared singleton module ${pkgName} does not satisfy the requirement of ${shareInfo.from} which needs ${requiredVersion})`;
                        if (shareConfig.strictVersion) {
                            error(msg);
                        } else {
                            warn(msg);
                        }
                    }
                    return localShareScopeMap[sc][pkgName][maxOrSingletonVersion];
                } else {
                    if (requiredVersion === false || requiredVersion === '*') {
                        return localShareScopeMap[sc][pkgName][maxOrSingletonVersion];
                    }
                    if (satisfy(maxOrSingletonVersion, requiredVersion)) {
                        return localShareScopeMap[sc][pkgName][maxOrSingletonVersion];
                    }
                    for (const [versionKey, versionValue] of Object.entries(localShareScopeMap[sc][pkgName])){
                        if (satisfy(versionKey, requiredVersion)) {
                            return versionValue;
                        }
                    }
                }
            };
            const params = {
                shareScopeMap: localShareScopeMap,
                scope: sc,
                pkgName,
                version: maxOrSingletonVersion,
                GlobalFederation: Global.__FEDERATION__,
                resolver: defaultResolver
            };
            const resolveShared = resolveShare.emit(params) || params;
            return resolveShared.resolver();
        }
    }
}
function getGlobalShareScope() {
    return Global.__FEDERATION__.__SHARE__;
}
function getTargetSharedOptions(options) {
    const { pkgName, extraOptions, shareInfos } = options;
    const defaultResolver = (sharedOptions)=>{
        if (!sharedOptions) {
            return undefined;
        }
        const shareVersionMap = {};
        sharedOptions.forEach((shared)=>{
            shareVersionMap[shared.version] = shared;
        });
        const callback = function(prev, cur) {
            return !isLoaded(shareVersionMap[prev]) && versionLt(prev, cur);
        };
        const maxVersion = findVersion(shareVersionMap, callback);
        return shareVersionMap[maxVersion];
    };
    var _extraOptions_resolver;
    const resolver = (_extraOptions_resolver = extraOptions == null ? void 0 : extraOptions.resolver) != null ? _extraOptions_resolver : defaultResolver;
    return Object.assign({}, resolver(shareInfos[pkgName]), extraOptions == null ? void 0 : extraOptions.customShareInfo);
}



;// ../runtime/dist/helpers.esm.mjs


const ShareUtils = {
    getRegisteredShare: getRegisteredShare,
    getGlobalShareScope: getGlobalShareScope
};
const GlobalUtils = {
    Global: Global,
    nativeGlobal: nativeGlobal,
    resetFederationGlobalInfo: resetFederationGlobalInfo,
    getGlobalFederationInstance: getGlobalFederationInstance,
    setGlobalFederationInstance: setGlobalFederationInstance,
    getGlobalFederationConstructor: getGlobalFederationConstructor,
    setGlobalFederationConstructor: setGlobalFederationConstructor,
    getInfoWithoutType: getInfoWithoutType,
    getGlobalSnapshot: getGlobalSnapshot,
    getTargetSnapshotInfoByModuleInfo: getTargetSnapshotInfoByModuleInfo,
    getGlobalSnapshotInfoByModuleInfo: getGlobalSnapshotInfoByModuleInfo,
    setGlobalSnapshotInfoByModuleInfo: setGlobalSnapshotInfoByModuleInfo,
    addGlobalSnapshot: addGlobalSnapshot,
    getRemoteEntryExports: getRemoteEntryExports,
    registerGlobalPlugins: registerGlobalPlugins,
    getGlobalHostPlugins: getGlobalHostPlugins,
    getPreloaded: getPreloaded,
    setPreloaded: setPreloaded
};
var helpers = {
    global: GlobalUtils,
    share: ShareUtils
};



;// ./src/utils/sdk/index.ts
const setLocalStorage=(key,value)=>{localStorage.setItem(key,value);};const removeLocalStorage=key=>{const data=localStorage.getItem(key);if(data){localStorage.removeItem(key);}};const mergeLocalStorage=(target,key,value)=>{const str=localStorage.getItem(target);const obj=JSON.parse(str||'{}');obj[key]=value;localStorage.setItem(target,JSON.stringify(obj));};const removeLocalStorageKey=(target,key)=>{const str=localStorage.getItem(target);if(str){const obj=JSON.parse(str||'{}');delete obj[key];localStorage.setItem(target,JSON.stringify(obj));}};const sdk_isObject=target=>Object.prototype.toString.call(target)==='[object Object]';const reloadPage=()=>{var _globalThis$location;globalThis===null||globalThis===void 0||(_globalThis$location=globalThis.location)===null||_globalThis$location===void 0||_globalThis$location.reload();};const validateCustom=schema=>schema===null||schema===void 0?void 0:schema.endsWith('.json');const getUnpkgUrl=(pkg,version)=>{if(pkg==='react'){return`https://unpkg.com/react@${version}/umd/react.development.js`;}else if(pkg==='react-dom'){return`https://unpkg.com/react-dom@${version}/umd/react-dom.development.js`;}};const sdk_definePropertyGlobalVal=(target,key,val)=>{Object.defineProperty(target,key,{value:val,configurable:false,writable:true});};
;// ./src/utils/chrome/snapshot-plugin.ts
var _window,_window2,_window$__FEDERATION_;const chromeDevtoolsPlugin=function chromeDevtoolsPlugin(){return{name:'mf-chrome-devtools-inject-snapshot-plugin',beforeLoadRemoteSnapshot({options}){const{nativeGlobal}=helpers.global;if(!options||options.inBrowser){const realLocalStorage=nativeGlobal.localStorage||localStorage;const debugModuleInfoStr=realLocalStorage.getItem(index_esm/* MODULE_DEVTOOL_IDENTIFIER */.Bf);if(debugModuleInfoStr&&!nativeGlobal.__INIT_VMOK_CHROME_DEVTOOL_PLUGIN__){const chromeDevtoolSnapshot=JSON.parse(debugModuleInfoStr);if(chromeDevtoolSnapshot){helpers.global.addGlobalSnapshot(chromeDevtoolSnapshot);nativeGlobal.__INIT_VMOK_CHROME_DEVTOOL_PLUGIN__=true;console.warn('[Module Federation Devtools]: You are using the chrome devtool to proxy online module');}}}}};};if(!((_window=window)!==null&&_window!==void 0&&_window.__FEDERATION__)){sdk_definePropertyGlobalVal(window,'__FEDERATION__',{});sdk_definePropertyGlobalVal(window,'__VMOK__',window.__FEDERATION__);}if(!((_window2=window)!==null&&_window2!==void 0&&_window2.__FEDERATION__.__GLOBAL_PLUGIN__)){window.__FEDERATION__.__GLOBAL_PLUGIN__=[];}(_window$__FEDERATION_=window.__FEDERATION__.__GLOBAL_PLUGIN__)===null||_window$__FEDERATION_===void 0?void 0:_window$__FEDERATION_.push(chromeDevtoolsPlugin());
/******/ })()
;