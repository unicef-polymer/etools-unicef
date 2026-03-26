import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
// TODO remove this
let EtoolsRadio = class EtoolsRadio extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'medium';
    }
    render() {
        // language=HTML
        return html `
      <style>
        sl-radio {
          display: inline-block;
          margin-inline-end: 15px;
        }
      </style>
      <sl-radio
        part="sl-radio"
        value="${ifDefined(this.value)}"
        size="${ifDefined(this.size)}"
        ?disabled=${ifDefined(this.disabled)}
      >
        <slot></slot>
      </sl-radio>
    `;
    }
    createRenderRoot() {
        // @ts-ignore
        return this.renderOptions.host.parentNode.querySelector('sl-radio-group');
    }
};
__decorate([
    property({ type: String })
], EtoolsRadio.prototype, "value", void 0);
__decorate([
    property({ type: String })
], EtoolsRadio.prototype, "size", void 0);
__decorate([
    property({ type: String })
], EtoolsRadio.prototype, "form", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], EtoolsRadio.prototype, "disabled", void 0);
EtoolsRadio = __decorate([
    customElement('etools-radio')
], EtoolsRadio);
export { EtoolsRadio };
