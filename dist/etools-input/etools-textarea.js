import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, query, property, state } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import { ShoelaceCustomizations } from './styles/shoelace-customizations';
import { fireEvent } from '@unicef-polymer/etools-utils/dist/fire-event.util';
import '../etools-info-tooltip/info-icon-tooltip';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { getTranslation } from './utils/translate';
let EtoolsTextarea = class EtoolsTextarea extends LitElement {
    static get styles() {
        return [
            ShoelaceCustomizations,
            css `
        :host {
          width: 100%;
        }

        .spacing {
          padding-top: var(--etools-input-padding-top, 8px);
          padding-bottom: var(--etools-input-padding-bottom, 8px);
        }

        info-icon-tooltip {
          --iit-icon-size: 18px;
          --iit-margin: 0 0 4px 4px;
        }

        .etools-label {
          font-size: var(--etools-font-size-12, 12px);
          color: var(--sl-input-label-color);
          padding-top: 8px;
        }

        .char-counter {
          color: var(--primary-text-color);
          font-size: var(--etools-font-size-12, 12px);
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
        resize="${this.resize}"
        placeholder="${this.placeholder ? this.placeholder : ''}"
        ?invalid="${this.invalid}"
        ?required="${this.required}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?always-float-label="${this.alwaysFloatLabel}"
        rows="${ifDefined(this.rows)}"
        maxlength="${ifDefined(this.maxlength)}"
        .value="${this.value == undefined || this.value == null ? '' : this.value}"
        @keydown="${() => {
            if (this.autoValidate) {
                this._autoValidate = true;
            }
        }}"
        @sl-invalid="${(e) => e.preventDefault()}"
        @sl-input="${(event) => {
            const val = event.target.value ? event.target.value : '';
            this.value = val;
            fireEvent(this, 'value-changed', { value: val });
            this.charCount = val.length;
        }}"
        @sl-focus=${() => (this.focused = true)}
        @sl-blur=${() => (this.focused = false)}
        exportparts="textarea,base,form-control,form-control-input,form-control-label,form-control-help-text"
      >
        <div slot="help-text">
          <div class="err-msg">${this.errorMessage}</div>
          <div class="char-counter" ?hidden="${!this.charCounter}">${this.charCount}/${this.maxlength}</div>
        </div>
      </sl-textarea>
    `;
    }
    constructor() {
        super();
        this.value = null;
        this.language = '';
        this.charCount = 0;
        this.rows = 1;
        this.resize = 'auto';
        this.invalid = false;
        this.alwaysFloatLabel = false;
        this.autoValidate = false;
        this._autoValidate = false;
        this.focused = false;
        if (!this.language) {
            this.language = window.EtoolsLanguage || 'en';
        }
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        this.updateComplete.then(() => {
            this.setMaxHeight();
        });
        document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
        this.errorMessage = getTranslation(this.language, 'THIS_FIELD_IS_REQUIRED');
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
    }
    handleLanguageChange(e) {
        this.language = e.detail.language;
        this.errorMessage = getTranslation(this.language, 'THIS_FIELD_IS_REQUIRED');
    }
    getInfoIconTemplate() {
        if (!this.infoIconMessage) {
            return html ``;
        }
        return html `
      <label
        class=${classMap({
            'etools-label': true,
            focused: this.focused
        })}
        for="sl-textarea"
        >${this.label}</label
      >
      <info-icon-tooltip
        id="iit-context"
        ?hidden="${this.readonly}"
        .tooltipText="${this.infoIconMessage}"
      ></info-icon-tooltip>
    `;
    }
    updated(_changedProperties) {
        if (_changedProperties.has('value') && this.value !== undefined) {
            this.charCount = this.value ? this.value.length : 0;
            if (this._autoValidate) {
                setTimeout(() => this.validate());
            }
        }
        if (_changedProperties.has('maxRows')) {
            this.setMaxHeight();
        }
    }
    setMaxHeight() {
        var _a, _b;
        if (this.maxRows) {
            const textarea = (_b = (_a = this.slTextarea) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('textarea');
            if (textarea) {
                const computedStyle = window.getComputedStyle(textarea, null) || {};
                const lineHeight = computedStyle.lineHeight || '';
                const lineHeightPx = parseInt(lineHeight, 10);
                if (lineHeightPx) {
                    const maxHeight = this.maxRows * lineHeightPx + 5;
                    textarea.style.maxHeight = `${maxHeight}px`;
                    textarea.style.overflowY = 'auto';
                }
            }
        }
    }
    validate() {
        this.invalid = !this.slTextarea.reportValidity();
        return !this.invalid;
    }
    focus() {
        this.shadowRoot.querySelector('sl-textarea').focus();
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
], EtoolsTextarea.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], EtoolsTextarea.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], EtoolsTextarea.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], EtoolsTextarea.prototype, "disabled", void 0);
__decorate([
    property({ type: String, attribute: 'language' })
], EtoolsTextarea.prototype, "language", void 0);
__decorate([
    property({ type: String, attribute: 'error-message', reflect: true })
], EtoolsTextarea.prototype, "errorMessage", void 0);
__decorate([
    property({ type: String })
], EtoolsTextarea.prototype, "infoIconMessage", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'char-counter' })
], EtoolsTextarea.prototype, "charCounter", void 0);
__decorate([
    property({ type: Number })
], EtoolsTextarea.prototype, "charCount", void 0);
__decorate([
    property({ type: Number })
], EtoolsTextarea.prototype, "rows", void 0);
__decorate([
    property({ type: Number, reflect: true, attribute: 'max-rows' })
], EtoolsTextarea.prototype, "maxRows", void 0);
__decorate([
    property({ type: Number })
], EtoolsTextarea.prototype, "maxlength", void 0);
__decorate([
    property({ type: String })
], EtoolsTextarea.prototype, "resize", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'invalid' })
], EtoolsTextarea.prototype, "invalid", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'always-float-label' })
], EtoolsTextarea.prototype, "alwaysFloatLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'auto-validate' })
], EtoolsTextarea.prototype, "autoValidate", void 0);
__decorate([
    state()
], EtoolsTextarea.prototype, "_autoValidate", void 0);
__decorate([
    query('sl-textarea')
], EtoolsTextarea.prototype, "slTextarea", void 0);
__decorate([
    state()
], EtoolsTextarea.prototype, "focused", void 0);
EtoolsTextarea = __decorate([
    customElement('etools-textarea')
], EtoolsTextarea);
export { EtoolsTextarea };
