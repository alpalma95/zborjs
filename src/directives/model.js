import { hook } from "apajs-streams";

export const modelDirective = {
  selector: "z-model",
  construct: function ({ element }, variable) {
    element.addEventListener('input', () => {
        variable.val = element.value
    })
    return hook(() => {
      element.value = variable.val;
    });
  },
};
