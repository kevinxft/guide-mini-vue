import { createComponentInstance, setupComponent } from "./component";
import { ShapeFlags } from "../shared/ShapeFlags";
import { Fragment, Text } from "./vnode";

export function render(vnode, container, parentComponent) {
  patch(vnode, container, parentComponent);
}

function patch(vnode, container, parentComponent) {
  // ShapeFlags
  const { type, shapeFlag } = vnode;

  switch (type) {
    case Fragment:
      processFragment(vnode, container, parentComponent);
      break;
    case Text:
      processText(vnode, container);
      break;
    default:
      // 判断是不是element类型
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container, parentComponent);
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container, parentComponent);
      }
  }
}

function processComponent(vnode, container, parentComponent) {
  mountComponent(vnode, container, parentComponent);
}

function processElement(vnode, container, parentComponent) {
  mountElement(vnode, container, parentComponent);
}

function mountElement(vnode: any, container: any, parentComponent) {
  const el = (vnode.el = document.createElement(vnode.type));

  // string array
  const { children, shapeFlag } = vnode;
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el, parentComponent);
  }

  // props
  const { props } = vnode;
  const isOn = (key: string) => /^on[A-z]/.test(key);
  for (const key in props) {
    const val = props[key];
    if (isOn(key)) {
      el.addEventListener(key.slice(2).toLowerCase(), val);
    } else {
      el.setAttribute(key, val);
    }
  }

  container.appendChild(el);
}

function mountChildren(vnode, container, parentComponent) {
  vnode.children.forEach(v => {
    patch(v, container, parentComponent);
  });
}

function mountComponent(initialVNode: any, container: any, parentComponent: any) {
  const instance = createComponentInstance(initialVNode, parentComponent);

  setupComponent(instance);
  setupRenderEffect(instance, initialVNode, container);
}

function processFragment(vnode: any, container: any, parentComponent) {
  mountChildren(vnode, container, parentComponent);
}
function processText(vnode: any, container: any) {
  const { children } = vnode;
  const textNode = (vnode.el = document.createTextNode(children));
  container.append(textNode);
}

function setupRenderEffect(instance, initialVNode, container: any) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);

  // vnode -> patch
  // vnode -> element -> mountElement
  patch(subTree, container, instance);

  initialVNode.el = subTree.el;
}
