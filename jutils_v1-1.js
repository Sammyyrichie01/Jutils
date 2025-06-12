window.date = undefined;

/* manual date calculations */
function dateDiff(first, second, third) {
 const operations = {
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    '=': (a, b) => a === b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '!=': (a, b) => a !== b,
    '-': (a, b) => a - b,
    '+': (a, b) => parseInt(a) + parseInt(b),
     '*': (a, b) => a * b,
      '/': (a, b) => a / b,
  };
  
/* perform logic */
 if(arguments.length === 1) {
return first.replace(/\D/g, '');        
 } else if(arguments.length === 2) {
return first.replace(/\D/g, '') > second.replace(/\D/g, ''); 
 } else if(arguments.length === 3) {
 if (!operations[second]) {
      throw new Error(`Unsupported operator: ${second}`);
    }
    return operations[second](first.replace(/\D/g, ''), third.replace(/\D/g, ''));     
 } 
}


/* Send to server or receive from server */
function ajax(option) {
  // Check for undefined then throw error
  if (!option.url || option.url.trim() === "") {
    throw new Error("Url is required");
  }

  // Validate URL
  const tests = /^(?:https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}(:[0-9]+)?(\/.*)?$/;
  if (!tests.test(option.url)) {
    throw new Error("Invalid Url");
  }

  // Variable
  let methods = option.type || 'GET';
  let myUrl = option.url;
  let myData = null;
  let header = option.header || 'application/octet-stream';
  let mode = option.mode || 'cors';
  let credentials = option.credentials || 'same-origin';
  let cache = option.cache || 'default';

  // Set header object if string
  if (typeof header === 'string') {
    header = { 'Content-Type': header };
  }

  // Set myUrl and myData depending on outcome
  if (methods === 'GET' && option.data) {
    if (typeof option.data === 'object') {
      const param = new URLSearchParams(option.data).toString();
      myUrl = `${option.url}?${param}`;
    } else if (typeof option.data === 'string') {
      myUrl = option.url + '?' + option.data.replace(/ /g, '=').replace(/,/g, '&').replace(/\+/g, '&').replace(/-/g, '=');
    }
  } else if (methods !== 'GET' && option.data) {
    if (typeof option.data === 'object' && header['Content-Type'] === 'application/json') {
      myData = JSON.stringify(option.data);
    } else {
      myData = option.data;
    }
  }

  // Create the XMLHttpRequest() object
  var xhr = new XMLHttpRequest();
  xhr.open(methods, myUrl, true);
  for (let key in header) {
    xhr.setRequestHeader(key, header[key]);
  }
  xhr.withCredentials = credentials === 'include';
  xhr.send(myData);

  // Handle success
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      if (option.parse) {
        return option.success(JSON.parse(xhr.responseText));
      } else {
        return option.success(xhr.responseText);
      }
    } else {
      if (typeof option.status === 'function') {
        return option.status('NOT OK ' + xhr.statusText);
      }
    }
  };

  // Handle error if failed success
  xhr.onerror = function () {
    if (typeof option.error === 'function') {
      return option.error('Error: ' + xhr.statusText);
    }
  }
}


/* Date.parse() minis date from date */
function parseDate(first, second, third) {
const operations = {
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    '=': (a, b) => a === b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '!=': (a, b) => a !== b,
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
     '*': (a, b) => a * b,
      '/': (a, b) => a / b,
  };
  

 if(arguments.length === 1) {
return Date.parse(first);   
 } else if(arguments.length === 2) {
return Date.parse(first) > Date.parse(second); 
 } else if(arguments.length === 3) {
 if (!operations[second]) {
      throw new Error(`Unsupported operator: ${second}`);
    }
    return operations[second](Date.parse(first), Date.parse(third));     
 } 
}


/* localStorage */
function storage(first, second, third) {
const uegd = new Date().toLocaleDateString();
const bhg = new Date().toLocaleString();
if(arguments.length === 1) {
  if(first === 'clear') {
localStorage.clear();     
  }  
 return localStorage.getItem(first);
} else if(arguments.length === 2) {
if(first === 'remove') {
 localStorage.removeItem(second);  
} 
localStorage.setItem(first, second);
 } else if(arguments.length === 3) {
if(Date.parse(uegd) > Date.parse(third) || bhg.replace(/\D/g, '')  > third.replace(/\D/g, '')) {
  localStorage.removeItem(first); 
} else {
localStorage.setItem(first, second); 
}
 }  
}


function type(value, types) {
if(arguments.length === 1) {
  if(typeof value === 'object') {
  return Array.isArray(value) ? 'array' : typeof value;
} else {
    return typeof value;
}
} else if (arguments.length === 2) {
    return Array.isArray(value) && types === 'array' ? true : typeof value === types && !Array.isArray(value);
  } else {
    throw new RangeError('type() require 1 or 2 argument!');
  }
 }
 

// checking if a value is set
function isset(element) {
  if(element !== null && typeof element !== 'undefined') {
   return true;  
  } else {
      return false;
  }
  }    


// checking if a value is empty 
function empty(value) {
if(arguments.length === 0 || arguments.length > 1) {
 throw new RangeError('isempty() require 1 argument!');  
}

  return (
    value === null ||
    value === undefined ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim() === '') ||
    (typeof value === 'number' && isNaN(value)) ||
    (typeof value === 'boolean' && !value)
  );  
}


class Select {
 constructor(element, all) {  
  if (all) {
    try {
      this.element = document.querySelectorAll(element);
      this.check = element;
    } catch {
      this.element = element;
      this.check = element;
    }
  } else {
    try {
      if (element.startsWith('<') && element.endsWith('>')) {
        const tyrs = document.createElement('div');
        tyrs.innerHTML = element.trim();
        return new Select(tyrs);
      } else if (element.startsWith(':')) {
        const lisd = document.createElement(element.replace(':', ''));
        return new Select(lisd);
      } else {
        this.element = document.querySelector(element);
        this.check = element;
      }
    } catch {
      this.element = element;
      this.check = element;
    }
  }
}

 proxy() {
 return this.element || this.check;  
}
 
    at(index = 0) {  
 return new Select(this.element[index]);              
    }
   
   html(content) {
   if(content) {
this.element.innerHTML = content;    
return new Select(this.element);   
   } else {   
return this.element.innerHTML;      
   }    
   }

  text(content) {
   if(content) {
this.element.textContent = content;    
return new Select(this.element);   
   } else {
return this.element.textContent;      
   }    
   } 
   
   val(content) {
   if(content) {
this.element.value = content;    
return new Select(this.element);   
   } else {
return this.element.value;      
   }    
   }
  
 
 ready(callback) {
 if(this.element == document) {
document.addEventListener('DOMContentLoaded', callback);         
 } else if(this.element == window) {    
window.addEventListener('load', callback);
   } else if(this.check === 'online') {    
window.addEventListener('online', callback);
   } else if(this.check === 'offline') {    
window.addEventListener('offline', callback);
   } else if(this.check === 'onLine') {
 return navigator.onLine;            
   } else if(this.check === 'offLine') {
 return !navigator.onLine;            
   } 
}     


is(callback) {
  if(callback.startsWith('#')) { 
    return this.element.getAttribute('id') === callback.replace('#', '').trim(); 
  }
  
  if(callback.startsWith('.')) { 
    return this.element.getAttribute('class') === callback.replace('.', '').trim(); 
  }

  if(callback === ':undefined') { 
    return typeof this.check === 'undefined'; 
  }

  if(callback === ':null') { 
    return this.check === null; 
  }

  if(callback === ':func') { 
    return typeof this.check === 'function'; 
  }

  if(callback === ':object') { 
    return typeof this.check === 'object'; 
  }

  if(callback === ':array') { 
    return Array.isArray(this.check); 
  }

  if(callback === ':number') { 
    return typeof this.check === 'number'; 
  }

  if(callback === ':string') { 
    return typeof this.check === 'string'; 
  }

  if(callback === ':int') { 
    if(!isNaN(this.check)) { 
      return this.check % 1 === 0; 
    }
  }

  if(callback === ':float') { 
    if(!isNaN(this.check)) { 
      return this.check % 1 !== 0; 
    }
  }

  if(callback === ':upper') { 
    return this.check === this.check.toUpperCase(); 
  }

  if(callback === ':lower') { 
    return this.check === this.check.toLowerCase(); 
  }

  if(callback === ':even') { 
    return this.check % 2 === 0; 
  }

  if(callback === ':odd') { 
    return this.check % 2 !== 0; 
  }

  if(callback === ':negative') { 
    return this.check < 0; 
  }

  if(callback === ':positive') { 
    return this.check > 0; 
  }

  if(callback === ':alphabet') { 
    return /^[a-zA-Z]+$/.test(this.check); 
  }

  if(callback === ':visible') { 
    return this.element.offsetParent !== null; 
  }

  if(callback === ':hidden') { 
    return this.element.offsetParent === null; 
  }

  if (callback === ':special') { 
    return /[^a-zA-Z0-9]/.test(this.check); 
  }

  if (callback === ':num') { 
    return /^[0-9]+$/.test(this.check); 
  }

  if (callback === ':alphanum') { 
    return /^[a-zA-Z0-9]+$/.test(this.check); 
  }

if(callback === ':removed') {
return this.removed;   
}

  if(callback.startsWith('[') && callback.endsWith(']')) { 
return this.element.hasAttribute(callback.replace('[', '').replace(']', ''));      
     return new Select(this.element);
  }

  if(callback === ':checked') { 
    return this.element.checked; 
  }

if(callback.startsWith('-') && !callback.endsWith('-')) {
 return this.check.type === callback.replace('-', '');   
} else {
 return this.check.type;  
}

if(callback.includes('::')) {
return this.element.getAttribute('type') === callback.replace('::', '').trim(); 
}
  
  if(this.element.tagName === callback.toUpperCase() && !callback.includes('=')) { 
    return true; 
  } else if(this.element.tagName !== callback.toUpperCase() && !callback.includes('=')) { 
    return false; 
  }

  if(callback.includes('=')) { 
    const spt = callback.split('='); 
    return this.element.getAttribute(spt[0]) === spt[1]; 
  }
 
    throw new TypeError('Invalid is() argument name!'); 
  
}


/* loading icon based on duration */
loader(options) {
  const defaults = {
    width: 40,
    height: 40,
    background: '#f3f3f3',
    foreground: '#3498db',
    radius: '70',
    duration: 2, // seconds
    
  };

  const settings = Object.assign(defaults, options);

  this.element.style.width = `${settings.width}px`;
  this.element.style.height = `${settings.height}px`;
  this.element.style.border = `${settings.bgShow || 5}px solid ${settings.background}`;
  this.element.style.borderTop = `${settings.foreWeight || 5}px solid ${settings.foreground}`;
  this.element.style.borderRadius = `${settings.radius}%`;
  this.element.style.animation = `spin ${settings.duration}s linear infinite`;

  const stys = document.createElement('style');
  stys.innerHTML = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
  document.head.appendChild(stys);
};
    

type(types) {
if(!types) {
  if(typeof this.check === 'object') {
  return Array.isArray(this.check) ? 'array' : typeof this.check;
} else {
    return typeof this.check;
}
} else  {
    return Array.isArray(this.check) && types === 'array' ? true : typeof this.check === types && !Array.isArray(this.check);
  } 
 }
 

each(callback) {
Array.from(this.element).forEach((e, i, a) => {
try {
callback(e, i, a)   
} catch {
 callback(new Select(e), i, a);  
}
})    
}


filter(callback) {
  return Array.from(this.element).filter((e, i, a) => {
    try {
      return callback(e, i, a);
    } catch (error) {      
      console.error(error);
      return false;
    }
  });
}


map(callback) {
  return Array.from(this.element).map((e, i, a) => {
    try {
      return callback(e, i, a);
    } catch (error) {
      console.error(error);
      return null; // or some other default value
    }
  });
}

css(styles, property) {
 if(styles && property) {
 this.element.style[styles] = property;  
 return new Select(this.element);
 } else {
  return this.element.style[styles];  
 }  
}

fts() {
    return new Select(this.element);
}

append(content) {
   this.element.append(content); 
}

prepend(content) {
   this.element.prepend(content); 
}


appendTo(content) {
if(content) {
  content.append(this.element);
  } else {
 throw new RangeError('appendTo() required 1 argument!');     
  }
}

prependTo(content) {
if(content) {
content.prepend(this.element);    
} else {
throw new RangeError('prependTo() required 1 argument!');
}
  
}

attr(first, second) {
 if(first && second) {
 this.element.setAttribute(first, second); 
 return new Select(this.element);  
 } else {
return this.element.getAttribute(first);     
 }  
}

removeAttr(first) {
if(first) {
   this.element.removeAttribute(first);  
} else {
 throw new RangeError('removeAttr() required 1 argument!');   
}
  
}


show(delay = 0) {
setTimeout(() => {   
   this.element.style.display = 'block';
   }, delay);  
   return new Select(this.element);
}

hide(delay = 0) {
setTimeout(() => {   
   this.element.style.display = 'none';
   }, delay);
   return new Select(this.element);
}

toggle(delay = 0) {
setTimeout(() => {   
  this.element.style.display = this.element.style.display === 'none' ? 'block' : 'none'
  }, delay);  
  return new Select(this.element);
}


addClass(style) {
this.element.classList.add(style);
   return new Select(this.element);   
}

removeClass(style) {
this.element.classList.remove(style);
   return new Select(this.element);   
}

toggleClass(style) {
this.element.classList.toggle(style);
   return new Select(this.element);   
}

hasClass(style) {
if(style) {
 return this.element.classList.contains(style);   
} else {
   throw new RangeError('hasClass() required 1 argument!');
}
}

prev() {
 return new Select(this.element.previousElementSibling); 
}


next() {
    return new Select(this.element.nextElementSibling);
}

child(index = 0) {
return new Select(this.element.children[index]);       
}

first() {
return new Select(this.element.firstElementChild);    
}

last() {
    return new Select(this.element.lastElementChild);
}

before(content) {
  this.element.insertAdjacentHTML('beforebegin', content);
  return this;
}

after(content) {
  this.element.insertAdjacentHTML('afterend', content);
  return this;
}

on(type, callback) {
   if(type && !callback) {
  this.element.addEventListener('click', type);
  return type;
   } else {
  this.element.addEventListener(type, (e) => {
 e.pform = () => {
      e.preventDefault();
    };
    e.sform = (form) => {
      form.submit();
    };  
    callback(e);    
});     
  return callback;
   }
}

submit(type) {
  this.element.addEventListener('submit', (e) => {
    e.pform = () => {
      e.preventDefault();
    };
    e.sform = (form) => {
      form.submit();
    };  
    type(e);
    });
  return type;  
}


click(type) {
 this.element.addEventListener('click', type);
  return type;   
}

dblclick(type) {
this.element.addEventListener('dblclick', type);
  return type;    
}

off(type, callback) {
 this.element.removeEventListener(type, callback);        
}

blur(index) {
  return this.element.style.filter = `blur(${index})`;  
}



edit(options) { 
  const element = this.element;
 if(!element) throw new TypeError('ContentEdit() require an element!');
 
   element.setAttribute('contenteditable', 'true');
   element.dataset.placeholder = options.placeholder || '';
   const ab1 = document.createElement('style');
  ab1.innerHTML = `
    [data-placeholder]:empty::before {
      content: attr(data-placeholder);
      color: ${options.color || 'black'};
      background: ${options.fg || this.element.style.background};
      font-size: ${options.size || '16px'};      
      font-weight: ${options.weight || ''};
      text-decoration: ${options.decorate || 'none'};       
      margin-left: ${options.left || 'none'};
      margin-right: ${options.right || 'none'};       
      `; 
      document.head.appendChild(ab1);      
element.style.background = options.bg || options.background;  
element.style.color = options.colors;
element.style.outline = options.outline;   
element.style.padding = options.padding;         
element.style.width = options.width;    
element.style.border = options.border;
element.style.borderRadius = options.radius;
element.style.textAlign = options.align;
element.style.display = options.display || 'block';
element.style.margin = options.margin === 'center' ? '0 auto' : options.margin;
element.style.float = options.float;
 }  
 
 
 splitCount(separator = '/') { 
  return this.element.toString().split(separator).length - 1;
}


/* change input type "password" to text or vice versa(password)  / or set */
itype(style) {
if(!style) {
this.element.type = this.element.type === 'password' ? 'text' : 'password';
   } else {   
 this.element.type = style;     
   } 
}


/* progress bar */
progressBar(options) {
  const defaults = {
    width: 100,
    height: 10,
    background: 'yellow',
    foreground: 'green',
    duration: 10, // seconds
    borderRadius: '10px'
  };

  const settings = Object.assign(defaults, options);

  this.element.style.width = `${settings.width}%`;
  this.element.style.height = `${settings.height}px`;
  this.element.style.backgroundColor = settings.background;
  this.element.style.borderRadius = settings.borderRadius;
  this.element.style.overflow = 'hidden';

  const progressBar = document.createElement('div');
  progressBar.style.width = '0%';
  progressBar.style.height = '100%';
  progressBar.style.backgroundColor = settings.foreground;
  progressBar.style.transition = `width ${settings.duration}s`;

  this.element.appendChild(progressBar);

  setTimeout(() => {
    progressBar.style.width = '100%';
  }, 1);
};


/* limit character */
limitChars(limit) {
if(limit) {    
let property;
if(this.element.tagName !== 'INPUT' && this.element.tagName !== 'TEXTAREA') {
   property = 'textContent';
} else {
    property = 'value';
}

 this.element.addEventListener('input', () => {
    const conth = this.element[property];
    if (conth.length > limit) {
      this.element[property] = conth.slice(0, limit);
    }
  });
  } 
}


// sliding down element based on duration 
slideDown(delay) {
  const fit = delay / 1000;
  this.element.style.transition = `max-height ${fit}s ease-in-out`;
  this.element.style.overflow = 'hidden';
  this.element.style.maxHeight = '0px';
  const scrollHeight = this.element.scrollHeight;
  setTimeout(() => {
    this.element.style.maxHeight = `${scrollHeight}px`;
  }, 0); // Start the animation immediately
}


// it work as sliding element up on duration 
slideUp(delay) {
  const scrollHeight = this.element.scrollHeight;
  const fit = delay / 1000; /* Calculate the transition time in seconds */
  this.element.style.transition = `max-height ${fit}s ease-in-out`;
  this.element.style.overflow = 'hidden';
  this.element.style.maxHeight = `${scrollHeight}px`;
  
  // Trigger the animation
  requestAnimationFrame(() => {
    this.element.style.maxHeight = '0px';
  });
}


// Define the tickerRight method
 tickerRight(delay = 10, duration = 10000 * 50000) { 
      const originalHtml = this.element.innerHTML;
      const timer = delay / 1000;
      const text = this.element.textContent;
      const width = this.element.offsetWidth;
      this.element.style.overflow = 'hidden';
      this.element.style.width = width + 'px';      
      this.element.innerHTML = `<span style="display: inline-block; white-space: nowrap;">${text}</span>`;
      let x = width;
      const intervalId = setInterval(() => {
        x -= 1;
        this.element.querySelector('span').style.transform = `translateX(${x}px)`;
        if (x <= -this.element.querySelector('span').offsetWidth) {
          x = width;
        }
      }, timer);
      setTimeout(() => {
        clearInterval(intervalId);
        this.element.style.transform = '';
        this.element.style.overflow = '';
        this.element.innerHTML = originalHtml; // Restore original HTML content
      }, duration);
      return this;
    }


/* it work as scrolling from left to right continuously */
tickerLeft(delay = 10, duration = 10000 * 50000) {
  const originalHtml = this.element.innerHTML;
  const timer = delay / 1000;
  const text = this.element.textContent;
  const width = this.element.offsetWidth;
  this.element.style.overflow = 'hidden';
  this.element.style.width = width + 'px';
  this.element.innerHTML = `<span style="display: inline-block; white-space: nowrap;">${text}</span>`;
  let x = -this.element.querySelector('span').offsetWidth;
  const intervalId = setInterval(() => {
    x += 1;
    this.element.querySelector('span').style.transform = `translateX(${x}px)`;
    if (x >= width) {
      x = -this.element.querySelector('span').offsetWidth;
    }
  }, timer);
  setTimeout(() => {
    clearInterval(intervalId);
    this.element.style.transform = '';
    this.element.style.overflow = '';
    this.element.innerHTML = originalHtml; // Restore original HTML content
  }, duration);
  return this;
}


slideLeft(delay) {
document.body.style.position = 'fixed';
  this.element.style.display = 'none';
  setTimeout(() => {
    this.element.style.display = 'block';
    this.element.style.position = 'relative';
    this.element.style.left = `-${this.element.offsetWidth + 20}px`;
    this.element.style.transition = `left ${delay / 1000}s ease-in-out`;
    setTimeout(() => {
      this.element.style.left = '0px';
    }, 0);
  }, 0);
  return this;
}


slideRight(delay) {
document.body.style.position = 'fixed';
  this.element.style.display = 'none';
  setTimeout(() => {
    this.element.style.display = 'block';
    this.element.style.position = 'relative';
    this.element.style.left = `${window.innerWidth}px`;
    this.element.style.transition = `left ${delay / 1000}s ease-in-out`;
    setTimeout(() => {
      this.element.style.left = '0px';
    }, 0);
  }, 0);
  return this;
}



/* Autotyping text automatically */
autoTyping(phrases, options = {}) {
const elementId = this.element;
  const typedTextElement = elementId;
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let loopCount = 0;

  // Set default options
  const typeSpeed = options.typeSpeed || 100;
  const retype = options.retype !== undefined ? options.retype : false;
  const stopAt = options.stopAt || (retype ? null : 'end');
  const loop = options.loop || (retype ? Infinity : 1);
  const endWith = options.endWith || 'last';

  // Convert phrases to array if it's not already
  if (!Array.isArray(phrases)) {
    phrases = [phrases];
  }

  function autoType() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
      typedTextElement.innerHTML = currentPhrase.substring(0, currentCharIndex);
      currentCharIndex--;
      if (currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        if (currentPhraseIndex === 0) {
          loopCount++;
          if (loopCount >= loop) {
            if (endWith === 'last') {
              typedTextElement.innerHTML = phrases[phrases.length - 1];
            } else if (endWith === 'first') {
              typedTextElement.innerHTML = phrases[0];
            } else if (endWith === 'empty') {
              typedTextElement.innerHTML = '';
            }
            return clearInterval(intervalId);
          }
        }
      }
    } else {
      typedTextElement.innerHTML = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;

      // Check if we need to stop or delete
      if (stopAt && currentPhrase.substring(0, currentCharIndex).toLowerCase().includes(stopAt.toLowerCase())) {
        if (retype) {
          isDeleting = true;
        } else {
          return clearInterval(intervalId);
        }
      }

      if (currentCharIndex === currentPhrase.length) {
        if (retype) {
          if (stopAt === null) {
            setTimeout(() => {
              isDeleting = true;
            }, 1000); // wait 1 second before deleting
          } else {
            isDeleting = true;
          }
        } else {
          currentCharIndex = 0;
          if (loopCount < loop - 1) {
            loopCount++;
          } else {
            if (endWith === 'last') {
              typedTextElement.innerHTML = phrases[phrases.length - 1];
            } else if (endWith === 'first') {
              typedTextElement.innerHTML = phrases[0];
            } else if (endWith === 'empty') {
              typedTextElement.innerHTML = '';
            } 
            return clearInterval(intervalId);
          }
        }
      }
    }
  }

  const intervalId = setInterval(autoType, typeSpeed);
}


/* replace element not */
keepChars(charsToKeep, replacement, global) {
  let flagr = '';
  if (global === true || global === 'g' || global === 'all') {
    flagr = 'g';
  }
  const regexe = new RegExp(`[^${charsToKeep}]`, flagr);
  return this.element.toString().replace(regexe, replacement);
}


randArr(sortType, sortBy) {
if(arguments.length === 0) {
return this.check[Math.floor(Math.random() * this.check.length)];   
} else if(arguments.length === 1) { 
switch(sortType) {
  case 'reverse':
return this.check.reverse(); 
  case 'asc':
  try {
return this.check.sort((a, b) => a.localeCompare(b));
} finally {
return this.check.sort((a, b) => a - b);    
}
  case 'desc':
  try {
return this.check.sort((a, b) => b.localeCompare(a));
} finally {
return this.check.sort((a, b) => b - a);    
} 
default:
throw new TypeError('Not a valid name!');
} 
} else if(arguments.length === 2) {
switch(sortType) { 
case 'asc': 
try {
return this.check.sort((a, b) => a[sortBy] - b[sortBy]);
} finally {
  try {
return this.check.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));        
  } finally {
return this.check.sort((a, b) => a[sortBy] - b[sortBy]);      
  }
}
case 'desc':
try {
return this.check.sort((a, b) => b[sortBy] - a[sortBy]);
} finally {
try {
return this.check.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));   
} finally {
return this.check.sort((a, b) => b[sortBy] - a[sortBy]);    
}
}
default:
throw new TypeError('Not a valid name!');
}
} else {
throw new RangeError('Argument must be either 0, 1 or 2');    
} 
   
  }      


/* fade out html element based on delay */
fadeOut(delay = 0) {
  this.element.style.display = 'block';
  this.element.style.opacity = 1;
  this.element.style.transition = `all ${delay / 1000}s`;
  setTimeout(() => {
    this.element.style.opacity = 0;
  }, 0); 
  setTimeout(() => {
    this.element.style.display = 'none';
  }, delay); 
  return this;
}



/* fade in html element based on delay */
fadeIn(delay = 0) {
  const fitd = delay / 1000;
  this.element.style.transition = `all ${fitd}s`;
  this.element.style.display = 'block';
  this.element.style.opacity = 0;
  this.element.offsetHeight; // Trigger a reflow
  this.element.style.opacity = 1;
  return this;
}


/* delay element */
delay(delay = 0) {  
  this.element.style.transitionDelay = `${delay}ms`;
  return this;
  }

title(content, delay = 0) {
if(this.check == document) {
    if(content && delay) {
 setTimeout(() => {
  document.title = content;   
 }, delay);       
    } else {
 document.title = content;         
    }
} else {
 throw new TypeError('title() argument name must be "document"');
}

}


write(content) {
 document.write(content);   
}

#myDate = new Date();


custom(pattern) {
if(this.check === date) {   
    if (!pattern) {
      throw new RangeError('custom() requires a pattern string!');
    }

    const values = {
      Y: this.#myDate.getFullYear(),
      M: this.#myDate.getMonth(),
      D: this.#myDate.getDate(),
      W: this.#myDate.getDay(),
      WL: this.#myDate.toLocaleString('en-US', { weekday: 'long' }),
      MS: this.#myDate.toLocaleString('en-US', { month: 'short' }),
      WS: this.#myDate.toLocaleString('en-US', { weekday: 'short' }),
      ML: this.#myDate.toLocaleString('en-US', { month: 'long' }),
    };

    return pattern.toUpperCase().replace(/(WL|WS|MS|ML|Y|M|W|D)/g, (str) => values[str]);   
}
}


locale(type = 'all') {
    switch (type) {
      case 'date':
        return this.#myDate.toLocaleDateString();
      case 'time':
        return this.#myDate.toLocaleTimeString();
      default:
        return this.#myDate.toLocaleString();
    }
  }
  

localeSet(locale = 'en-US', options = {}) {
    return this.#myDate.toLocaleString(locale, options);
  }


get(file) {
    if(file) {
 return new Date(file);     
    }
    return this.#myDate;
  }

in(callback, exact = false) {
  let typeiok, yuse;
  if (callback.includes('alphabet')) {
    typeiok = 'alphabet';
    yuse = parseInt(callback.replace('alphabet', ''));
  } else if (callback.includes('number')) {
    typeiok = 'number';
    yuse = parseInt(callback.replace('number', ''));
  } else if(callback === 'special') {
return this.check.match(/[^a-zA-Z0-9]/g) || [];   
  } else if (callback.includes('special')) {
    typeiok = 'special';
    yuse = parseInt(callback.replace('special', ''));
  } else if (callback.includes('emoji')) {
    typeiok = 'emoji';
    yuse = parseInt(callback.replace('emoji', ''));
  } else if(callback === 'upper') {
return [...this.check].filter(c => c >= 'A' && c <= 'Z');        
  } else if(callback.includes('upper')) {
typeiok = 'upper';  
yuse = parseInt(callback.replace('upper', '')); 
  } else if(callback === 'lower') {
return [...this.check].filter(c => c >= 'a' && c <= 'z');             
  } else if(callback.includes('lower')) {
typeiok = 'lower';  
yuse = parseInt(callback.replace('lower', ''));   
  } else {
    throw new TypeError('Invalid in() argument name!');
  }

  let lengthgf;
  switch (typeiok) {
    case 'alphabet':
      lengthgf = (this.check.match(/[a-zA-Z]/g) || []).length;
      break;
    case 'number':
      lengthgf = (this.check.match(/[0-9]/g) || []).length;
      break;
    case 'special':
      lengthgf = (this.check.match(/[^a-zA-Z0-9]/g) || []).length;
      break;
    case 'emoji':
      const regelk = /\p{Extended_Pictographic}/gu;
      lengthgf = (this.check.match(regelk) || []).length;
      break;
   case 'upper':
lengthgf = [...this.check].filter(c => c >= 'A' && c <= 'Z').length;  
  break;
case 'lower':
lengthgf = [...this.check].filter(c => c >= 'a' && c <= 'z').length;  
break;
  }

  return exact === false ? lengthgf === yuse : lengthgf >= yuse;
}  

/* set element placeholder */ 
 placeholder(element) {
this.element.placeholder = element;   
return this;
 }

/* set element color */ 
 color(style) {
this.element.style.color = style;    
return this;    
 }

/* set element background color */ 
 bg(style) {
 this.element.style.background = style;   
 return this;
 }

/* Auto add floating label effect to element */
dynamic(labelId) {
  const y7d = this.element;
  const k3p = document.createElement('div');
  y7d.parentNode.replaceChild(k3p, y7d);
  k3p.appendChild(y7d);
  const r8g = document.createElement('label');
  r8g.textContent = y7d.placeholder;
  y7d.placeholder = '';
  r8g.htmlFor = y7d.id;
  k3p.appendChild(r8g);
  k3p.style.position = 'relative';
  r8g.style.position = 'absolute';
  r8g.style.left = '10px';
  r8g.style.top = '15px';
  r8g.style.transition = 'all 0.2s ease';
  r8g.style.pointerEvents = 'none';
  r8g.style.backgroundColor = !labelId ? y7d.style.backgroundColor : null;
  r8g.id = labelId;  
  r8g.style.padding = '0 2px';
  y7d.addEventListener('focus', () => {
    r8g.style.top = '-8px';
    r8g.style.fontSize = '12px';
  });
  y7d.addEventListener('blur', () => {
    if (!y7d.value) {
      r8g.style.top = '15px';
      r8g.style.fontSize = '';
    }
  });
  if (y7d.value) {
    r8g.style.top = '-8px';
    r8g.style.fontSize = '12px';
  }
}

remove() {
  this.parent = this.element.parentNode;
  this.nextSibling = this.element.nextSibling;
  this.rems = this.element;
  this.element.remove();
  return {
    assignTo: (assign) => {
      assign.append(this.rems);
    },
    restore: () => {
      if (this.nextSibling) {
        this.parent.insertBefore(this.rems, this.nextSibling);
      } else {
        this.parent.appendChild(this.rems);
      }
    }
  }
}

asterisk(changeTo = '*', toggle = false) {
  if (toggle && this.element.getAttribute('data-original')) {
    if (this.element.tagName === 'INPUT' || this.element.tagName === 'TEXTAREA') {
      this.element.value = this.element.getAttribute('data-original');
    } else {
      this.element.textContent = this.element.getAttribute('data-original');
    }
    this.element.removeAttribute('data-original');
  } else {
    if (!this.element.getAttribute('data-original')) {
      this.element.setAttribute('data-original', this.element.textContent || this.element.value);
    }
    try {
      this.element.value = this.element.value.replace(/[a-zA-Z0-9]/g, changeTo).replace(/[^a-zA-Z0-9]/g, changeTo);
    } catch {
      this.element.textContent = this.element.textContent.replace(/[a-zA-Z0-9]/g, changeTo).replace(/[^a-zA-Z0-9]/g, changeTo);
    }
  }
  return this.element.textContent || this.element.value;
}


}







function $(selector, all) {
return new Select(selector, all);
}

function upper(element) {
return element.toUpperCase(); 
}

function lower() {
return element.toLowerCase();  
}

function int(element) {
return parseInt(element); 
}

function float(element) {
return parseFloat(element);
}


/* setInterval */
function interval(callback, timer = 0) {
if(arguments.length === 1) {
 return clearInterval(callback);     
} else if(arguments.length === 2) {
if(typeof callback === 'function') {    
const inys = setInterval(() => {
    callback(this);
}, timer);
return inys;
} else {
  setInterval(() => {
   return clearInterval(callback);  
}, timer); 
}
}
}


/* setTimeout */
function timeout(callback, timer) {
  if(arguments.length === 1) {
return clearTimeout(callback);     
  } else if(arguments.length === 2) {
  if(typeof callback === 'function') {    
const tiys = setTimeout(() => {
 callback(this);   
}, timer) 
return tiys;   
  } else {
  setTimeout(() => {
 return clearTimeout(callback);     
}, timer) 
  }  
}
}


/* reload page location.reload  */
function reload(timer) {
   if(!timer) {
    location.reload();   
   } else {
  setTimeout(() => {
   location.reload();    
  }, timer)    
   } 
}


/* redirect url */
function redirect(url, timer) {
   if(arguments.length === 1) {   
   window.location.href = url;           
   } else if(arguments.length === 2) {
  setTimeout(() => {
   window.location.href = url;       
  }, timer)    
   } 
}

/* Element to string */
function str(element) {  
   return element.toString();
}      


/* fetch api data auto XML */    
  function getData(...args) {
    if (args.length % 2 !== 0) {
        throw new Error('Number of arguments must be even');
    }

    if (args.length > 100) {
        throw new Error('Number of arguments exceeds 100');
    }

    const pairs = [];

    for (let i = 0; i < args.length; i += 2) {
        const key = args[i];
        const value = args[i + 1];
        pairs.push(`${key}=${value}`);
    }

    return pairs.join('&');
}


/* fetch API post data XML custom */
function postData(...args) {
  if (args.length % 2 !== 0) {
    throw new Error('Number of arguments must be even');
  }

  if (args.length > 100) {
    throw new Error('Number of arguments exceeds 100');
  }

  const json = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    const value = args[i + 1];
    json[key] = value;
  }

  return json;
}


/* line break html,css */
function br(type) {     
  if(type && type.toUpperCase() === 'HTML') {
 return  '<br>';     
  } else {
      return '\n';
  } 
  }
   
   /* Clipboard copy text  */
function clipboard(text, callback) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      if (callback) callback(true);
    }, () => {
      if (callback) callback(false);
    });
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand('copy');
      if (callback) callback(successful);
    } catch (err) {
      if (callback) callback(false);
    }

    document.body.removeChild(textarea);
  }
}

    
/* Swipe from left to right  */
function swipeLeft(options = {}) {
  const defaults = {
    threshold: 50,
    edgeThreshold: 30, 
    targetElement: null,
    callback: (e) => {
  console.log(e);      
    },
  };

  const opts = { ...defaults, ...options };

  let startX = 0;
  let target = opts.targetElement || document;

  target.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  });

  target.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0].clientX;
    if (!opts.targetElement && startX > opts.edgeThreshold) return; // check if start point is close enough to the edge
    if (endX - startX > opts.threshold) {
      opts.callback("Swiped from left!");
    }
  });
}


/* Swipe from bottom to top */
function swipeBottom(options = {}) {
  const defaults = {
    threshold: 50,
    edgeThreshold: 30,
    targetElement: null,
    callback: (e) => {
  console.log(e);      
    },
  };

  const opts = { ...defaults, ...options };

  let startY = 0;
  let target = opts.targetElement || document;

  target.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
  });

  target.addEventListener('touchend', (event) => {
    const endY = event.changedTouches[0].clientY;
    if (!opts.targetElement && startY < window.innerHeight - opts.edgeThreshold) return; // check if start point is close enough to the bottom edge
    if (startY - endY > opts.threshold) {
      opts.callback("Swiped from bottom!");
    }
  });
}


/* Swipe from top to down */
function swipeTop(options = {}) {
  const defaults = {
    threshold: 50,
    edgeThreshold: 30,
    targetElement: null,
    callback: (e) => {
  console.log(e);      
    },
  };

  const opts = { ...defaults, ...options };

  let startY = 0;
  let target = opts.targetElement || document;

  target.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
  });

  target.addEventListener('touchend', (event) => {
    const endY = event.changedTouches[0].clientY;
    if (!opts.targetElement && startY > opts.edgeThreshold) return; // check if start point is close enough to the top edge
    if (endY - startY > opts.threshold) {
      opts.callback("Swiped from top!");
    }
  });
}


/* Swipe from right to left  */
function swipeRight(options = {}) {
  const defaults = {
    threshold: 50,
    edgeThreshold: 30,
    targetElement: null,
    callback: (e) => {
   console.log(e);     
    },
  };

  const opts = { ...defaults, ...options };

  let startX = 0;
  let target = opts.targetElement || document;

  target.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  });

  target.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0].clientX;
    if (startX < window.innerWidth - opts.edgeThreshold) return; // only trigger if swipe starts from right edge
    if (startX - endX > opts.threshold) {
      opts.callback('swipe from right!');
    }
  });
}

let alrs = 0;

function ralert(text = '', btn1 = 'OK') {
return new Promise((resolve, reject) => {
  const currentId = alrs++;
  const div = document.createElement('div');
  div.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: ${999 - alrs + currentId}; display: flex; justify-content: center; align-items: center;" id="backdrop-${currentId}">
      <div id="ralert-${currentId}" style="padding: 30px; border-radius: 5px; background: #fff; border: 1px solid #ddd; width: 70%; max-width: 500px; z-index: ${1000 - alrs + currentId};">
        <p style="margin-top: -5px; margin-bottom: 50px; max-height: 350px; overflow-y: auto; background: white; color: black;" id="page-${currentId}">${text}</p>
        <button id="btn1-${currentId}" style="float: right; margin-top: 15px; border: none; background: white; font-weight: bold; color: black;">${btn1}</button>
      </div>
    </div>
  `;
  document.body.append(div);
  document.getElementById(`btn1-${currentId}`).onclick = function () {
  resolve('true');
    div.remove();
  }
  document.addEventListener('click', (event) => {
    if(event.target.id === `backdrop-${currentId}`) {
      div.remove();
    }
  })
  })
}


let conrs= 0;

function rconfirm(text = '', btn1 = 'CANCEL', btn2 = 'OK') {
  return new Promise((resolve, reject) => {
    const currentId = conrs++;
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: ${999 - conrs + currentId}; display: flex; justify-content: center; align-items: center;" id="backdrop-${currentId}">
        <div id="rconfirm-${currentId}" style="padding: 30px; border-radius: 5px; background: #fff; border: 1px solid #ddd; width: 70%; max-width: 500px; z-index: ${1000 - conrs + currentId};">
          <p style="margin-top: -5px; margin-bottom: 50px; background: white; color: black;" id="page1-${currentId}">${text}</p>
          <div style="float: right; margin: 5px; background: white; color: black;">
            <button id="btn1-${currentId}" style="margin-top: 15px; border: none; background: white; font-weight: bold; color: black;">${btn1}</button>
            <button id="btn2-${currentId}" style="margin-top: 15px; border: none; background: white; font-weight: bold; color: black;">${btn2}</button>
          </div>
        </div>
      </div>
    `;
    document.body.append(div);
    document.getElementById(`btn1-${currentId}`).onclick = function () {
      resolve({ value: 'false', text: document.getElementById(`page1-${currentId}`).textContent });
      div.remove()
    }
    document.getElementById(`btn2-${currentId}`).onclick = function () {
      resolve({ value: 'true', text: document.getElementById(`page1-${currentId}`).textContent });
      div.remove()
    }
    document.addEventListener('click', (event) => {
      if(event.target.id === `backdrop-${currentId}`) {
        div.remove();
      }
    })
  })
}


let promyr = 0;

function rprompt(text = '', btn1 = 'CANCEL', btn2 = 'OK') {
  return new Promise((resolve, reject) => {
    const currentId = promyr++;
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: ${999 - promyr + currentId}; display: flex; justify-content: center; align-items: center;" id="backdrop-${currentId}">
        <div id="rprompt-${currentId}" style="padding: 30px; border-radius: 5px; background: #fff; border: 1px solid #ddd; width: 70%; max-width: 500px; z-index: ${1000 - promyr + currentId};">
          <p style="margin-top: -5px; margin-bottom: 50px; background: white; color: black;" id="pages-${currentId}">${text}</p>
          <input id="test-${currentId}" type="text" style="outline: none; border: none; border-bottom: 2px solid black; width: 100%; background: white; color: black;">
          <button id="btn1-${currentId}" style="float: left; margin-top: 15px; border: none; background: white; font-weight: bold; color: black;">${btn1}</button>
          <button id="btn2-${currentId}" style="float: right; margin-top: 15px; border: none; background: white; font-weight: bold; color: black;">${btn2}</button>
        </div>
      </div>
    `;
    document.body.append(div);
    document.getElementById(`btn1-${currentId}`).onclick = function () {
      resolve({ value: 'null', text: document.getElementById(`pages-${currentId}`).textContent });
      div.remove()
    }
    document.getElementById(`btn2-${currentId}`).onclick = function () {
      resolve({ value: document.getElementById(`test-${currentId}`).value, text: document.getElementById(`pages-${currentId}`).textContent });
      div.remove()
    }
    document.addEventListener('click', (event) => {
      if(event.target.id === `backdrop-${currentId}`) {
        div.remove();
      }
    })
    document.getElementById(`test-${currentId}`).focus();
  })
}



function hash(url) {
if(!url) {
    return window.location.hash;
} else {
if(window.location.hash === url) {
    return true; 
  } else {
      return false;
  }
} 
}


function port(url) {
if(!url) {
    return window.location.port;
} else {
if(window.location.port === url) {
    return true; 
  } else {
      return false;
  }
} 
}


function host(url) {
if(!url) {
    return window.location.hostname;
} else {
if(window.location.hostname === url) {
    return true; 
  } else {
      return false;
  }
} 
}


// get or verify url window.location.origin
function url(url) {
if(!url) {
    return window.location.origin;
} else {
if(window.location.origin === url) {
    return true; 
  } else {
      return false;
  }
} 
}

function path(url) {
if(!url) {
  return window.location.pathname;
} else {
if(window.location.pathname === url) {
    return true; 
  } else {
      return false;
  }
} 
}


function href(url) {
  if(!url) {
 return window.location.href;
} else {
if(window.location.href === url) {
    return true; 
  } else {
      return false;
  }
} 
}


/* toFixed function */
function fixed(number, length = 2) { 
 if(isNaN(number) || isNaN(length)) {
   throw new Error(`fixed() argument must not include alphabet '${number}'  '${length}'`);
 } else {
   return parseFloat(number).toFixed(length)      
}  
 }
 

// JSON.stringify function 
function json(element) {
  return JSON.stringify(element);
}


// JSON.parse function 
function parse(element) {
return JSON.parse(element);     
}
 
 
// random number function 
function random(first, second) {
  if(arguments.length === 1) {
return Math.floor(Math.random() * first);    
  } else if(arguments.length === 2) {
return Math.floor(Math.random() * (second - first + 1)) + first;      
  } 
}     



function sanitizer(input) {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  // Remove HTML tags
  input = input.replace(/<\/?[^>]+(>|$)/g, '');

  // Remove script tags and JavaScript code
  input = input.replace(/<script.*?>.*?<\/script>/gi, '');
  input = input.replace(/javascript:/gi, '');

  // Remove SQL injection attempts
  input = input.replace(/UNION|SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|grant|revoke|exec|execute|fetch|desc|describe|show|information_schema|sysdatabases|sysobjects|syscolumns|table_name|column_name|database_name|table_schema|information_schema.tables|information_schema.columns/gi, '');

  // Remove special characters
  input = input.replace(/[^\w\s.,!?-]/gi, '');

  // Trim whitespace
  input = input.trim();

  return input;
}


/* validate user email address and return boolean */
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}


$.get = function(name) {
  return detachedElements[name];
};
