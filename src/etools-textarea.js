var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, customElement, html, property, query } from 'lit-element';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import { ShoelaceCustomizations } from './styles/shoelace-customizations';
import { fireEvent } from '@unicef-polymer/etools-utils/dist/fire-event.util';
import '@unicef-polymer/etools-info-tooltip/info-icon-tooltip';
import { detailsTextareaRowsCount } from './utils/utils';
let EtoolsTextarea = class EtoolsTextarea extends LitElement {
    constructor() {
        super(...arguments);
        this.charCount = 0;
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        this.charCount = this._value ? this._value.length : 0;
    }
    static get styles() {
        return [
            ShoelaceCustomizations,
            css `
        .spacing {
          padding-top: 8px;
        }
        info-icon-tooltip {
          --iit-icon-size: 18px;
          --iit-margin: 0 0 4px 4px;
        }

        .paper-label {
          font-size: 12px;
          color: var(--secondary-text-color);
          padding-top: 8px;
        }

        .char-counter {
          color: var(--primary-text-color);
          font-size: 12px;
        }
      `
        ];
    }
    render() {
        return html `
      ${this.getInfoIconTemplate()}
      <sl-textarea
        id="sl-textarea"
        class="spacing"
        autocomplete="off"
        size="small"
        .label="${this.infoIconMessage ? '' : this.label}"
        .pattern="${this.pattern}"
        resize="auto"
        placeholder="${this.placeholder}"
        ?required="${this.required}"
        ?readonly="${this.readonly}"
        ?showCharCounter="${this.showCharCounter}"
        rows="${detailsTextareaRowsCount(!this.readonly)}"
        maxlength="${this.maxlength}"
        .value="${this.value ? this.value : ''}"
        @sl-invalid="${(e) => e.preventDefault()}"
        @sl-input="${(event) => {
            const val = event.target.value ? event.target.value : '';
            fireEvent(this, 'value-changed', { value: val });
            this.charCount = val.length;
        }}"
      >
        <div slot="help-text" style="display: flex; justify-content: space-between;">
          <div class="err-msg">${this.errorMessage}</div>
          <div class="char-counter">${this.charCount}/${this.maxlength}</div>
        </div>
      </sl-textarea>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
    }
    getInfoIconTemplate() {
        if (!this.infoIconMessage) {
            return html ``;
        }
        return html `
      <label class="paper-label" for="sl-textarea">${this.label}</label>
      <info-icon-tooltip
        id="iit-context"
        ?hidden="${this.readonly}"
        .tooltipText="${this.infoIconMessage}"
      ></info-icon-tooltip>
    `;
    }
    validate() {
        return this.slTextarea.reportValidity();
    }
};
__decorate([
    property({ type: String })
], EtoolsTextarea.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], EtoolsTextarea.prototype, "pattern", void 0);
__decorate([
    property({ type: String, reflect: true })
], EtoolsTextarea.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], EtoolsTextarea.prototype, "value", null);
__decorate([
    property({ type: Boolean })
], EtoolsTextarea.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], EtoolsTextarea.prototype, "readonly", void 0);
__decorate([
    property({ type: String, attribute: 'error-message', reflect: true })
], EtoolsTextarea.prototype, "errorMessage", void 0);
__decorate([
    property({ type: String })
], EtoolsTextarea.prototype, "infoIconMessage", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], EtoolsTextarea.prototype, "showCharCounter", void 0);
__decorate([
    property({ type: Number })
], EtoolsTextarea.prototype, "charCount", void 0);
__decorate([
    property({ type: Number })
], EtoolsTextarea.prototype, "maxlength", void 0);
__decorate([
    query('sl-textarea')
], EtoolsTextarea.prototype, "slTextarea", void 0);
EtoolsTextarea = __decorate([
    customElement('etools-textarea')
], EtoolsTextarea);
export { EtoolsTextarea };
