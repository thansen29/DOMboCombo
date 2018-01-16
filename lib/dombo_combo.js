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

window.$t = $t;
window.$ = $;

const DOMNodeCollection = __webpack_require__(1);

function $t(arg) {
  // debugger
  // switch (typeof arg) {
  //   case "function":
  //     return document.addEventListener('DOMContentLoaded', arg);
  //   case "object":
  //   console.log("AHHHHHH");
  //     if(arg instanceof HTMLElement){
  //       return new DOMNodeCollection([arg]);
  //     }
  //   case "string":
  //   console.log(":(");
  //
  //     return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
  // }
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

$t.extend = (target, ...otherObjs) => {
  otherObjs.forEach((obj) => {
    for (const prop in obj) {
      target[prop] = obj[prop];
    }
  });
  return target;
};

$t.ajax = (options = {}) => {
  const request = new XMLHttpRequest();

  const defaults = {
    success: function(){},
    error: function(){},
    url: "",
    method: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  options = $t.extend(defaults, options);
  options.method = options.method.toUpperCase();

  request.open(options.method, options.url, true);

  request.onload = e => {
    if(request.status === 200){
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(elements){
    this.elements = elements;
  }

  each(cb) {
    this.elements.forEach(cb);
  }


  html(string){
    if (string === undefined){
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach((htmlEl) => {
        htmlEl.innerHTML = string;
      });
    }
  }

  empty(){
    this.html('');
  }

  append(children){
    // if (children instanceof DOMNodeCollection){
    //   this.elements.forEach((parent) => {
    //     children.elements.forEach((child) => {
    //       let clone = child.cloneNode();
    //       parent.appendChild(clone);
    //     });
    //   });
    // } else if (children instanceof HTMLElement){
    //   this.elements.forEach((parent) => {
    //     let clone = children.cloneNode();
    //     parent.appendChild(clone);
    //   });
    // } else {
    //   this.html(children);
    // }
    if (this.elements.length === 0) return;

    if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {
      children = $t(children);
    }

    if (typeof children === "string") {
      this.each(node => node.innerHTML += children);
    } else if (children instanceof DOMNodeCollection) {
        this.each(node => {
          children.each(childNode => {
            node.appendChild(childNode.cloneNode(true));
          });
        });
      }

    return this;
  }

  attr(attributeName, value){
    if (value === undefined){
      return this.elements[0].getAttribute(attributeName);
    }
    else {
      this.elements.forEach((htmlEl) => {
        htmlEl.setAttribute(attributeName, value);
      });
    }
  }

  addClass(newClass){
    this.elements.forEach((htmlEl) => {
      htmlEl.classList.add(newClass);
    });
  }

  removeClass(oldClass){
    this.elements.forEach((htmlEl) => {
      htmlEl.classList.remove(oldClass);
    });
  }

  children(){
    let childNodes = [];
    this.elements.forEach((htmlEl) => {
      childNodes = childNodes.concat(Array.from(htmlEl.children));
    });
    return new DOMNodeCollection(childNodes);
  }

  parent(){
    let parentNodes = [];
    this.elements.forEach((htmlEl) => {
      if(!parentNodes.includes(htmlEl.parentElement)){
        parentNodes.push(htmlEl.parentElement);
      }
    });
    return new DOMNodeCollection(parentNodes);
  }

  find(selector){
    let foundNodes = [];
    this.elements.forEach((htmlEl) => {
      foundNodes = foundNodes.concat(Array.from(htmlEl.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(foundNodes);
  }

  remove(){
    this.elements.forEach((htmlEl) => {
      htmlEl.parentElement.removeChild(htmlEl);
    });
  }

  on(eventName, callback){
    this.elements.forEach((htmlEl) => {
      htmlEl.addEventListener(eventName, callback);
    });
  }

  off(eventName, callback){
    this.elements.forEach((htmlEl) => {
      htmlEl.removeEventListener(eventName, callback);
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=dombo_combo.js.map