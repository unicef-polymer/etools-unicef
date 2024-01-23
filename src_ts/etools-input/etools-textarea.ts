import {css, html, LitElement} from 'lit';
import {customElement, query, property, state} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import {ShoelaceCustomizations} from './styles/shoelace-customizations';
import {fireEvent} from '@unicef-polymer/etools-utils/dist/fire-event.util';
import SlTextarea from '@shoelace-style/shoelace/dist/components/textarea/textarea.component.js';
import '../etools-info-tooltip/info-icon-tooltip';
import {ifDefined} from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import {getTranslation} from './utils/translate';

@customElement('etools-textarea')
export class EtoolsTextarea extends LitElement {
  @property({type: String})
  label!: string;

  @property({type: String, reflect: true})
  pattern!: string;

  @property({type: String, reflect: true})
  placeholder!: string;

  @property({type: String})
  value: string | null = null;

  @property({type: Boolean})
  required!: boolean;

  @property({type: Boolean})
  readonly!: boolean;

  @property({type: Boolean})
  disabled!: boolean;

  @property({type: String, attribute: 'language'})
  language: string = '';

  @property({type: String, attribute: 'error-message', reflect: true})
  errorMessage!: string;

  @property({type: String})
  infoIconMessage!: string;

  @property({type: Boolean, reflect: true, attribute: 'char-counter'})
  charCounter!: boolean;

  @property({type: Number})
  charCount = 0;

  @property({type: Number})
  rows = 1;

  @property({type: Number, reflect: true, attribute: 'max-rows'})
  maxRows: number | undefined;

  @property({type: Number})
  maxlength!: number;

  @property({type: String})
  resize = 'auto';

  @property({type: Boolean, reflect: true, attribute: 'invalid'})
  invalid = false;

  @property({type: Boolean, reflect: true, attribute: 'always-float-label'})
  alwaysFloatLabel = false;

  @property({type: Boolean, reflect: true, attribute: 'auto-validate'})
  autoValidate = false;

  @state()
  _autoValidate = false;

  @query('sl-textarea')
  slTextarea!: SlTextarea;

  @state()
  focused = false;

  static get styles() {
    return [
      ShoelaceCustomizations,
      css`
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
          font-size: 12px;
          color: var(--sl-input-label-color);
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
    return html`
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
        @sl-invalid="${(e: any) => e.preventDefault()}"
        @sl-input="${(event: any) => {
          const val = event.target!.value ? event.target!.value : '';
          this.value = val;
          fireEvent(this, 'value-changed', {value: val});
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

    if (!this.language) {
      this.language = (window as any).EtoolsLanguage || 'en';
    }
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setMaxHeight();

    document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
    this.errorMessage = getTranslation(this.language, 'THIS_FIELD_IS_REQUIRED');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  handleLanguageChange(e: any) {
    this.language = e.detail.language;
    this.errorMessage = getTranslation(this.language, 'THIS_FIELD_IS_REQUIRED');
  }

  getInfoIconTemplate() {
    if (!this.infoIconMessage) {
      return html``;
    }
    return html`
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

  protected updated(_changedProperties: any): void {
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
    if (this.maxRows) {
      const textarea = this.slTextarea?.shadowRoot?.querySelector('textarea');
      if (textarea) {
        const computedStyle = window.getComputedStyle(textarea, null) || {};

        const lineHeight: string = computedStyle.lineHeight || '';
        const lineHeightPx: number = parseInt(lineHeight, 10);

        if (lineHeightPx) {
          const maxHeight: number = this.maxRows * lineHeightPx + 5;
          textarea.style.maxHeight = `${maxHeight}px`;
        }
      }
    }
  }

  validate() {
    this.invalid = !this.slTextarea.reportValidity();
    return !this.invalid;
  }

  focus() {
    this.shadowRoot!.querySelector<SlTextarea>('sl-textarea')!.focus();
  }
}
