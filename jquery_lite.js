/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

window.$l = $l;
window.$ = $;

const DOMNodeCollection = __webpack_require__(1);
window.D = DOMNodeCollection;
$l(function (){
  
  console.log($l('ul'));
});

function $l(arg){
  if(arg instanceof Function){
    document.addEventListener('DOMContentLoaded', arg);
  }
  else if (arg instanceof HTMLElement){
    return new DOMNodeCollection([arg]);
  }
  else {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
  }
}

$l.extend = function(target, ...objs){
  objs.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      target[key] = obj[key];
    });
  });
};

$l.ajax = function(options = {}){
  const defaults = {
    success: function(){},
    error: function(){},
    url: window.location.href,
    method: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  this.extend(defaults, options);
  const xhr = new XMLHttpRequest();
  
  xhr.open(defaults.method, 'http://api.openweathermap.org/data/2.5/weather' +
  	'?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b');
    
  xhr.onload = function () {
    console.log(xhr.response);
  };
  xhr.onerror = function () {
    console.log(xhr.response);
  };
  
  xhr.send(defaults);
  // return xhr;
  
  // let p = new Promise((resolve, reject) => {
  //   xhr.open(defaults.method, 'http://api.openweathermap.org/data/2.5/weather' +
  //   	'?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b');
  // 
  //   xhr.send(defaults);
  //   setTimeout(() => {
  //     resolve();
  //   }, 5000);
  // });
  // 
  // p.then((resp)=> {
  //   console.log(resp);
  // });
  
};

// application/x-www-form-urlencoded; charset=UTF-8' content type

/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/tomhansen/Documents/AppAcademy/Classwork/W6D4/lib/dom_node_collection.js'\n    at Error (native)");

/***/ })
/******/ ]);