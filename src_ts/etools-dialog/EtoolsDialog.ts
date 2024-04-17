import {LitElement, html} from 'lit';
import {property, query} from 'lit/decorators.js';
import '@a11y/focus-trap/focus-trap.js';
import '../etools-loading/etools-loading';
import '../etools-button/etools-button';
import {DialogSpinnerMixin} from './dialog-spinner-mixin.js';
import {getTranslation} from './utils/translate.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.component.js';
import {setDefaultAnimation} from '@shoelace-style/shoelace/dist/utilities/animation-registry.js';
import '../etools-button/etools-button';

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
          flex-wrap: wrap;
        }

        .buttons etools-button {
          position: initial;
        }

        sl-dialog::part(close-button) {
          color: var(--sl-color-neutral-800, #000000);
          font-size: var(--etools-font-size-18, 18px);
        }

        sl-dialog::part(close-button__base):hover {
          color: var(--sl-color-neutral-500, #000000);
        }

        sl-dialog.default .buttons {
          border-top: 1px solid var(--divider-color);
        }

        sl-dialog.default::part(header) {
          min-height: 40px;
          padding: 8px 0;
          align-items: center;
        }

        sl-dialog.default::part(title) {
          font-weight: 500;
          font-size: var(--etools-font-size-20, 20px);
          line-height: 1.2;
          background: var(--etools-dialog-primary-color, var(--primary-color));
          color: var(--etools-dialog-contrast-text-color, #fff);
        }

        etools-button.confirm-btn {
          margin-inline-end: 5px;
        }
        etools-button[hidden] {
          display: none;
        }

        etools-button {
          --sl-input-height-medium: 36px;
        }

        sl-dialog::part(header-actions) {
          background: var(--etools-dialog-primary-color, var(--primary-color));
        }

        sl-dialog.confirmation::part(header-actions) {
          padding: 15px 15px 0 15px;
        }
        sl-dialog::part(title) {
          padding: 8px 24px;
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

        sl-dialog.default::part(footer) {
          border-top: 1px solid var(--light-divider-color);
        }

        sl-dialog.confirmation etools-button.confirm-btn::part(base) {
          background-color: var(--etools-dialog-confirm-btn-bg, #ea4022);
          color: var(--etools-dialog-confirm-btn-text-color, #fff);
        }

        sl-dialog.confirmation::part(body) {
          max-width: 100%;
          font-size: var(--etools-font-size-20, 20px);
          line-height: 1.4;
          padding: 0;
          padding-inline: 15px;
          border-top: none;
          margin-top: -15px;
          margin-bottom: 10px;
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

        sl-dialog::part(base) {
          align-items: start !important;
          padding-top: 80px !important;
        }

        [hidden] {
          display: none;
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
          sl-dialog.default::part(title) {
            font-size: var(--etools-font-size-16, 16px);
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
          exportparts="panel,body,header,title,footer,close-button,header-actions"
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
  dialogTitle = '';
  @property({type: String, attribute: 'ok-btn-text'})
  okBtnText!: string;
  @property({type: String, attribute: 'cancel-btn-text'})
  cancelBtnText!: string;
  @property({type: String})
  size = 'sm';

  private _opened = false;
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

      this.triggerPopupOpenEvent(this._opened);
    }
  }
  @property({type: Boolean})
  backdrop = true;
  @property({type: Boolean})
  modal = true;
  @property({type: Boolean, attribute: 'no-padding', reflect: true})
  noPadding = false;
  @property({type: Boolean, attribute: 'disable-confirm-btn', reflect: true})
  disableConfirmBtn = false;
  @property({type: Boolean, attribute: 'disable-dismiss-btn', reflect: true})
  disableDismissBtn = false;
  @property({type: Boolean, attribute: 'hide-confirm-btn', reflect: true})
  hideConfirmBtn = false;
  @property({type: String, reflect: true})
  theme = 'default';
  @property({type: String})
  confirmBtnVariant = 'primary';
  @property({type: Boolean, attribute: 'no-auto-focus', reflect: true})
  noAutoFocus = false;
  @property({type: Boolean, attribute: 'show-buttons', reflect: true})
  showButtons = true;
  @property({type: String})
  language!: string;
  @query('#dialog')
  slDialog!: SlDialog;

  constructor() {
    super();
    this.initializeProperties();
  }

  initializeProperties() {
    this.okBtnText = getTranslation(this.language, 'OK');
    this.cancelBtnText = getTranslation(this.language, 'CANCEL');
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
          <etools-button
            variant="text"
            @click="${this._cancelBtClicked}"
            class="neutral"
            ?disabled="${this.disableDismissBtn}"
          >
            ${this.cancelBtnText}
          </etools-button>
          <etools-button
            .variant="${this.confirmBtnVariant}"
            @click="${this._confirmBtClicked}"
            ?disabled="${this.disableConfirmBtn}"
            ?hidden="${this.hideConfirmBtn}"
            class="confirm-btn"
          >
            ${this.okBtnText}
          </etools-button>
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

  /**
   * Trigger popup open event
   * @param boolean - If dialog is opened or closed
   */
  private triggerPopupOpenEvent(opened: boolean) {
    if (opened) {
      this.dispatchEvent(
        new CustomEvent('etools-dialog-opened', {
          detail: {value: opened},
          bubbles: true,
          composed: true
        })
      );
    }

    if (!opened) {
      this.dispatchEvent(
        new CustomEvent('etools-dialog-closed', {
          detail: {value: opened},
          bubbles: true,
          composed: true
        })
      );
    }
  }
}
