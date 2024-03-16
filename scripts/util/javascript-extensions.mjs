// I'm not really sure this is javascript language extension anymore ...
export function AssignWithUnderscores(target, source) {

  for (var key of Object.keys(source)) {

    if (target["_" + key]) {

      // this doesn't work correctly with values passed in that are instantiated objects.
      target["_" + key] = source[key];
      delete source[key];
    }
  }

  const options = {
    depth: 0,
    maxDepth: 5
  };
  mergeDeep(target, options, source);
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

// TODO: Max depth
/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 * https://stackoverflow.com/a/34749873/5450892
 */
// maybe we could make a separate 'mergeMaxDeep' function that takes the "broader" parameters ...
export function mergeDeep(target, options, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (options.maxDepth && options.depth != undefined) {
    options.depth++;
    if (options.depth > options.maxDepth) {
      console.debug(`Stopping merge at depth ${options.maxDepth}`);
      return mergeDeep(target, options, ...sources);
    }
  }

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        try {
          Object.assign(target, { [key]: source[key] });
        } catch (ex) {
          // this hack is VERY ew
          if (ex.message.indexOf("has only a getter") > 0) return;
          console.error(ex);
        }
      }
    }
  }

  return mergeDeep(target, options, ...sources);
}

// https://stackoverflow.com/a/69057776/5450892
export function GetColorAsRGBA(color) {

  // gc should clean this up for us
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.fillStyle = color;
  context.fillRect(0, 0, 1, 1);
  return context.getImageData(0, 0, 1, 1).data;
}

export function generateId(len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('')
}

export function dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2)
}

function randomBetween(first, second) {

  return Math.floor(Math.random() * second) + first;
}
Math.randomBetween = randomBetween;

Math.randomBool = function () {
  return Math.randomBetween(0, 1) > 0.5;
}

/**
 * Returns an object with any public properties copied by value, rather than reference.
 * @param {Object} object 
 */
export function copyPublicProperties(object) {

  const newObj = {};

  for (var key of Object.getOwnPropertyNames(object.__proto__)) {

    const field = object[key];
    if (key.indexOf("#") == -1 && typeof field != "function") {
      // do we need to eval?
      newObj[key] = object[key];
    }
  }

  return newObj;
}

Object.defineProperty(String.prototype, 'capitalize', {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, 'removeItem', {
  value: function (val) {
    const index = this.indexOf(val);
    if (index > -1) { // only splice array when item is found
      this.splice(index, 1); // 2nd parameter means remove one item only
    }
  },
  enumerable: false
});

export function detachChildrenFromElement(element) {

  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}

export function createElement(options) {

  const parent = options.parent ? options.parent : document.body;
  const element = document.createElement(options.tag || 'div');
  parent.appendChild(element);
  delete options.parent;
  delete options.type;
  delete options.tag;

  const optionKeys = Object.keys(options);
  for (var key of optionKeys) {
    try {
      element[key] = options[key];
    } catch (ex) {
      debugger;
    }
  }

  return element;
}
