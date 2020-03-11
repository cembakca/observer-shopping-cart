// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/lib/Manager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Manager = /*#__PURE__*/function () {
  function Manager() {
    _classCallCheck(this, Manager);

    this.observers = [];
  }

  _createClass(Manager, [{
    key: "addObserver",
    value: function addObserver(fn) {
      this.observers.push(fn);
    }
  }, {
    key: "removeObserver",
    value: function removeObserver(fn) {
      this.observers.filter(function (item) {
        return item !== fn;
      });
    }
  }, {
    key: "triggerObserver",
    value: function triggerObserver(state) {
      if (this.observers.length > 0) {
        this.observers.forEach(function (observer) {
          return observer.update(state);
        });
      }
    }
  }]);

  return Manager;
}();

var _default = Manager;
exports.default = _default;
},{}],"src/lib/State.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Manager2 = _interopRequireDefault(require("./Manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var State = /*#__PURE__*/function (_Manager) {
  _inherits(State, _Manager);

  function State() {
    var _this;

    _classCallCheck(this, State);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(State).call(this));
    _this.state = {};
    return _this;
  }

  _createClass(State, [{
    key: "update",
    value: function update() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.state = Object.assign(this.state, data); // trigger

      this.triggerObserver(this.state);
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }]);

  return State;
}(_Manager2.default);

var _default = State;
exports.default = _default;
},{"./Manager":"src/lib/Manager.js"}],"src/lib/Observer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Observer = /*#__PURE__*/function () {
  function Observer() {
    _classCallCheck(this, Observer);
  }

  _createClass(Observer, [{
    key: "update",
    // Gets called by the Subject::notify method.
    value: function update() {}
  }]);

  return Observer;
}();

var _default = Observer;
exports.default = _default;
},{}],"src/lib/createElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createElement;

function createElement(nodeName, attributes) {
  var element = document.createElement(nodeName);

  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  children.forEach(function (child) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child) {
      element.appendChild(child);
    }
  });
  return element;
}
},{}],"src/components/ProductList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Observer2 = _interopRequireDefault(require("../lib/Observer"));

var _createElement = _interopRequireDefault(require("../lib/createElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ProductList = /*#__PURE__*/function (_Observer) {
  _inherits(ProductList, _Observer);

  function ProductList() {
    var _this;

    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ProductList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProductList).call(this));
    _this.appState = state;
    return _this;
  }

  _createClass(ProductList, [{
    key: "createMarkup",
    value: function createMarkup(state) {
      return (0, _createElement.default)('div', null, _createElement.default.apply(void 0, ['ul', {
        class: 'flex-wrap'
      }].concat(_toConsumableArray(state.products.map(function (product, idx) {
        return (0, _createElement.default)('li', {
          class: 'card',
          key: idx
        }, (0, _createElement.default)('div', {
          class: 'imgWrapper'
        }, (0, _createElement.default)('img', {
          src: product.img,
          alt: "".concat(product.name)
        })), (0, _createElement.default)('div', {
          class: 'product-desc'
        }, (0, _createElement.default)('p', {
          class: 'title'
        }, "\xDCr\xFCn Ad\u0131: ".concat(product.name)), (0, _createElement.default)('p', {
          class: 'price'
        }, "Fiyat: ".concat(product.price, " TL"))), (0, _createElement.default)('button', {
          class: "button ".concat(state.baskets.find(function (b) {
            return b.id == product.id;
          }) ? 'disable' : ''),
          id: 'addBasket',
          'data-id': product.id
        }, 'Sepete Ekle'));
      })))));
    }
  }, {
    key: "render",
    value: function render(state) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "app";
      var markup = this.createMarkup(state);
      var parent = document.getElementById(selector);
      parent.innerHTML = '';
      parent.appendChild(markup);
      this.clickEvent();
    }
  }, {
    key: "clickEvent",
    value: function clickEvent() {
      var _this2 = this;

      var products = document.querySelectorAll('#addBasket');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var button = _step.value;
          button.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('girdim');

            var state = _this2.appState.getState();

            var id = e.target.getAttribute('data-id');
            var currentProduct = state.products.find(function (product) {
              return product.id == id;
            });

            if (!currentProduct || state.baskets.find(function (basket) {
              return basket.id == id;
            })) {
              return;
            } // Getting the current state.


            var baskets = [].concat(_toConsumableArray(state.baskets), [currentProduct]); // Updating state will prompt a re-render via the notify method being called.

            _this2.appState.update(_objectSpread({}, state, {
              baskets: baskets,
              total: {
                count: state.total.count += 1,
                price: state.total.price + currentProduct.price
              }
            }));
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "update",
    value: function update(state) {
      this.render(state, "product-list-container");
    }
  }]);

  return ProductList;
}(_Observer2.default);

var _default = ProductList;
exports.default = _default;
},{"../lib/Observer":"src/lib/Observer.js","../lib/createElement":"src/lib/createElement.js"}],"src/components/BasketList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Observer2 = _interopRequireDefault(require("../lib/Observer"));

var _createElement = _interopRequireDefault(require("../lib/createElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BasketList = /*#__PURE__*/function (_Observer) {
  _inherits(BasketList, _Observer);

  function BasketList() {
    var _this;

    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BasketList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BasketList).call(this));
    _this.appState = state;
    return _this;
  }

  _createClass(BasketList, [{
    key: "createMarkup",
    value: function createMarkup(state) {
      return (0, _createElement.default)('div', null, _createElement.default.apply(void 0, ['ul', null].concat(_toConsumableArray(state.baskets.map(function (basket, idx) {
        return (0, _createElement.default)('li', {
          class: 'basket-card',
          key: idx
        }, (0, _createElement.default)('div', {
          class: 'imgWrapper'
        }, (0, _createElement.default)('img', {
          src: basket.img,
          alt: "".concat(basket.name)
        })), (0, _createElement.default)('div', {
          class: 'basket-desc'
        }, (0, _createElement.default)('p', {
          class: 'title'
        }, "\xDCr\xFCn Ad\u0131: ".concat(basket.name)), (0, _createElement.default)('p', {
          class: 'price'
        }, "Fiyat: ".concat(basket.price, " TL")), (0, _createElement.default)('button', {
          class: 'button',
          id: 'removeBasket',
          'data-id': basket.id
        }, 'Sepetten Sil')));
      })))));
    }
  }, {
    key: "render",
    value: function render(state) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "app";
      var markup = this.createMarkup(state);
      var parent = document.getElementById(selector);
      parent.innerHTML = '';
      parent.appendChild(markup);
      this.clickEvent();
    }
  }, {
    key: "clickEvent",
    value: function clickEvent() {
      var _this2 = this;

      var baskets = document.querySelectorAll('#removeBasket');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = baskets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var button = _step.value;
          button.addEventListener('click', function (e) {
            e.preventDefault();
            var id = e.target.getAttribute('data-id'); // Getting the current state.

            var state = _this2.appState.getState();

            var currentBasket = state.baskets.find(function (basket) {
              return basket.id == id;
            });
            var baskets = state.baskets.filter(function (basket) {
              return basket.id != id;
            });
            console.log('baskets', id); // Updating state will prompt a re-render via the notify method being called.

            _this2.appState.update(_objectSpread({}, state, {
              baskets: baskets,
              total: {
                count: state.total.count -= 1,
                price: state.total.price - currentBasket.price
              }
            }));
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "update",
    value: function update(state) {
      this.render(state, "basket-list-container");
    }
  }]);

  return BasketList;
}(_Observer2.default);

var _default = BasketList;
exports.default = _default;
},{"../lib/Observer":"src/lib/Observer.js","../lib/createElement":"src/lib/createElement.js"}],"src/components/Total.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Observer2 = _interopRequireDefault(require("../lib/Observer"));

var _createElement = _interopRequireDefault(require("../lib/createElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Total = /*#__PURE__*/function (_Observer) {
  _inherits(Total, _Observer);

  function Total() {
    var _this;

    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Total);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Total).call(this));
    _this.appState = state;
    return _this;
  }

  _createClass(Total, [{
    key: "createMarkup",
    value: function createMarkup(state) {
      return (0, _createElement.default)('p', null, "Total: ".concat(state.total.price, " TL"));
    }
  }, {
    key: "render",
    value: function render(state) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "app";
      var markup = this.createMarkup(state);
      var parent = document.getElementById(selector);
      parent.innerHTML = '';
      parent.appendChild(markup);
    }
  }, {
    key: "update",
    value: function update(state) {
      this.render(state, "total-container");
    }
  }]);

  return Total;
}(_Observer2.default);

var _default = Total;
exports.default = _default;
},{"../lib/Observer":"src/lib/Observer.js","../lib/createElement":"src/lib/createElement.js"}],"src/components/BasketButton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Observer2 = _interopRequireDefault(require("../lib/Observer"));

var _createElement = _interopRequireDefault(require("../lib/createElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BasketButton = /*#__PURE__*/function (_Observer) {
  _inherits(BasketButton, _Observer);

  function BasketButton() {
    var _this;

    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BasketButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BasketButton).call(this));
    _this.appState = state;
    return _this;
  } // <div id="toggle-baket-container">
  //   <a href="#" class="basket-link">Sepeti Göster</a>
  //   <div class="hidden" id="basket-list-container"></div>
  // </div>


  _createClass(BasketButton, [{
    key: "createMarkup",
    value: function createMarkup(state) {
      console.log(state.total);
      return (0, _createElement.default)('a', {
        href: '#',
        id: 'basket-link',
        class: 'basket-link'
      }, 'Sepetim', (0, _createElement.default)('strong', null, " ".concat(state.total.count)));
    }
  }, {
    key: "render",
    value: function render(state) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "app";
      var markup = this.createMarkup(state);
      var parent = document.getElementById(selector);
      parent.innerHTML = '';
      parent.appendChild(markup);
      this.clickEvent();
    }
  }, {
    key: "clickEvent",
    value: function clickEvent() {
      var button = document.getElementById('basket-link');
      var basketListCont = document.getElementById('basket-list-container');
      button.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('objectss');
        basketListCont.classList.toggle('hidden');
      });
    }
  }, {
    key: "update",
    value: function update(state) {
      this.render(state, "basket-btn-container");
    }
  }]);

  return BasketButton;
}(_Observer2.default);

var _default = BasketButton;
exports.default = _default;
},{"../lib/Observer":"src/lib/Observer.js","../lib/createElement":"src/lib/createElement.js"}],"src/constants/dummyProducts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var dummyProducts = [{
  id: 1,
  name: 'iPhone 11',
  price: 7750,
  img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRJgMzwPIhB5ffBVpHyVTtWJnZbzDngoBP52u3_W9pgWlbd1hOFDsqeiscxCpVGCVAuB5W-4cNs8FV5&usqp=CAc'
}, {
  id: 2,
  name: 'iPhone X',
  price: 6750,
  img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTRHWhlq89di3waNghziKd89rX9hYL58wsZ4DY1fUFhcqNGcTkxEQIIVs4Q0qUM0coItkQmqb0Obw&usqp=CAc'
}, {
  id: 3,
  name: 'iPhone8',
  price: 4750,
  img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEhUQDxAQEA8PEBAQEA8PEBAWFRUPFREXFxUXFRUYHSggGBolHRUWITEjJSkrLi8uGB8zODMtNygtLisBCgoKDg0OGhAQGzAlIB8rLS8tLS0tLTAtKystKy0tLS0rLS0tLS0tLS0tLS0rLS0rLy0tLS0tLS0rLS0tLS0tLf/AABEIAPQAzgMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUBAgMGBwj/xABREAABAwIBBAoNCAgEBwEAAAABAAIDBBEhBRIxQQYTUVNhcYGRstIUIjI0QkNyc4OSobHBBxUjUlRik9MkM0RjdIKj0bTh4vAXNYSUorPxFv/EABsBAQACAwEBAAAAAAAAAAAAAAABBAIDBQYH/8QAOhEBAAIBAgMECAMIAAcAAAAAAAECAwQREiExBROhsSJBUWFxkeHwMkKBBhQjM1JystFDYoKSosHx/9oADAMBAAIRAxEAPwD7igICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDSWRrRnOIAGsoITspfVYbbrzm35MTzgIHzg76jfXd1EGez372313dRA7OfvbfXd1EDs5+9t9d3UQOzn72313dRA7PfvbfXd1EGDlBw8W313dRBpDlR7zZkOcBgXNfgDxkC/IgkbfLvTfxP8ASgbfNvTfxD1UDb5t6b+IeqgbfNvTfxD1UDb5t6b+IeqgbfNvTfxD1UDb5t6b+IeqgbfNvTfxP9KB2cG/rGuj+8bFvONHLZBLQEBAQEBAQV1U7OcSe5jsGj75GJ9tuQ7qIeB2XfKFT5OlET2ySyFoeY4g24YSQC5ziAL2NhieK4vIu9iWyqnylHtkGeM12Y+OQAPY+17OsSCCMQQbHHWCAHo7gYmwG6UGwQbWQLIMWQQ6u73NiBtnntiNTBif7cqC0jjDQGtADRgAEGyAgj0mUIJnPZFLHI6B+1zNje1xjk+q8DuTwHcKDEtZFi3bo2OxbfbI7tOjQdY4UHKiqIo42MfVMmexjWule+IOe4Cxc4NsLngCCcgICAQDgcQdIQR6HtC6LUyzmeQ6+HIQeQhQlMQEBAQEBBUuBIfffXW4ruUofEflP2J1nZjqymYJWTtjEjc6MOZJGxsfcuIu0hgNxfWDbC81tNZ3RMRMbS9L8j+xeopGSTVADX1DoztYc12bHGH5ty24uTI42BNgBrJAhL6PSUbYmCNrnkNc5wMj3SOu5xcbueSSO2NtwWGpY2rvGyYnZKY2wspiNo2JZUoEAoIFMSalu5mP97UFwgICCHQZKp6d0r4IY4n1Mm2zuY2xfJj2zuHEnjJ3U3HCXY5k97i91FSOe8lznOpoSXOJuSSW4knWg1//ADGTvsFF/wBrB1UFqgICAgjj9fwGE9If3UJTEBAQEBAQVn1vOO6TlKGjomnSAUHRjQNCDoEGQgICDSUoIdF3wD9x49rUEaKSokz3dkysG3VDAxjKbNDY53sbbOjJ0NGkrZWkTHNqve0Tyb5lR9sqPUo/yVn3dWHe2YzKj7ZUepR/kp3VUd7Yzaj7ZUepR/kqe6qjvrMZtR9sqPUo/wAlO5qd9Yzaj7ZUepR/kp3NTvrlqj7ZUepR/kqe5qjvrlqj7ZUepR/kp3NTvrsWqPtk/qUf5KdzU7+7lVzVMbHSCrmJY0uDXMpbGwvY2iBtxELG2KsRMsq5rTMQv/H+iPSaq60loCAgICAgrB4XnHdJylDIQbBBkINkBAQcXG6CLQ98DyH4crUHPJw7V38TWf4uVZ1nkia7pFlnxMJoWWXEwmjFlPEx4GCE4kcDFlO5wMWTc4GFPEjgYTc4ETKv6mTzb+isbT6Msq15wv8Ax/oj0mqqtJaAgICAgIKtmh198do8pylDYINggyEGyAEGsuGCDkUEehH6QD9xw9oQMmNvG7+Jrf8AGSqN2cOjxZTuz4d2LrLiYzQup4mPAwm6OBgqeJHA1JTiO7akqeI4GCVO5wIeVXfQyebf7lEzyODZ6A328bm1Ov6zVpSmICAgICAgq4zcOtvjuk5ShsEGwQZCDeNtzZB1eGsBeXZrWguc42sGgYkqEvC7D9lVRlKaoO1RijjcRFLdwfie1a4G4cS3E6LXGm6lD1hQcMnn6e33XfBBHyXKWh+ab/pNZnM/6qXQi1WsTSN/msSWvFx/8PCoY7TWdpQ3usbFG2K7sbYpOFnPRHAwXojgal6k4GhkRPA5ukWSe7Q8pyfRP8h3uSeiLY/RmXqXH6cDXtTukFrVExAQEBAQEFY0d15x/ScpQ2CAEGwQbxGxQeG+WTZH2NSilY60tZdrraRTt7s8tw3iLtxB5L5GcsSCaSkEefFI0zukGG1uaA3HdDu1FtNxx2D66UEagb+kX+44e0IPHuykYp5gDa1VU/8AveVsrHJ6DS4Ivpq7+/zle0eVw/WGyexyiatOTTTX3x5Jbqtr8Hdq7/egrHh2aO5mvOOcIzpLKdmyKbsidNkTjZ25Nkd21MybMu7c3TJsmMbk+dSzjGhV892OG60hJ6Iy49sdvhL3Vvp/RO6TVrcZLQEBAQEBBWjwvOO6TlKGQgIMhBlBRZU2M0NVKZ6mnZPIWNjzpS9waxt7BrSbN0k3Avig3yDseo6Brm0kIiEhDnnOe5ziNF3PJNhc2F7C53UFmUHHJ36/+V3wQePmEb5ZmyNBHZVVZ2gj6d+g6lYpHow9DpOONPW1J9vnLE2SJGDOiO2M3PCHJrRtpq6WnhvynwcYq93cuJw1HUo2bpwx1hLbXX0qNmqcTdtUo2Yzjb9kpsx7tqalRsnu3N1Sp2ZRjcJKlNmcY0SoqLi27h7UmOTDPTbDf4T5Pp/j/RHpNWl5pLQEBAQEBBWjwvOO6TlKBBlBlBq9yDmgIMFBHoB+kA/u3+9qDwFVXtbVVDCbEVVRgdGMrj8VcxR6EPW6HBM6Olvj/lK6oKstsWnDcvhyFZWpup6jFFuVlhNS09V3QzJN0YH/ADWmYmFSubNp+nOv38lJlHIs8HbD6SP6zdI4wkbS6WDW4s3LpPslWiqTZbnG37KTZHdhqlGx3bm+pU7MoxuD6lNmcY0c1FyBuuaP/IKJjlLXqse2DJ/bPk+zeP8ARHpNVd41LQEBAQEBBWjwvOO6TlKBAQZQcnG6DCAgwg40HfA8h/vag+R7JqWTsuoe0GxqZ7EcErgulp6/w4+/W932Nlx/uVKTPPn/AJSlZJr5G2vp1rOastVp6Weroqpsgs7A7ur/ACWFqPP58VsU715raKpkj09uzh3ONaJpEqM1pk6cpR6/I8FSC6OzH6wN3iWPOOUrGDXZcE8OTnDyOUMnSwmxBwU7O/gz48sb1lX7adAxO5rTZZ4YcX1CnZnGNGlqrKYq2VxOENVnSMG7JH0wptXastetxbaXLP8Ay28pfoDx/oj0mqi+fJaAgICAgIKweF5x3ScpQICDDyg5oCAgwUHHJ/fA8h/vag+dZRqR2VUMOkVVR7ZXH4rt6Sm+Cs/Hzlt0/aPd3nF7P/rvDTsfqsd0LO1XUjtO9Y5TvCypqNzMRiOBaZ2YZNfXLHPlK/pG3FvYqt45ubfJzJICw5zOULHffq3UzReOG7qBHOLOAJ3CsJiam+TBO9ZU2Udh8b+2Yc0qYvDo4O2705XjdXSbF5LWe0St3dDhxOGKziYXa9r4utZ2nw+SjylsNlGMJJ/dyYHkdoK2RZewdtYp5X+cdHn2UckUrBIxzDtrO6H3hoOgrHJ+GV7V5qZdHlmk7+jbyl+gvH+iPSaue+eJaAgICAgIKz63nHdJylDCAg5uKDCAgIMFByyf3wPIf72oPi+yWsdHlGqBvmmqmLT/ADldfRZNqRE/fNx9XX+LNqzzjbyhb5MyhcAg8iu2dTSZK5q7TPN6rJeUmOwJsdwqrkpv0bc+my444use2Fj84NYcVp7mbOXfWVp+J3ZlFp0EELCcMwRrazzrLpmNfi05r1rmJjq6Gn18bcNucOja1zO1lGbuP8E8q18MT0Wb6eMleLDO/u9cOm3XwvY6uHiWXC5k5ZidpaS5/AeRZRsxnNkjoqMrRh0b86Nps0kHcIxBWV4jgnn6meHX5otweqeU/q9j4/0Tuk1c9dS0BAQEBAQVn1vOO6TlKGqDVxQaICAgIBQcsnd8DyH+9qD4/skmhNbVRyYEVU+JwB+kJ06OddbSWpOOIn75vO9oUyRntavu8o++TnBSFuMbrjV/vWulSOW084UsesvjtxRyn76rSCU6xZwWnJjmvOHt+yO1cWpjgtPP2LakrGSjMkNjoBBsR/da629cMO1+w65Y4qx+sN56d8WN7tOh418e4t1bRd4HVaXJpp59Pal5Pyi5hFzcLVlwxMI02uvjttPR6+jkbI2xAxGIOhcnJWay9Vps8WiJrO0oVdk0x9tGDmaS1p0cTTccy24skW5T1Z6rUZdt71i8f+XzjnLhT5YDBaRt2/XGFuO+A5TyLZbTzP4WjHrdJaPxTX+7p/3R0/6oj4u2U3RvgkczenkeqVWvxViYlajFXeLR4c1/4/0R6TVVW0tAQEBAQEFWfC847pOUoaoNCUGEBAQEGEHLJ3fA8h/vag+BbM8pNZlSsYcLVUvtN/ireDLFY2lztXp7WtNoSclV8Z0G19w4coXUw5auFqMF49T0VO8HWrtdp6OZbirO6RtAOOvdGlYXwVnn0l3NB+1Ot0u1bTx19luv6T1+e7u10rBZrs5h0sdiObSOQqvOO1Z3h6rF2j2T2vXgzRtafbyt+kx1aNqwNLXDmI+BHtWXe/1Q5eq/Yri3tpc0fC3Lxjfyh6jY/ldrrNLhfVw8mkcqp58cW51U6aDXaL0c9J2/qjnE/rHT9dnq46htsSufNJ3Xa5o25vPZZqKRpLmyZsmODBcE7mGjl9ivaemaY2mOTi63JpOKZpba3u5x9PvooJ5XZrjfaWvH6tvhE4Xc3QL3VjPFe6tHXlPP2NvZWh1N797+Gsc5iPXt7Y9X3y9b6R4/0Tuk1cF6RLQEBAQEBBVnwvOO6TlKHMlBqgwgICAgwUHPJvfA8h3vag/Mnynf82rf4qRQlQU9W9mhxWymSYar4q26wvKDZJIzTfkKu49XarnZuzqX6PR0Gy9p0k8qv49bWerl5uyLepf0eySJ2kq1XLWzmZezclfUvqGop58Nsa1x0Z1rc5WN+XOI3ZYNZrtPO1ctq/rvHj0Tq7IUkQz2ta8acL34xbStOLNhvO08ncnt3tPDXnbij3x97o0eV5GjMdnZpwILr+9WJ0lJnihSt2zGas1yY42n2Q0EjW3kGJPcA424UybxG0rvYvZuLU5+OI9HyQJJ3OOJvdw94VHPM93b4S+iWw48envFI29GfJ9g8f6I9Jq4bzSWgICAgICCqd4XnHdJylDmUGCgwgICAgwUHPJvfA8h3vag+GbOMkxS19U4mzjUzX5HkfBdDDgrfHEz983H1OryY81ojpy8nlp9jH1HDnUW0XslNO0/6oVtRkOZmOFhwqvbTXqt012O6vBc08S07zC3ylZUdZwq1izTDRkxxPV6HJdVI42bnHiXRxZbT0cjVYaVjeZfZtgL5zTvbMbtABY0+Dyqpq9u+rt19atpb17nJHq9Xx9zzeUqgOkeW2tnG1ty69BhiYrES4W28zPtHuwA3Aq2ad5fSOwMHdYI36y5axxt94VLN/Lt8Jejyz/Bv/bPk+x+P9E7pNXDeaS0BAQEBAQVT9DvOu6TlKHNBqUGEFdleWcZjYA/tiM5zAzAbbEDi5pA7Vz9O4eQIQrq6NoEkIlf21zGyS2c0OwwGhzg0B2oOudFkHaPKNVnsa6ns15Bc8CSzQczA4YEXcbnA5tsL3AW6DTJvfA8h3vag+U7JMnxPq6hznWJqai+I31wXc0eKtsFZn3+cvKdpai9NVeIj2eUKqXYzHIMJyzhuFttpa26TKpXtO9J503eayvsZpYb7ZlNt/qbWXu5mu+CoZdJjr+LL4b+Uuxpe0tRl/Bp/wBd9o8YVNHkPbHdqXOZfBxGaSOLGyr003FPLp8l7LruCOfKfn/p6PJ2xSIEF4v925V/Foax1cnN2pknlV6vJ2TRcNYy2oNaPgrd7Uw04p9TlXy2vO2/OXsa2qFDSubcbdKLADUNBPIuVpN8+ab2XOC1dPPD06bvF0z84+1ejieGu7HR6XvcsR6oTwqd30TSbREQwdXG33hVc/8ALt8JdHJP8G/wnyfYvH+iPSauE84loCAgICAgqX+F513ScpQ5oNSgwgICAgFBzyZ3x/I73tQfO8r5MhkqZ3vLs51TUXAvqmcPgu7o6x3FZn3+cvFdr6rLTV3rWOXL/GGBk6naLFhN8AHOtf4lbL5sdOVrRHn8nNx5NTk5x4QosqZDa2+1x09O04ksjaZDxvd3KWw14d67RHw5+PRf0+rtP4rWvPvnl8o6uuT6KFgszNJ15pzjfhIusf3nS4Y53j57+TO9dRlnfhny/wBQtIoYmi73BrRptYc5OhUc3beKvLFWbT8o/wB+DPF2Zqcs7RH/AL+/m5zbL4IAWUjGyP1vB7QcLpNfE1c219Vq7b35Q9Fof2dpT088/wC/ooJK+aocXyvL3O0k4cQA1Aagu5ocHdxybu0s2HgjFij0YT6IrrWjk5ejtHGsWlVbQ9XprsnVxj3hVc/8u3wnydK9v4NvhPk+w+P9Eek1cFwUtAQEBAQEFS/wvOu6TlKHNBqUGEBAQEGCg0yZ3x/I73tQfItley3serqYA15LKme5BAHbSudp061nvntXhrO0fFyc/Z2nvntlv1nb1b9IiPXy9Tzr9mL73bGAd0vN1q/dLb78SzXT6bbaYmfkhybIZnHOEcLT9ZzbnnJWX7hv+KW+saesbRWfmwcs1T/HuA3ImNHtK3U0GP4su9x16UhlsL5Dd+c/hle53MNAVzHpKR0hE6+0R6PJYwUZ182rmV7Hp1HNrLW6ynRx2XQx4tnJzZt02jC25OjZoYmbbrJip2er08tzq4x71V1H8u3wnydSZ/hW+E+T7B4/0Tuk1efcZLQEBAQEBBVP0O867pOUockGCgwgICAgwUGmTe+B5Dve1B8+2T/I/UVlXPUtrYWNqJXSBjoXktDtRIdis63mI2YWxxM7q5nyG1OuvhPFE8fFZxm93j9Ed1DtH8ic4/a4DwmKT4lZxqKx+XxYzimfX4JUfyQVDf2uD8OT+63V10R+Tx+jRbSWn8/g7n5Lp2C7qunAGkua8AcZK3R2nEfk8fo0z2dM/wDEn5fV3Z8mtTbCppyN0NkWcdrbfk8foiezZn8/h9Wf+GlV9pg9WRZx2zP9Hj9GqeyIn8/h9XeL5PKpvj6f1ZFhbteZ/J4/Rcw6KuL1u42CVW/U/NItU9pzP5fH6OjS/C2bsFqbi80Fri9hJe18bLXk103rNeHr7/osTq/Rmu3V7jx/oj0mrnqiWgICAgICCqI7vzpPPcqUNLINbIFkGLIFkCyAQg40GFSPIePa1BeoCAgIIUdJnyOklAdmuzYGnEMYALuA0Z5OdjptYbtw7zQ3Ic05rgRc27pl8WkcWjcPKCHZAQEBBHaPp77kViONwt7ioSmICAgICAgrq1uY4vPcPtnH6rhgCeCwHNwoONwpQwgwgICAgwghVTjG5sjcSw3tujWEF7S1TJWhzCCDq1g7hQd0BAQaSFwHagE7hJHtsUHKndKSdsaxjfBDXueTwkloA4hfjQSEGEBBpNM1gu42AQaUTHdtI8WdIRZp0hg7kHhxJ5VCUpAQEBAQEBBXy5JYTdrnx/djLQ3mtZA+ahvsvPH1UD5qG+y/0+qgfNQ32X+n1UGnzR+/n/o9RBs3JI36Y8e1fBiDPzUN9l/p9VBq7I7Tpkl54+qg4DY7GDnNmqGHdY9gvx9qglNyaR4+fldH1UGfm47/AD88fVQPm47/AD88fVQauyYToqKgcRi+LEBuTCP2moPATD8GINvm47/Pzx9VA+bjv8/PH1UA5NO/z88fVQb01A1hvdz3DQ6QgkcWGHIgloCAgICAgICAgICAgICAgICAgICAgICAgICAgICAg//Z'
}, {
  id: 4,
  name: 'Samsung S20',
  price: 10750,
  img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTFHbDHCajy92YBGy_P5r5qhy90htrYvEiwz9OSl0TrJeDmF_QT'
}, {
  id: 5,
  name: 'Samsung S10',
  price: 6750,
  img: 'https://smsoptimizedimages.azureedge.net/0016316_samsung-galaxy-s10e-128gb-prizma-beyaz_550.jpeg'
}, {
  id: 6,
  name: 'Samsung S9',
  price: 4750,
  img: 'https://cdn.akakce.com/samsung/samsung-galaxy-s9-64gb-z.jpg'
}];
var _default = dummyProducts;
exports.default = _default;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.scss");

var _State = _interopRequireDefault(require("./lib/State"));

var _ProductList = _interopRequireDefault(require("./components/ProductList"));

var _BasketList = _interopRequireDefault(require("./components/BasketList"));

var _Total = _interopRequireDefault(require("./components/Total"));

var _BasketButton = _interopRequireDefault(require("./components/BasketButton"));

var _dummyProducts = _interopRequireDefault(require("./constants/dummyProducts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  products: _dummyProducts.default,
  baskets: [],
  total: {
    count: 0,
    price: 0
  }
}; // Instantiate classes.

var AppState = new _State.default(); // application state

var productList = new _ProductList.default(AppState); // Create a new product list.

var basketList = new _BasketList.default(AppState); // Create a new basket list.

var total = new _Total.default(AppState); // Create a new total container.

var basketBtn = new _BasketButton.default(AppState); // Create a new total container.
// Hydrate state with initial baskets.

AppState.update(initialState); // Add the observers. These objects will re-render when state changes.

AppState.addObserver(productList);
AppState.addObserver(basketList);
AppState.addObserver(total);
AppState.addObserver(basketBtn); // On load, perform initial render..

productList.render(AppState.getState(), "product-list-container");
basketList.render(AppState.getState(), "basket-list-container");
total.render(AppState.getState(), "total-container");
basketBtn.render(AppState.getState(), "basket-btn-container");
},{"./styles.scss":"src/styles.scss","./lib/State":"src/lib/State.js","./components/ProductList":"src/components/ProductList.js","./components/BasketList":"src/components/BasketList.js","./components/Total":"src/components/Total.js","./components/BasketButton":"src/components/BasketButton.js","./constants/dummyProducts":"src/constants/dummyProducts.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54222" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map