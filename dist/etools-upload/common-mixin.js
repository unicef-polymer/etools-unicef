import { __decorate } from "tslib";
import { getTranslation } from './utils/translate';
import { property } from 'lit/decorators.js';
export function CommonMixin(baseClass) {
    class CommonClass extends baseClass {
        set invalid(invalid) {
            const old = this._invalid;
            this._invalid = invalid;
            if (this._invalid !== old) {
                this._invalidChanged();
            }
            this.requestUpdate();
        }
        get invalid() {
            return this._invalid;
        }
        constructor(...args) {
            super(...args);
            this.uploadInProgress = false;
            this.label = '';
            this.required = false;
            this.readonly = false;
            this.accept = '';
            this.autoUpload = true;
            this.disabled = false;
            this._invalid = false;
            this.autoValidate = false;
            this.errorMessage = '';
            this.openInNewTab = true;
            this.uploadInProgress = false;
            this.label = '';
            this.required = false;
            this.readonly = false;
            this.autoUpload = true;
            this.disabled = false;
            this._invalid = false;
            this.autoValidate = false;
            this.errorMessage = '';
            this.openInNewTab = true;
        }
        // abstract method
        _invalidChanged() { }
        _showLabel(label) {
            return label !== '';
        }
        _openFileChooser() {
            const fileEl = this.shadowRoot.querySelector('#fileInput');
            if (fileEl) {
                fileEl.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            }
        }
        fireEvent(evName, detail) {
            this.dispatchEvent(new CustomEvent(evName, {
                detail: detail,
                bubbles: true,
                composed: true
            }));
        }
        downloadFile(filename, url, openInNewTab) {
            const a = document.createElement('a');
            a.href = url;
            if (openInNewTab) {
                a.target = '_blank';
            }
            a.download = filename;
            a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            window.URL.revokeObjectURL(url);
        }
        prepareErrorMessage(lang, error) {
            const message = (error.request ? error.error.message : error.message) || '';
            if (message.includes('413')) {
                return getTranslation(lang, 'FILE_TOO_LARGE');
            }
            return message;
        }
    }
    __decorate([
        property({ type: Boolean, reflect: true, attribute: 'upload-in-progress' })
    ], CommonClass.prototype, "uploadInProgress", void 0);
    __decorate([
        property({ type: String, reflect: true })
    ], CommonClass.prototype, "label", void 0);
    __decorate([
        property({ type: Boolean, reflect: true })
    ], CommonClass.prototype, "required", void 0);
    __decorate([
        property({ type: Boolean, reflect: true })
    ], CommonClass.prototype, "readonly", void 0);
    __decorate([
        property({ type: String })
    ], CommonClass.prototype, "accept", void 0);
    __decorate([
        property({ type: Boolean, reflect: true, attribute: 'auto-upload' })
    ], CommonClass.prototype, "autoUpload", void 0);
    __decorate([
        property({ type: Boolean, reflect: true })
    ], CommonClass.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean, attribute: 'invalid', reflect: true })
    ], CommonClass.prototype, "_invalid", void 0);
    __decorate([
        property({ type: Boolean, reflect: true, attribute: 'auto-validate' })
    ], CommonClass.prototype, "autoValidate", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: 'error-message' })
    ], CommonClass.prototype, "errorMessage", void 0);
    __decorate([
        property({ type: Boolean, reflect: true, attribute: 'open-in-new-tab' })
    ], CommonClass.prototype, "openInNewTab", void 0);
    return CommonClass;
}
