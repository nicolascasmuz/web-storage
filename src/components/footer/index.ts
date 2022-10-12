customElements.define(
  "custom-footer",
  class extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      this.style.fontFamily = "Roboto";
      this.style.fontSize = "22px";
      this.style.fontWeight = "500";
      this.style.display = "flex";
      this.style.justifyContent = "center";
      this.style.alignItems = "center";
      this.style.backgroundColor = "#FFA0EA";
      this.style.minWidth = "375px";
      this.style.minHeight = "200px";
    }
  }
);
