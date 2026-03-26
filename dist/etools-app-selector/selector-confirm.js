import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../etools-dialog/etools-dialog';
import { getTranslation } from './utils/translate.js';
import { fireEvent } from '@unicef-polymer/etools-utils/dist/fire-event.util';
let SelectorConfirm = class SelectorConfirm extends LitElement {
    constructor() {
        super(...arguments);
        this.language = window.EtoolsLanguage || 'en';
        this.content = 'CONFIRM_NAVIGATE_TO_TRIP';
        this.confirmBtnText = 'CONTINUE';
        this.cancelBtnText = 'CANCEL';
    }
    render() {
        return html ` <style>
        .content {
          margin-top: 16px;
          padding-inline-start: 24px;
        }
      </style>
      <etools-dialog
        id="selectorConfirmDialog"
        size="md"
        no-padding
        keep-dialog-open
        theme="confirmation"
        confirmBtnVariant="danger"
        .okBtnText="${getTranslation(this.language, this.confirmBtnText)}"
        cancel-btn-text=${getTranslation(this.language, this.cancelBtnText)}
        @close="${() => this.handleDialogClosed(false)}"
        @confirm-btn-clicked="${() => this.handleDialogClosed(true)}"
      >
        <div class="content">${getTranslation(this.language, this.content)}</div>
      </etools-dialog>`;
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
    }
    handleLanguageChange(e) {
        this.language = e.detail.language;
    }
    set dialogData({ content, confirmBtnText, cancelBtnText }) {
        if (content) {
            this.content = typeof content === 'string' ? unsafeHTML(content) : content;
        }
        if (confirmBtnText) {
            this.confirmBtnText = confirmBtnText;
        }
        if (cancelBtnText) {
            this.cancelBtnText = cancelBtnText;
        }
    }
    handleDialogClosed(confirmed) {
        fireEvent(this, 'dialog-closed', { confirmed: confirmed });
    }
};
__decorate([
    property({ type: String, attribute: 'language' })
], SelectorConfirm.prototype, "language", void 0);
__decorate([
    property({ type: String })
], SelectorConfirm.prototype, "content", void 0);
__decorate([
    property({ type: String })
], SelectorConfirm.prototype, "confirmBtnText", void 0);
__decorate([
    property({ type: String })
], SelectorConfirm.prototype, "cancelBtnText", void 0);
SelectorConfirm = __decorate([
    customElement('selector-confirm')
], SelectorConfirm);
export { SelectorConfirm };
