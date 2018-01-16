window.$l = $l;
window.$ = $;

const DOMNodeCollection = require("./dom_node_collection.js");
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