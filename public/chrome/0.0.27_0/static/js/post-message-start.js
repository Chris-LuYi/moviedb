/******/ (() => { // webpackBootstrap
var _window;// The purpose of this script is: the global plug-in injection is very early, the post message sends the message, the devtools receives the message listener is not running, resulting in the initial data is not available
// To get the initial data, actively get the global variable to send the message
const moduleInfo=(_window=window)===null||_window===void 0||(_window=_window.__FEDERATION__)===null||_window===void 0?void 0:_window.moduleInfo;window.postMessage({moduleInfo},'*');
/******/ })()
;