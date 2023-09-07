import {LitElement, html} from 'lit';
import {property, query} from 'lit/decorators.js';
import '@a11y/focus-trap/focus-trap.js';
import '../etools-loading/etools-loading';
import {DialogSpinnerMixin} from './dialog-spinner-mixin.js';
import {getTranslation} from './utils/translate.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import {SlDialog} from '@shoelace-style/shoelace';
import {setDefaultAnimation} from '@shoelace-style/shoelace/dist/utilities/animation-registry.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

/**
 * @customElement
 * @appliesMixin DialogSpinnerMixin
 * @demo demo/index.html
 */
export class EtoolsDialog extends DialogSpinnerMixin(LitElement) {
  // eslint-disable-line new-cap
  render() {
    // language=HTML
    return html`
      <style>
        :host {
          color: var(--primary-text-color, rgba(0, 0, 0, 0.87));
        }
        sl-dialog {
          --footer-spacing: 0;
        }

        sl-dialog::part(overlay) {
          background-color: rgb(0 0 0);
          opacity: 0.6;
        }

        sl-button.confirm-btn {
          --sl-color-primary-600: var(--etools-dialog-confirm-btn-bg, #ea4022);
          --sl-color-neutral-0: var(--etools-dialog-confirm-btn-text-color, #fff);
        }
        sl-button.confirm-btn.default {
          --sl-color-primary-600: var(--etools-dialog-default-btn-bg, var(--primary-color));
          --sl-color-neutral-0: var(--etools-dialog-confirm-btn-text-color, #fff);
        }

        sl-dialog .cancel-btn {
          color: var(--primary-text-color, rgba(0, 0, 0, 0.87));
        }

        sl-dialog.sm {
          --width: 450px;
        }

        sl-dialog.md {
          --width: 720px;
        }

        sl-dialog.lg {
          --width: 900px;
        }

        .buttons {
          margin-top: 16px;
          padding: 8px;
          display: flex;
          justify-content: flex-end;
        }

        sl-dialog::part(close-button) {
          color: var(--etools-dialog-contrast-text-color, #fff);
        }

        sl-dialog.default .buttons {
          border-top: 1px solid var(--divider-color);
        }

        sl-dialog.default::part(title) {
          line-height: 40px;
          font-weight: 500;
          background: var(--etools-dialog-primary-color, var(--primary-color));
          color: var(--etools-dialog-contrast-text-color, #fff);
        }

        sl-button.confirm-btn {
          margin-inline-end: 5px;
        }

        sl-dialog.default sl-button.confirm-btn {
          min-width: 90px;
          --sl-color-primary-600: var(--etools-dialog-default-btn-bg, var(--primary-color));
          --sl-color-neutral-0: var(--etools-dialog-confirm-btn-text-color, #fff);
        }

        sl-dialog.confirmation sl-button.confirm-btn {
          --sl-color-primary-600: var(--etools-dialog-confirm-btn-bg, #ea4022);
          --sl-color-primary-500: var(--etools-dialog-confirm-btn-bg, #ea4022);
          --sl-color-neutral-0: var(--etools-dialog-confirm-btn-text-color, #fff);
        }

        sl-button:not(.confirm-btn) {
          opacity: 0.85;
        }
        sl-button {
          --sl-input-height-medium: 36px;
        }

        sl-dialog.confirmation .close-btn,
        sl-dialog .cancel-btn {
          --sl-color-primary-600: var(--primary-text-color, rgba(0, 0, 0, 0.87));
          --sl-spacing-medium: 6px;
        }
        sl-button::part(label) {
          text-transform: uppercase;
        }

        sl-button.confirm-btn {
          margin-inline-start: 15px;
        }

        sl-dialog::part(header-actions) {
          background: var(--etools-dialog-primary-color, var(--primary-color));
        }

        sl-dialog.confirmation::part(header-actions) {
          padding: 15px 15px 0 15px;
        }
        sl-dialog::part(title) {
          padding: 8px 0 8px 24px;
        }
        sl-dialog.confirmation::part(title) {
          padding: 15px 15px 0 15px;
        }
        sl-dialog::part(body) {
          padding: 12px 24px 16px 24px;
        }

        :host-context([no-padding]) sl-dialog:not(.confirmation)::part(body) {
          padding: 12px 0 16px 0;
        }
        sl-dialog.confirmation {
          --footer-spacing: 25px 0 0 0;
        }

        sl-dialog.default::part(body) {
          border-top: 1px solid var(--dark-divider-color);
        }

        sl-dialog.confirmation::part(body) {
          max-width: 90%;
          font-size: 20px;
          line-height: 1.4;
          padding: 0;
          padding-inline: 15px;
          border-top: none;
          margin-top: -15px;
          margin-bottom: 10px;
          @apply --etools-dialog-confirmation-content;
        }

        :host([padded-content]) sl-dialog::part(body) {
          padding-inline-start: 24px;
          padding-inline-end: 24px;
        }

        .relative {
          position: relative;
        }

        etools-loading {
          margin-top: 0px;
        }

        #dialogContent {
          height: 100%;
        }

        sl-dialog::part(header-actions) {
          border-radius: 0 0.25rem 0 0;
        }

        sl-dialog::part(title) {
          border-radius: 0.25rem 0 0 0;
        }

        @media screen and (max-width: 930px) {
          sl-dialog.lg {
            width: calc(100vw - 30px);
          }
        }

        @media screen and (max-width: 767px) {
          sl-dialog.md {
            width: calc(100vw - 30px);
          }
        }

        @media screen and (max-width: 480px) {
          sl-dialog.sm {
            width: calc(100vw - 30px);
          }
        }
      </style>
      <focus-trap>
        <sl-dialog
          id="dialog"
          class="${this.getDialogClass(this.size, this.theme)}"
          .label="${this.dialogTitle}"
          exportparts="panel,body,title,footer"
        >
          <etools-loading id="etoolsLoading" loading-text="${this.spinnerText}" ?active="${this.showSpinner}">
          </etools-loading>
          <slot></slot>
          <div id="dynamicContent"></div>
          <slot slot="footer" id="buttons" name="buttons"> ${this.getButtonsHTML()} </slot>
        </sl-dialog>
      </focus-trap>
    `;
  }

  static get is() {
    return 'etools-dialog';
  }

  @property({type: String, attribute: 'dialog-title'})
  dialogTitle!: string;
  @property({type: String, attribute: 'ok-btn-text'})
  okBtnText!: string;
  @property({type: String, attribute: 'cancel-btn-text'})
  cancelBtnText!: string;
  @property({type: String})
  size!: string;

  private _opened!: boolean;
  @property({type: Boolean, reflect: true})
  get opened() {
    return this._opened;
  }
  set opened(val: boolean) {
    this._opened = val;
    if (this.slDialog) {
      // Opening the dialog using show(), hide()
      // and not binding directly to ?open in order to activate animation=ease in & out
      if (val) {
        this.slDialog!.show();
      } else if (val != undefined) {
        this.slDialog!.hide();
      }
    }
  }
  @property({type: Boolean})
  backdrop!: boolean;
  @property({type: Boolean})
  modal!: boolean;
  @property({type: Boolean, attribute: 'no-padding', reflect: true})
  noPadding!: boolean;
  @property({type: Boolean, attribute: 'disable-confirm-btn', reflect: true})
  disableConfirmBtn!: boolean;
  @property({type: Boolean, attribute: 'disable-dismiss-btn', reflect: true})
  disableDismissBtn!: boolean;
  @property({type: Boolean, attribute: 'hide-confirm-btn', reflect: true})
  hideConfirmBtn!: boolean;
  @property({type: String, reflect: true})
  theme!: string;
  @property({type: Boolean, attribute: 'no-auto-focus', reflect: true})
  noAutoFocus!: boolean;
  @property({type: Boolean, attribute: 'show-buttons', reflect: true})
  showButtons!: boolean;
  @property({type: String})
  language!: string;
  @query('#dialog')
  slDialog!: SlDialog;

  constructor() {
    super();
    this.initializeProperties();
  }

  initializeProperties() {
    this.dialogTitle = '';
    this.okBtnText = getTranslation(this.language, 'OK');
    this.cancelBtnText = getTranslation(this.language, 'CANCEL');
    this.size = 'sm';
    this.opened = false;
    this.backdrop = true;
    this.modal = true;
    this.noPadding = false;
    this.disableConfirmBtn = false;
    this.disableDismissBtn = false;
    this.hideConfirmBtn = false;
    this.theme = 'default';
    this.noAutoFocus = false;
    this.showButtons = true;
  }

  protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.firstUpdated(_changedProperties);
    if (this.opened) {
      this.slDialog!.show();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    setDefaultAnimation('dialog.overlay.show', {
      keyframes: [{opacity: 0}, {opacity: 0.6}],
      options: {duration: 250}
    });
    setDefaultAnimation('dialog.overlay.hide', {
      keyframes: [{opacity: 0.6}, {opacity: 0}],
      options: {duration: 250}
    });
    document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
    this.addEventListener('sl-request-close', (event: any) => {
      if (event.detail.source === 'overlay') {
        event.preventDefault();
      }
    });

    this.addEventListener('sl-after-hide', (event: any) => {
      if (event.target === event.currentTarget) {
        this.dispatchEvent(
          new CustomEvent('close', {
            detail: {confirmed: false},
            bubbles: true,
            composed: true
          })
        );
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  handleLanguageChange(e: any) {
    this.language = e.detail.language;
  }

  getButtonsHTML() {
    return this.showButtons
      ? html` <div class="buttons" part="ed-button-styles" slot="footer">
          <sl-button
            variant="text"
            @click="${this._cancelBtClicked}"
            class="cancel-btn"
            ?disabled="${this.disableDismissBtn}"
          >
            ${this.cancelBtnText}
          </sl-button>
          <sl-button
            variant="primary"
            @click="${this._confirmBtClicked}"
            ?disabled="${this.disableConfirmBtn}"
            ?hidden="${this.hideConfirmBtn}"
            class="confirm-btn"
          >
            ${this.okBtnText}
          </sl-button>
        </div>`
      : html``;
  }

  _cancelBtClicked() {
    this.opened = false;
    this.dispatchEvent(
      new CustomEvent('close', {
        detail: {confirmed: false},
        bubbles: true,
        composed: true
      })
    );
  }

  getDialogClass(size: string, theme: string) {
    return size + ' ' + theme;
  }

  getDialog() {
    return this.shadowRoot?.querySelector('#dialog');
  }

  scrollDown() {
    setTimeout(() => {
      const d = this.getDialog();
      if (d) {
        const scrollableContent = d.shadowRoot?.querySelector('slot[part="body"]');
        if (scrollableContent) {
          scrollableContent.scrollTop = scrollableContent.scrollHeight;
        }
      }
    }, 100);
  }
}
