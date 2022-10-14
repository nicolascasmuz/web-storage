const binIcon = require("../../resources/delete-1.png");
import { state } from "../../state";

customElements.define(
  "my-todo-list",
  class extends HTMLElement {
    shadow: ShadowRoot;
    title: string;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
      this.addListeners();
    }
    render() {
      // SE CREA EL ELEMENTO
      this.shadow.innerHTML = `
      <div class="root">
          <h4 class="card__title">${this.title}</h4>
          <input class="card__input" type="checkbox" />
          <img class="card__img" src="${binIcon}" />
      </div>
      `;
    }
    connectedCallback() {
      // SE OBTIENEN LOS ATRIBUTOS
      this.title = this.getAttribute("title") || "";
      this.id = this.getAttribute("id") || "";

      // SE DA ESTILO AL ELEMENTO
      const style = document.createElement("style");
      style.innerHTML = `
      .root {
        display: grid;
        align-items: center;
        grid-template-rows: 50% 50%;
        grid-template-columns: 85% 15%;
        background-color: #FFF599;
        width: 312px;
        height: 112px;
        border-radius: 4px;
        padding: 22px 13px;
        margin-bottom: 20px;
      }
      .card__title {
        grid-row: 1;
        grid-column: 1 / span 2;
        font-size: 18px;
        font-family: "Roboto";
        font-weight: 400;
        margin: 0px 35px 0px 10px;
      }
      .card__input {
        width: 20px;
        height: 20px;
        grid-row: 1;
        grid-column: 2;
        margin: 0 auto;
      }
      .card__img {
        grid-row: 2;
        grid-column: 2;
        margin: 0 auto;
      }`;
      this.shadow.appendChild(style);
    }
    addListeners() {
      // TACHA LA TAREA
      const checkboxEl = this.shadow.querySelector(
        ".card__input"
      ) as HTMLElement;
      const titleEl = this.shadow.querySelector(".card__title") as HTMLElement;

      checkboxEl.addEventListener("click", (e: any) => {
        if (e.target.checked == true) {
          titleEl.style.textDecoration = "line-through";
        } else if (e.target.checked == false) {
          titleEl.style.textDecoration = "none";
        }
      });

      // ELIMINA EL ELEMENTO Y RESETEA EL STATE
      const binIconEl = this.shadow.querySelector(".card__img") as HTMLElement;
      binIconEl.addEventListener("click", () => {
        state.deleteTask(parseInt(this.id));
        this.remove();
      });
    }
  }
);
