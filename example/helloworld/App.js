import { h, createTextVNode } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",
  render() {
    const app = h("div", {}, "App");
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => [h("p", {}, "header1" + age), createTextVNode("你好呀")],
        footer: () => h("p", {}, "footer1"),
      }
    );
    return h("div", {}, [app, foo]);
  },
  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
