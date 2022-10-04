import { state } from "../../state";

export function init() {
  class FormComp extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
      this.addTasksForm();
    }
    addTasksForm() {
      const formEl = this.shadow.querySelector(".form") as HTMLElement;
      formEl.addEventListener("submit", (e: any) => {
        e.preventDefault();
        state.setState({
          ...state.getState(),
          task: [e.target.name.value],
        });
      });
    }
    render() {
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

      const div = document.createElement("div");
      div.classList.add("form-container");

      div.innerHTML = `
        <form class="form">
          <label class="form__label">Nuevo pendiente</label>
          <input type="text" name="name" class="form__input" /input>
          <button class="form__button">Agregar</button>
        </form>
      `;

      this.shadow.appendChild(style);
      this.shadow.appendChild(div);
    }
  }
  customElements.define("custom-form", FormComp);
}
