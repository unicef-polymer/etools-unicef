import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import '../etools-dialog/etools-dialog';
import {getTranslation} from './utils/translate.js';
import {fireEvent} from '@unicef-polymer/etools-utils/dist/fire-event.util';

@customElement('selector-confirm')
export class SelectorConfirm extends LitElement {
  render() {
    return html` <style>
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

  @property({type: String, attribute: 'language'})
  language: string = window.EtoolsLanguage || 'en';

  @property({type: String}) content = 'CONFIRM_NAVIGATE_TO_TRIP';

  @property({type: String}) confirmBtnText = 'CONTINUE';

  @property({type: String}) cancelBtnText = 'CANCEL';

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  handleLanguageChange(e: any) {
    this.language = e.detail.language;
  }

  set dialogData({content, confirmBtnText, cancelBtnText}: any) {
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

  handleDialogClosed(confirmed: boolean): void {
    fireEvent(this, 'dialog-closed', {confirmed: confirmed});
  }
}
