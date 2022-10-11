import { initHomepage } from "./pages/home/index";
import "./components/header";
import "./components/footer";
import "./components/form";
import "./components/todo-item/";
import { state } from "./state";

(function () {
  /* state.init(); */
  initHomepage(document.querySelector(".wrapper"));
})();
