import { createRenderer } from "../runtime-core";

function createElement(type) {
  return document.createElement(type);
}

function patchProps(el, key, val) {
  const isOn = (key: string) => /^on[A-z]/.test(key);
  if (isOn(key)) {
    el.addEventListener(key.slice(2).toLowerCase(), val);
  } else {
    el.setAttribute(key, val);
  }
}

function insert(el, parent) {
  parent.appendChild(el);
}

const renderder: any = createRenderer({
  createElement,
  patchProps,
  insert,
});

export function createApp(...args) {
  return renderder.createApp(...args)
}

export * from "../runtime-core"