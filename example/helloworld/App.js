import { h } from "../../lib/guide-mini-vue.esm.js";

window.self = null
export const App = {
  render() {
    window.self = this
    return h(
      "div",
      {
        id: "root",
        class: ["red", "blue"]
      },
      "hi, " + this.msg
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