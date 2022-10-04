export function init() {
  class H1Comp extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      this.style.fontFamily = "Roboto";
      this.style.fontSize = "52px";
      this.style.fontWeight = "700";
    }
  }
  customElements.define("custom-h1", H1Comp);
}
