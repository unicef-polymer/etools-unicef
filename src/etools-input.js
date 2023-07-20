var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, customElement, html, property, query } from 'lit-element';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { ShoelaceCustomizations } from './styles/shoelace-customizations';
import { fireEvent } from '@unicef-polymer/etools-utils/dist/fire-event.util';
let EtoolsInput = class EtoolsInput extends LitElement {
    static get styles() {
        return [
            ShoelaceCustomizations,
            css `
        .spacing {
          padding-top: var(--etools-input-padding-top, 8px);
        }
      `
        ];
    }
    render() {
        return html `
      <sl-input
        id="sl-input"
        class="spacing"
        autocomplete="off"
        size="small"
        .label="${this.label}"
        .pattern="${this.pattern}"
        placeholder="${this.placeholder}"
        ?required="${this.required}"
        ?readonly="${this.readonly}"
        .value="${this.value ? this.value : ''}"
        @sl-invalid="${(e) => e.preventDefault()}"
        @sl-input="${(event) => fireEvent(this, 'value-changed', {
            detail: { value: event.target.value }
        })}"
        exportparts="base,input"
      >
        <div slot="help-text">
          <div class="err-msg">${this.errorMessage}</div>
        </div>
      </sl-input>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
    }
    validate() {
        return this.slInput.reportValidity();
    }
};
__decorate([
    property({ type: String })
], EtoolsInput.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], EtoolsInput.prototype, "pattern", void 0);
__decorate([
    property({ type: String, reflect: true })
], EtoolsInput.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], EtoolsInput.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], EtoolsInput.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], EtoolsInput.prototype, "readonly", void 0);
__decorate([
    property({ type: String, attribute: 'error-message', reflect: true })
], EtoolsInput.prototype, "errorMessage", void 0);
__decorate([
    query('sl-input')
], EtoolsInput.prototype, "slInput", void 0);
EtoolsInput = __decorate([
    customElement('etools-input')
], EtoolsInput);
export { EtoolsInput };
