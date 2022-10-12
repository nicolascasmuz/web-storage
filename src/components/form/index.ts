import { state } from "../../state";

customElements.define(
  "custom-form",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
      this.addTasksForm();
    }
    addTasksForm() {
      const formEl = this.shadow.querySelector(".form") as HTMLElement;
      formEl.addEventListener("submit", (e: any) => {
        e.preventDefault();
        if (e.target.name.value == "") {
          null;
        } else {
          state.addTask(e.target.name.value);
        }
      });
    }
    render() {
      this.shadow.innerHTML = `
      <form class="form">
        <label class="form__label">Nuevo pendiente</label>
        <input type="text" name="name" class="form__input" /input>
        <button class="form__button">Agregar</button>
      </form>
    `;

      const style = document.createElement("style");
      style.innerHTML = `
      .form {
        display: flex;
        flex-direction: column;
        gap: 3px;
        max-width: 312px;
      }
      .form__label {
        font-size: 18px;
        font-family: "Roboto";
        font-weight: 500;
      }
      .form__input {
        font-size: 24px;
        font-family: "Roboto";
        font-weight: 400;
        width: auto;
        height: 55px;
        border: 2px solid #000000;
        border-radius: 4px;
      }
      .form__button {
        background-color: #9CBBE9;
        font-size: 18px;
        font-family: "Roboto";
        font-weight: 400;
        width: auto;
        height: 55px;
        border: none;
        border-radius: 4px;
      }
    `;

      this.shadow.appendChild(style);
    }
  }
);
