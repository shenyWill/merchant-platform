import Vue from 'vue';

let id = 0;

const createElm = function() {
  const element = document.createElement('div');

  element.id = 'app' + ++id;
  document.body.appendChild(element);

  return element;
};

export function destroyVM (vm) {
  vm.$destroy && vm.$destroy();
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el);
};

export function createVue (Component, mounted = false) {
  if (Object.prototype.toString.call(Component) === '[object String]') {
    Component = { template: Component };
  }
  return new Vue(Component).$mount(mounted === false ? null : createElm());
};

/**
 * Create a Test Component Instance
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Component
 * @param  {Object}  propsData
 * @param  {Boolean=false} mounted
 * @return {Object} vm
 */
export function createTest (Component, propsData = {}, mounted = false) {
  if (propsData === true || propsData === false) {
    mounted = propsData;
    propsData = {};
  }
  const element = createElm();
  const Ctor = Vue.extend(Component);
  return new Ctor({ propsData }).$mount(mounted === false ? null : element);
};

/**
 * mouseenter, mouseleave, mouseover, keyup, change, click etc...
 * @param  {Element} element
 * @param  {String} name
 * @param  {*} opts
 */
export function triggerEvent (element, name, ...opts) {
  let eventName;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }
  const evt = document.createEvent(eventName);

  evt.initEvent(name, ...opts);
  element.dispatchEvent
    ? element.dispatchEvent(evt)
    : element.fireEvent('on' + name, evt);

  return element;
};

/**
 * trigger 'mouseup' and 'mousedown' event
 * @param {Element} element
 * @param {*} opts
 */
export function triggerClick (element, ...opts) {
  triggerEvent(element, 'mousedown', ...opts);
  triggerEvent(element, 'mouseup', ...opts);

  return element;
};

/**
 * trigger keydown event
 * @param {Element} element
 * @param {keyCode} int
 */
export function triggerKeyDown (el, keyCode) {
  const evt = document.createEvent('Events');
  evt.initEvent('keydown', true, true);
  evt.keyCode = keyCode;
  el.dispatchEvent(evt);
};
