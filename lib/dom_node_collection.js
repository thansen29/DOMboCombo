class DOMNodeCollection {
  constructor(elements){
    this.elements = elements;
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
    if (children instanceof DOMNodeCollection){
      this.elements.forEach((parent) => {
        children.elements.forEach((child) => {
          let clone = child.cloneNode();
          parent.appendChild(clone);
        });
      });
    } else if (children instanceof HTMLElement){
      this.elements.forEach((parent) => {
        let clone = children.cloneNode();
        parent.appendChild(clone);
      });
    } else {
      this.html(children);
    }
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
