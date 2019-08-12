import { modifyThemeColorWithFg } from "../../../src/ts/pulprColor";

(() => {
  const changeBtn = document.getElementById("change-button");
  if (changeBtn == null) {
    throw new Error("Change theme color button does not exist!");
  }

  changeBtn.onclick = () => {
    modifyThemeColorWithFg("primary", "#2b5c21");
  };
})();
