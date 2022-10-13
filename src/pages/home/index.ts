import { state } from "../../state";

export function initHomepage(containerEl) {
  const div = document.createElement("div");
  div.classList.add("home-content");

  div.innerHTML = `
  <h1 class="main-title">Mis pendientes</h1>
  <custom-form></custom-form>
  <ul class="lista"></ul>
  `;

  const listaEl = div.querySelector(".lista") as HTMLElement;

  function createTasks(items) {
    const itemListHTML = items
      .map(
        (t) => `<my-todo-list title="${t.title}" id="${t.id}"></my-todo-list>`
      )
      .join("");

    listaEl.innerHTML = itemListHTML;
  }

  state.subscribe(() => {
    createTasks(state.getEnabledTasks());
  });

  window.addEventListener("load", () => {
    const localData: any = localStorage.getItem("saved-state");
    createTasks(JSON.parse(localData).tasks);
  });

  containerEl.appendChild(div);
}
