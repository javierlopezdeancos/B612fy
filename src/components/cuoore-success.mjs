const customElementPrefix = "cuoore";

const attributes = {
  play: {
    name: "play",
    default: false
  },
  dimensions: {
    width: {
      name: "width",
      default: "200px"
    },
    height: {
      name: "width",
      default: "200px"
    }
  }
};

const classes = {
  default: `${customElementPrefix}-success`,
  g: `${customElementPrefix}-success__g`,
  circle: `${customElementPrefix}-success__circle`,
  path: `${customElementPrefix}-success__path`
};

const keyframes = {
  checkMark: `${customElementPrefix}-success-checkmark`,
  checkMarkCircle: `${customElementPrefix}-success-checkmark-circle`
};

class CuooreSuccess extends HTMLElement {
  constructor(...args) {
    super(...args);
    this.setShadowRoot();
    this.setAttributes();
  }

  static get observedAttributes() {
    return [
      attributes.play.name,
      attributes.dimensions.width.name,
      attributes.dimensions.height.name
    ];
  }

  setAttributes() {
    this.play =
      this.getAttribute(attributes.play.name) || attributes.play.default;
    this.width =
      this.getAttribute(attributes.dimensions.width.name) ||
      attributes.dimensions.width.default;
    this.height =
      this.getAttribute(attributes.dimensions.height.name) ||
      attributes.dimensions.height.default;
  }

  setShadowRoot() {
    this.shadow = this.attachShadow({ mode: "open" });
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
        width: ${this.width};
        height: ${this.height};
      }
      .${classes.g} {
        stroke-width: 2px;
        stroke: #8EC343;
        fill:none;
      }

      .${classes.path} {
        stroke-dasharray:17px, 17px;
        stroke-dashoffset: 0px;
        animation: ${keyframes.checkMark} 0.25s ease-in-out 0.7s backwards;
      }

      .${classes.circle} {
        stroke-dasharray:76px, 76px;
        stroke-dashoffset: 0px;
        transform:rotate(-90deg);
        transform-origin: 50% 50%;
        animation: ${keyframes.checkMarkCircle} 0.6s ease-in-out forwards;
      }

      @keyframes ${keyframes.checkMark} {
        0% {
            stroke-dashoffset: 17px;
        }
        100% {
            stroke-dashoffset: 0
        }
      }

      @keyframes ${keyframes.checkMarkCircle} {
        0% {
            stroke-dashoffset: 76px;
        }
        100% {
            stroke-dashoffset: 0px;
        }
      }
      </style>

      <svg
        class="${classes.default}"
        viewBox="-263.5 236.5 26 26">
        <g class="${classes.g}">
          <circle class="${classes.circle}" cx="-250.5" cy="249.5" r="12"/>
          <path class="${classes.path}" d="M-256.46 249.65l3.9 3.74 8.02-7.8"/>
        </g>
      </svg>
    `;
  }

  render() {
    if (!this.play) {
      return;
    }

    this.setTemplate();
    this.shadow.innerHTML = this.template;
  }
}

if (!customElements.get(`${customElementPrefix}-success`)) {
  customElements.define(`${customElementPrefix}-success`, CuooreSuccess);
}
