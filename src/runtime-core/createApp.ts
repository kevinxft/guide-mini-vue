import { createVNode } from "./vnode";
import { render } from "./renderer";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // vnode 所有逻辑操作都会基于虚拟节点
      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    },
  };
}
