import { createVNode } from "./vnode";

export function createAppAPI(render) {
  return function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        // vnode 所有逻辑操作都会基于虚拟节点
        const vnode = createVNode(rootComponent);

        render(vnode, rootContainer);
      },
    };
  };
}
