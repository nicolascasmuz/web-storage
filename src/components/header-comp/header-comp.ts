export function init() {
  class HeaderComp extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      this.style.display = "flex";
      this.style.backgroundColor = "#FF8282";
      this.style.minWidth = "375px";
      this.style.minHeight = "60px";
    }
  }
  customElements.define("custom-header", HeaderComp);
}
