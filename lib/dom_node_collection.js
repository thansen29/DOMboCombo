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

  // attr(attributeName, value){
  //   if (value === undefined){
  //     return this.elements[0].getAttribute(attributeName);
  //   }
  //   else {
  //     this.elements.forEach((htmlEl) => {
  //       htmlEl.setAttribute(attributeName, value);
  //     });
  //   }
  // }

  attr(arg, value) {
  if(value === undefined) {
    return this.elements[0].getAttribute(arg);
  } else {
    this.elements[0].setAttribute(arg, value);
  }
  return this;
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
