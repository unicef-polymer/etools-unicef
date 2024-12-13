import {getTranslation} from './utils/translate';
import {property} from 'lit/decorators.js';
import {Constructor} from '../utils/types';

export function CommonMixin<T extends Constructor<any>>(baseClass: T) {
  class CommonClass extends baseClass {
    @property({type: Boolean, reflect: true, attribute: 'upload-in-progress'})
    uploadInProgress = false;
    @property({type: String, reflect: true})
    label = '';
    @property({type: Boolean, reflect: true})
    required = false;
    @property({type: Boolean, reflect: true})
    readonly = false;
    @property({type: String})
    accept = '';
    @property({type: Boolean, reflect: true, attribute: 'auto-upload'})
    autoUpload = true;
    @property({type: Boolean, reflect: true})
    disabled = false;
    @property({type: Boolean, attribute: 'invalid', reflect: true})
    _invalid = false;
    @property({type: Boolean, reflect: true, attribute: 'auto-validate'})
    autoValidate = false;
    @property({type: String, reflect: true, attribute: 'error-message'})
    errorMessage = '';
    @property({type: Boolean, reflect: true, attribute: 'open-in-new-tab'})
    openInNewTab = true;

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
      this.autoUpload = true;
      this.disabled = false;
      this._invalid = false;
      this.autoValidate = false;
      this.errorMessage = '';
      this.openInNewTab = true;
    }

    // abstract method

    _invalidChanged() {}

    _showLabel(label) {
      return label !== '';
    }

    _openFileChooser() {
      const fileEl = this.shadowRoot.querySelector('#fileInput');
      if (fileEl) {
        fileEl.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      }
    }

    fireEvent(evName: string, detail?: any) {
      this.dispatchEvent(
        new CustomEvent(evName, {
          detail: detail,
          bubbles: true,
          composed: true
        })
      );
    }

    downloadFile(filename, url, openInNewTab) {
      const a = document.createElement('a');
      a.href = url;
      if (openInNewTab) {
        a.target = '_blank';
      }
      a.download = filename;
      a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
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
  return CommonClass;
}
