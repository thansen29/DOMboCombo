# DOMbo Combo
DOMbo Combo is a lightweight library designed to enhance AJAX requests and manipulate DOM elements. Simply fill in a github username, and DOMbo Combo will
make an AJAX request to Github's servers, and insert the relevant data in to the DOM.

[See Live](http://www.tomhansen.io/DOMboCombo/)

To use DOMbo Combo, simply download the DOMboCombo zip file, and use $t('selector') to turn your HTML elements in to custom DOMNodeCollection objects, which you can then use the API listed below on.

## API

### each(cb)
Invokes a callback on each element

### html(string)
Adds an innerHTML of the string to an element, or gets the html contents of the first element in the set of matched elements

### empty()
Removes all child nodes of the set of matched elements from the DOM

### append(children)
Insert content to the end of each element in the set of matched elements

### attr(attributeName, value)
Sets the attribute for every matched element, or gets the value of an attribute of the first element in the set of matched elements

### addClass(newClass)
Adds the specified class(es) to each element in the set of matched elements

### removeClass(oldClass)
Removes the specified class from the element, or all classes from each element in the set of matched elements

### children()
Gets the children of each element in the set of matched elements

### parent()
Gets the parent of each element in the set of matched elements

### find(selector)
Gets the descendants of each element in the set of matched elements, filtered by a selector

### val()
Gets the value of the first element in the set of matched elements.

### on(eventName, callback)
Attach an event handler function onto the selected element

### off(eventName, callback)
Remove an event handler function from the selected element
