import { ShapeFlags } from '../shared/ShapeFlags';

export function createVNode (type, props?, children?) {
  const vnode = {
    type,
    props,
    shapeFlag: getShapeFlag(type),
    children
  }
  debugger
  if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }

  return vnode
}

export function getShapeFlag(type) {
  return typeof type === "string" ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT;
}