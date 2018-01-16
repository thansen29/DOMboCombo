window.$t = $t;
window.$ = $;

const DOMNodeCollection = require("./dom_node_collection.js");

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
