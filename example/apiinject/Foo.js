import { h, renderSlots, getCurrentInstance } from "../../lib/guide-mini-vue.esm.js";

export const Foo = {
  name: "Foo",
  setup() {
    console.log("Foo: ", getCurrentInstance());
    return {};
  },
  render() {
    const foo = h("p", {}, "foo");
    const age = 100;
    return h("div", {}, [foo]); // 等同于
    // return h("div", {}, [foo, h("div", {}, this.$slots)]);
  },
};
