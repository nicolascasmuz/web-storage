import "./components/header";
import "./components/footer";
import "./components/form";
import "./components/todo-item/";
import { initHomepage } from "./pages/home/index";
import { state } from "./state";

(function () {
  state.init();
  initHomepage(document.querySelector(".wrapper"));
})();
