import { createRenderer } from "../runtime-core";

function createElement(type) {
  return document.createElement(type);
}

const isOn = (key: string) => /^on[A-z]/.test(key);
function patchProp(el, key, prevVal, nextVal) {
  if (isOn(key)) {
    el.addEventListener(key.slice(2).toLowerCase(), nextVal);
  } else {
    if (nextVal === undefined || nextVal === null) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, nextVal);
    }
  }
}

function insert(el, parent) {
  parent.appendChild(el);
}

const renderder: any = createRenderer({
  createElement,
  patchProp,
  insert,
});

export function createApp(...args) {
  return renderder.createApp(...args);
}

export * from "../runtime-core";
