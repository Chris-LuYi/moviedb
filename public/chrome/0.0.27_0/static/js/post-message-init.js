/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

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

;// ./src/template/constant.ts
const constant_FormID='FormID';const ENABLEHMR='enableHMR';const proxyFormField='proxyFormField';const defaultDataItem={key:'',value:'',checked:true};const defaultModuleData={proxyFormField:[_objectSpread2({},defaultDataItem)]};const statusInfo={noProxy:{status:'noProxy',message:'Modules are not currently proxied',color:'#698cee'},processing:{status:'processing',message:'Obtaining remote module information',color:'#FF7D00'},success:{status:'success',message:'The proxy configuration has taken effect and the corresponding page has been automatically refreshed.',color:'#50b042'},error:{status:'error',message:'Calculating Snapshot failed, please confirm whether the package information is correct',color:'#F53F3F'}};const __ENABLE_FAST_REFRESH__='enableFastRefresh';const BROWSER_ENV_KEY='MF_ENV';const __FEDERATION_DEVTOOLS__='__MF_DEVTOOLS__';
;// ./src/utils/chrome/storage.ts
const mergeStorage=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref=_asyncToGenerator(function*(...args){return injectScript(mergeLocalStorage,false,...args);});return function mergeStorage(){return _ref.apply(this,arguments);};}()));const removeStorageKey=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref2=_asyncToGenerator(function*(...args){return injectScript(removeLocalStorageKey,false,...args);});return function removeStorageKey(){return _ref2.apply(this,arguments);};}()));const removeStorage=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref3=_asyncToGenerator(function*(...args){return injectScript(removeLocalStorage,false,...args);});return function removeStorage(){return _ref3.apply(this,arguments);};}()));const setStorage=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref4=_asyncToGenerator(function*(...args){return injectScript(setLocalStorage,false,...args);});return function setStorage(){return _ref4.apply(this,arguments);};}()));
;// ./src/utils/chrome/index.ts
const sleep=num=>{return new Promise(resolve=>{setTimeout(()=>{resolve();},num);});};const injectPostMessage=postMessageUrl=>{const script=document.createElement('script');script.src=postMessageUrl;document.getElementsByTagName('head')[0].appendChild(script);};const TabInfo={currentTabId:0};function getCurrentTabId(){return TabInfo.currentTabId;}function getInspectWindowTabId(){return new Promise((resolve,reject)=>{var _chrome;if((_chrome=chrome)!==null&&_chrome!==void 0&&(_chrome=_chrome.devtools)!==null&&_chrome!==void 0&&_chrome.inspectedWindow){// @ts-expect-error In dev mode, should resolve by hand
if(chrome.isDevMode){resolve(0);}chrome.devtools.inspectedWindow.eval('typeof window.__FEDERATION__ !== "undefined" || typeof window.__VMOK__ !== "undefined"',function(info,error){const{tabId}=chrome.devtools.inspectedWindow;getTabs().then(tabs=>{const target=tabs.find(tab=>tab.id===tabId);window.targetTab=target;});console.log('chrome.devtools.inspectedWindow.tabId',chrome.devtools.inspectedWindow.tabId);TabInfo.currentTabId=tabId;resolve(tabId);if(error){reject(error);}});}else{// chrome devtool e2e test，The test window opens independently
if(window.targetTab&&window.targetTab.id){const tabId=window.targetTab.id;TabInfo.currentTabId=tabId;resolve(tabId);}else{throw Error(`can't get active tab`);}}});}const getGlobalModuleInfo=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref=_asyncToGenerator(function*(callback){yield sleep(300);chrome.runtime.onMessage.addListener(message=>{var _window;const{origin,data}=message;if(!data||data!==null&&data!==void 0&&data.appInfos){return;}if(!((_window=window)!==null&&_window!==void 0&&_window.__FEDERATION__)){definePropertyGlobalVal(window,'__FEDERATION__',{});definePropertyGlobalVal(window,'__VMOK__',window.__FEDERATION__);}window.__FEDERATION__.originModuleInfo=JSON.parse(JSON.stringify(data===null||data===void 0?void 0:data.moduleInfo));if(data!==null&&data!==void 0&&data.updateModule){const moduleIds=Object.keys(window.__FEDERATION__.originModuleInfo);const shouldUpdate=!moduleIds.some(id=>id.includes(data.updateModule.name));if(shouldUpdate){const destination=data.updateModule.entry||data.updateModule.version;window.__FEDERATION__.originModuleInfo[`${data.updateModule.name}:${destination}`]={remoteEntry:destination,version:destination};}}window.__FEDERATION__.moduleInfo=JSON.parse(JSON.stringify(window.__FEDERATION__.originModuleInfo));callback(window.__FEDERATION__.moduleInfo);});const postMessageStartUrl=getUrl('post-message-start.js');yield chrome_injectScript(injectPostMessage,false,postMessageStartUrl);});return function getGlobalModuleInfo(_x){return _ref.apply(this,arguments);};}()));const getTabs=(queryOptions={})=>chrome.tabs.query(queryOptions);const getScope=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref2=_asyncToGenerator(function*(){const activeTab=window.targetTab;const favIconUrl=activeTab===null||activeTab===void 0?void 0:activeTab.favIconUrl;return favIconUrl||'noScope';});return function getScope(){return _ref2.apply(this,arguments);};}()));const chrome_injectScript=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _ref3=_asyncToGenerator(function*(excuteScript,world=false,...args){yield getInspectWindowTabId();return chrome.scripting.executeScript({target:{tabId:getCurrentTabId()},func:excuteScript,world:world?'MAIN':'ISOLATED',args}).then(()=>{console.log('InjectScript success, excuteScript:',args);}).catch(e=>{console.log(e,'InjectScript fail, excuteScript:',args);});});return function injectScript(_x2){return _ref3.apply(this,arguments);};}()));const getUrl=file=>{try{const pathSet=chrome.runtime.getURL(file).split('/');const fileName=pathSet.pop();pathSet.push('static','js',fileName);return pathSet.join('/');}catch(e){return'';}};const injectToast=(toastUtilUrl,e2eFlag)=>{const ele=document.querySelector(`[data-e2e=${e2eFlag}]`);if(ele){return;}const scriptToast=document.createElement('script');scriptToast.src=toastUtilUrl;scriptToast.dataset.e2e=e2eFlag;document.getElementsByTagName('head')[0].appendChild(scriptToast);};const setChromeStorage=formData=>{getScope().then(/*#__PURE__*/function(){var _ref4=_asyncToGenerator(function*(scope){const data=yield chrome.storage.sync.get('FormID');const storeData=data[FormID];const scopes=Object.keys(storeData||{});// Remove outdated data to avoid exceeded memory
let filterOutDatedData=storeData||{};const{length}=scopes;if(length>=10){filterOutDatedData=scopes.slice(0,length-3).reduce((memo,cur)=>{memo[cur]=storeData[cur];return memo;},{});}const existRules=storeData===null||storeData===void 0?void 0:storeData[scope];chrome.storage.sync.set({[FormID]:_objectSpread(_objectSpread({},filterOutDatedData),{},{[scope]:_objectSpread(_objectSpread({},existRules),formData)})});});return function(_x3){return _ref4.apply(this,arguments);};}());};
;// ./src/utils/chrome/post-message-init.ts
const postMessageUrl=getUrl('post-message.js');const script=document.createElement('script');script.src=postMessageUrl;document.getElementsByTagName('html')[0].appendChild(script);
/******/ })()
;