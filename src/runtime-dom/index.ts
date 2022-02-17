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

function insert(child, parent, anchor) {
  parent.insertBefore(child, anchor || null)
}

function remove(child) {
  const parent = child.parentNode
  if (parent) {
    parent.removeChild(child)
  }
}

function setElementText(el, text) {
  el.textContent = text;
}

const renderder: any = createRenderer({
  createElement,
  patchProp,
  insert,
  remove,
  setElementText
});

export function createApp(...args) {
  return renderder.createApp(...args);
}

export * from "../runtime-core";
