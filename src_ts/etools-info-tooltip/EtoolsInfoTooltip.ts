import {LitElement, html, property} from 'lit-element';
import '@polymer/iron-icons/iron-icons.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import SlTooltip from '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';

/**
 * `etools-info-tooltip`
 * Tooltip element associated with form elements (or any other element), an icon is used to trigger tooltip open.
 *
 * @polymer
 * @customElement
 * @demo demo/index.html
 */
export class EtoolsInfoTooltip extends LitElement {
  render() {
    // language=HTML
    return html`
      <style>
        [hidden] {
          display: none !important;
        }

        :host {
          --show-delay: 50;

          display: flex;
          flex-direction: row;
          align-items: center;
        }

        :host([right-aligned]) {
          justify-content: flex-end;
        }

        :host([icon-first]) {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-end;
        }

        :host([icon-first][right-aligned]) {
          justify-content: flex-start;
        }

        :host([theme='light']) {
          --sl-tooltip-background-color: var(--primary-background-color, #ffffff);
          --sl-tooltip-color: var(--primary-text-color, rgba(0, 0, 0, 0.87));
        }
        sl-tooltip[theme='light']::part(body) {
          text-align: center;
          line-height: 1.4;
          -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
          -moz-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
          border: 1px solid rgba(0, 0, 0, 0.15);
        }

        :host([form-field-align]) #tooltip-trigger {
          display: flex;
          align-self: flex-end;
          margin-bottom: 11px;
        }

        :host(:not([icon-first])) #tooltip-trigger {
          margin-inline-start: 8px;
        }

        :host([icon-first]) #tooltip-trigger {
          margin-inline-start: 0;
          margin-inline-end: 8px;
        }

        :host([important-warning]:not([hide-tooltip])) {
          color: var(--error-color, #e54f2e);
        }
        :host #tooltip-trigger:focus:not(:focus-visible) {
          outline: 0;
        }
        :host #tooltip-trigger:focus-visible {
          outline: 0;
          box-shadow: 0 0 5px 5px rgba(170, 165, 165, 0.3);
          background-color: rgba(170, 165, 165, 0.2);
        }
      </style>
      <!-- element assigned to this tooltip -->
      <slot name="field"></slot>
      <sl-tooltip
        id="tooltip"
        .trigger="${this.openOnClick ? 'click' : 'hover'}"
        theme="${this.theme}"
        ?hoist="${this.hoist}"
        .distance="${this.offset}"
        exportparts="body"
      >
        <div slot="content">
          <slot name="message"></slot>
        </div>
        <span id="tooltip-trigger" part="eit-trigger-icon" ?hidden="${this.hideTooltip}" tabindex="0">
          <iron-icon ?hidden="${this.customIcon}" .icon="${this.icon}"></iron-icon>

          <slot ?hidden="${!this.customIcon}" name="custom-icon"></slot>
        </span>
      </sl-tooltip>
    `;
  }

  @property({type: String})
  position!: string;
  @property({type: String})
  icon!: string;
  @property({type: Boolean, attribute: 'custom-icon'})
  customIcon: boolean;
  @property({type: Boolean, attribute: 'hide-tooltip'})
  hideTooltip!: boolean;
  @property({type: Boolean, attribute: 'important-warning'})
  importantWarning!: boolean;
  @property({type: String})
  theme!: string;

  /**
   * Used to align tooltip icon near a paper-input or a form input that uses paper-input-container
   */
  @property({type: Boolean})
  formFieldAlign: boolean;
  @property({type: Object})
  tooltipHandler!: any;
  @property({type: Number})
  offset: number;
  @property({type: Boolean, reflect: true, attribute: 'hoist'})
  hoist!: boolean;
  @property({type: String})
  language!: string;

  get readingOrderConvertedPosition() {
    if (this.position === 'left' && document.dir === 'rtl') {
      return 'right';
    }

    if (this.position === 'right' && document.dir === 'rtl') {
      return 'left';
    }

    return this.position;
  }

  private _openOnClick!: boolean;
  set openOnClick(val) {
    this._openOnClick = val;
    setTimeout(() => this._openOnClickChanged.bind(this, val)(), 200);
  }
  @property({type: Boolean, attribute: 'open-on-click'})
  get openOnClick() {
    return this._openOnClick;
  }

  constructor() {
    super();

    this.icon = 'info-outline';
    this.position = 'top';
    this.theme = 'dark';
    this.importantWarning = false;
    this._openOnClick = false;
    this.formFieldAlign = false;
    this.customIcon = false;
    this.offset = 5;
    this.language = window.EtoolsLanguage || 'en';
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('language-changed', this._handleLanguageChange.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this._handleLanguageChange.bind(this));
  }

  _handleLanguageChange(e) {
    this.language = e.detail.language;
  }

  _refreshStyles(importantWarning) {
    if (typeof importantWarning === 'undefined') {
      return;
    }
    this.requestUpdate();
  }

  _openOnClickChanged(openOnClick) {
    if (openOnClick) {
      this._addClickEventListeners();
    } else {
      this._removeClickEventListeners();
    }
  }

  _addClickEventListeners() {
    const target = this.shadowRoot!.querySelector('#tooltip-trigger');
    if (target) {
      target.addEventListener('focus', this._openTooltip.bind(this));
      // target.addEventListener('mouseenter', this._openTooltip.bind(this));
      target.addEventListener('blur', this._closeTooltip.bind(this));
      // target.addEventListener('mouseleave', this._closeTooltip.bind(this));
    }
  }

  _removeClickEventListeners() {
    const target = this.shadowRoot!.querySelector('#tooltip-trigger');
    if (target) {
      target.removeEventListener('focus', this._openTooltip);
      //  target.removeEventListener('mouseenter', this._openTooltip);
      target.removeEventListener('blur', this._closeTooltip);
      // target.removeEventListener('mouseleave', this._closeTooltip);
    }
  }

  _openTooltip() {
    this.shadowRoot!.querySelector<SlTooltip>('#tooltip')!.show();
  }

  _closeTooltip() {
    this.shadowRoot!.querySelector<SlTooltip>('#tooltip')!.hide();
  }
}
