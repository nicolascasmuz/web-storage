import { state } from "../../state";

export function initHomepage(containerEl) {
  // SE CREA EL CONTENIDO DEL CONTAINER (.WRAPPER)
  const div = document.createElement("div");
  div.classList.add("home-content");

  div.innerHTML = `
  <h1 class="main-title">Mis pendientes</h1>
  <custom-form></custom-form>
  <ul class="lista"></ul>
  `;

  // SE CREAN LOS ÍTEMS DE LA LISTA QUE SE MOSTRARÁ
  const listaEl = div.querySelector(".lista") as HTMLElement;

  function createTasks(items) {
    const itemListHTML = items
      .map(
        (t) => `<my-todo-list title="${t.title}" id="${t.id}"></my-todo-list>`
      )
      .join("");

    listaEl.innerHTML = itemListHTML;
  }

  // LA FUNCIÓN CREATETASKS SE SUSCRIBE AL ESTADO PARA
  // MODIFICARSE DE ACUERDO A LOS CAMBIOS QUE ALLÍ OCURRAN
  state.subscribe(() => {
    createTasks(state.getTasks());
  });

  // SE CARGAN LAS TAREAS GUARDADAS EN EL ALMACENAMIENTO
  // DEL NAVEGADOR PARA SER MOSTRADAS CON CADA REFRESH
  window.addEventListener("load", () => {
    const localData: any = localStorage.getItem("saved-state");
    createTasks(JSON.parse(localData).tasks);
  });

  // SE APPENDEA EL DIV (CONTENIDO DEL CONTAINER)
  containerEl.appendChild(div);
}
