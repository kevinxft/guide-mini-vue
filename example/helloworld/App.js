import { h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",
  render() {
    return h(
      "div",
      {
        id: "root",
        class: ["red", "blue"],
        onClick() {
          // console.log("onClick");
        },
        onMouseDown() {
          // console.log("onMouseDown");
        },
      },
      [
        h("div", {}, "hi," + this.msg),
        h(Foo, {
          count: 1,
          onAdd(...args) {
            console.log("onAdd", ...args);
          },
          onAddFoo() {
            console.log("onAddFoo");
          }
        }),
      ]
      // [
      //   h("p", {
      //     class: 'red',
      //   }, "hi"),
      //   h("p", {
      //     class: 'blue',
      //   }, "mini-vue"),
      // ]
    );
  },
  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
