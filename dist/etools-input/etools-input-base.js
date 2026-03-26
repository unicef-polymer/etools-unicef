import { __decorate } from "tslib";
import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { getTranslation } from './utils/translate';
export class EtoolsInputBase extends LitElement {
    constructor() {
        super();
        this.requiredPlaceholder = false;
        this.noLabelFloat = false;
        this.value = null;
        this.disabled = false;
        this.required = false;
        this.readonly = false;
        this.language = '';
        this.autoValidate = false;
        this._autoValidate = false;
        this.invalid = false;
        this.alwaysFloatLabel = false;
        this.type = 'text';
        this.noSpinButtons = false;
        this.passwordToggle = false;
        this.passwordVisible = false;
        this.clearable = false;
        this.charCount = 0;
        this.autocapitalize = 'off';
        this.autocorrect = 'off';
        this.wrapTextInReadonly = true;
        if (!this.language) {
            this.language = window.EtoolsLanguage || 'en';
        }
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
        if (!this.errorMessage) {
            this.errorMessage = getTranslation(this.language, 'THIS_FIELD_IS_REQUIRED');
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
    }
    handleLanguageChange(e) {
        this.language = e.detail.language;
        this.errorMessage = getTranslation(this.language, 'THIS_FIELD_IS_REQUIRED');
    }
}
__decorate([
    property({ type: String })
], EtoolsInputBase.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'placeholder' })
], EtoolsInputBase.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'required-placeholder' })
], EtoolsInputBase.prototype, "requiredPlaceholder", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'no-label-float' })
], EtoolsInputBase.prototype, "noLabelFloat", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'pattern' })
], EtoolsInputBase.prototype, "pattern", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'allowed-pattern' })
], EtoolsInputBase.prototype, "allowedPattern", void 0);
__decorate([
    property({ type: String })
], EtoolsInputBase.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'disabled' })
], EtoolsInputBase.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'required' })
], EtoolsInputBase.prototype, "required", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'readonly' })
], EtoolsInputBase.prototype, "readonly", void 0);
__decorate([
    property({ type: String, attribute: 'language' })
], EtoolsInputBase.prototype, "language", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'error-message' })
], EtoolsInputBase.prototype, "errorMessage", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'auto-validate' })
], EtoolsInputBase.prototype, "autoValidate", void 0);
__decorate([
    state()
], EtoolsInputBase.prototype, "_autoValidate", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'invalid' })
], EtoolsInputBase.prototype, "invalid", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'always-float-label' })
], EtoolsInputBase.prototype, "alwaysFloatLabel", void 0);
__decorate([
    property({ type: Number, attribute: 'min' })
], EtoolsInputBase.prototype, "min", void 0);
__decorate([
    property({ type: Number, attribute: 'max' })
], EtoolsInputBase.prototype, "max", void 0);
__decorate([
    property({ type: Number, attribute: 'step' })
], EtoolsInputBase.prototype, "step", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'type' })
], EtoolsInputBase.prototype, "type", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'no-spin-buttons' })
], EtoolsInputBase.prototype, "noSpinButtons", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'password-toggle' })
], EtoolsInputBase.prototype, "passwordToggle", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'password-visible' })
], EtoolsInputBase.prototype, "passwordVisible", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'clearable' })
], EtoolsInputBase.prototype, "clearable", void 0);
__decorate([
    property({ type: Number, reflect: true, attribute: 'minlength' })
], EtoolsInputBase.prototype, "minlength", void 0);
__decorate([
    property({ type: Number, reflect: true, attribute: 'maxlength' })
], EtoolsInputBase.prototype, "maxlength", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'char-counter' })
], EtoolsInputBase.prototype, "charCounter", void 0);
__decorate([
    property({ type: Number })
], EtoolsInputBase.prototype, "charCount", void 0);
__decorate([
    property({ type: String, attribute: 'autocapitalize' })
], EtoolsInputBase.prototype, "autocapitalize", void 0);
__decorate([
    property({ type: String, attribute: 'autocorrect' })
], EtoolsInputBase.prototype, "autocorrect", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'wrap-text-in-readonly' })
], EtoolsInputBase.prototype, "wrapTextInReadonly", void 0);
