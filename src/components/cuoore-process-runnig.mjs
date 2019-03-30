const customElementPrefix = "cuoore";

const attributes = {
  process: {
    name: "process",
    default: false
  },
  fontSize: {
    name: "font-size",
    default: "40px"
  }
};

const classes = {
  default: `${customElementPrefix}-process-running`
};

class CuooreProcessRunning extends HTMLElement {
  constructor(...args) {
    super(...args);
    this.setShadowRoot();
    this.setAttributes();
  }

  static get observedAttributes() {
    return [attributes.process.name, attributes.fontSize.name];
  }

  hide() {
    this.style.display = "none";
  }

  setShadowRoot() {
    this.shadow = this.attachShadow({ mode: "open" });
  }

  setAttributes() {
    this.process =
      this.getAttribute(attributes.process.name) || attributes.process.default;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal;
    this.render();
  }

  setTemplate() {
    this.template = `
      <style>
        .${classes.default} {
          font-size: 40px;
          display: block;
        }
      </style>

      <p class="${classes.default}">
        ${this.process}
      </p>
    `;
  }

  render() {
    if (!this.process) {
      this.hide();
    }

    this.setTemplate();
    this.shadow.innerHTML = this.template;
  }
}

if (!customElements.get(`${customElementPrefix}-process-running`)) {
  customElements.define(
    `${customElementPrefix}-process-running`,
    CuooreProcessRunning
  );
}
