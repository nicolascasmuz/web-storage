import { stat } from "fs";
import { state } from "../../state";
const binIcon = require("url:../../resources/delete-1.png");

export function init() {
  class CardComp extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    task: string;
    constructor() {
      super();
      state.subscribe(() => {
        this.addTasksCard();
        this.actions();
      });
      this.addTasksCard();
      this.actions();
    }
    addTasksCard() {
      const lastState = state.getState();
      this.task = lastState.task || "";
      this.render();
    }
    render() {
      // SE CREA LA HOJA DE ESTILO
      const style = document.createElement("style");

      style.innerHTML = `
        .card {
            display: grid;
            align-items: center;
            grid-template-rows: 50% 50%;
            grid-template-columns: 85% 15%;
            background-color: #FFF599;
            width: 312px;
            height: 112px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .card__p {
            grid-row: 1;
            grid-column: 1 / span 2;
            font-size: 18px;
            font-family: "Roboto";
            font-weight: 400;
            margin: 0;
            margin-left: 10px;
            margin-right: 35px;
        }
        .card__input {
            width: 20px;
            height: 20px;
            grid-row: 1;
            grid-column: 2;
            margin: 0 auto;
        }
        .card__img {
            display: none;
            grid-row: 2;
            grid-column: 2;
            margin: 0 auto;
        }
      `;

      // SE CREA EL DIV CONTENEDOR
      const div = document.createElement("div");
      div.classList.add("card");

      div.innerHTML = `
        <p class="card__p">${this.task}</p>
        <input type="checkbox" class="card__input" id="card__input" />
        <img class="card__img" src="${binIcon}">
      `;

      // SE CREA EL ITEM POR CADA TAREA QUE SE AGREGA
      if (state.data.task == "") {
        null;
      } else if (state.data.task != "") {
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
      }
    }
    actions() {
      // ELEMENTOS
      const cardEl = this.shadow.querySelector(".card") as HTMLElement;
      const cardPEl = this.shadow.querySelector(".card__p") as HTMLElement;
      const checkboxEl = this.shadow.getElementById("card__input") as any;
      const binEl = this.shadow.querySelector(".card__img") as HTMLElement;

      // APARECE EL BORDE Y EL TACHITO CUANDO SE HACE CLICK SOBRE EL ITEM
      cardEl.addEventListener("click", () => {
        cardEl.style.border = "solid 2px black";
        binEl.style.display = "block";
      });

      // SE TACHA LA NOTA CUANDO SE MARCA EL CHECKBOX
      checkboxEl.addEventListener("change", () => {
        cardPEl.style.textDecoration = "line-through";
        cardEl.style.border = "none";
        binEl.style.display = "none";
      });

      // SE ELIMINA EL ITEM AL HACER CLICK EN EL TACHITO
      const binAtt = binEl.getAttribute("class");
      const stringValue = JSON.stringify(binAtt);
      cardEl.setAttribute("for", stringValue);
      const cardAtt = cardEl.getAttribute("for");

      binEl.addEventListener("click", () => {
        if (cardAtt == stringValue) {
          cardEl.remove();
        }
      });
    }
  }
  customElements.define("todo-item", CardComp);
}
