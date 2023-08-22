import {css, html, LitElement} from 'lit';
import {customElement, query, property} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import {ShoelaceCustomizations} from './styles/shoelace-customizations';
import {fireEvent} from '@unicef-polymer/etools-utils/dist/fire-event.util';
import SlTextarea from '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '../etools-info-tooltip/info-icon-tooltip';
import {ifDefined} from 'lit/directives/if-defined.js';

@customElement('etools-textarea')
export class EtoolsTextarea extends LitElement {
  @property({type: String})
  label!: string;

  @property({type: String, reflect: true})
  pattern!: string;

  @property({type: String, reflect: true})
  placeholder!: string;

  private _value!: string;
  @property({type: String})
  get value() {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.charCount = this._value ? this._value.length : 0;
  }

  @property({type: Boolean})
  required!: boolean;

  @property({type: Boolean})
  readonly!: boolean;

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

  @property({type: Number})
  maxlength!: number;

  @property({type: String})
  resize = 'auto';

  @property({type: Boolean, reflect: true, attribute: 'always-float-label'})
  alwaysFloatLabel = false;

  @query('sl-textarea')
  slTextarea!: SlTextarea;

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

        .paper-label {
          font-size: 12px;
          color: var(--secondary-text-color);
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
        ?required="${this.required}"
        ?readonly="${this.readonly}"
        ?always-float-label="${this.alwaysFloatLabel}"
        rows="${ifDefined(this.rows)}"
        maxlength="${ifDefined(this.maxlength)}"
        .value="${this.value == undefined || this.value == null ? '' : this.value}"
        @sl-invalid="${(e: any) => e.preventDefault()}"
        @sl-input="${(event: any) => {
          const val = event.target!.value ? event.target!.value : '';
          fireEvent(this, 'value-changed', {value: val});
          this.charCount = val.length;
        }}"
        exportparts="textarea,base,form-control,form-control-input,form-control-label,form-control-help-text"
      >
        <div slot="help-text" style="display: flex; justify-content: space-between;">
          <div class="err-msg">${this.errorMessage}</div>
          <div class="char-counter" ?hidden="${!this.charCounter}">${this.charCount}/${this.maxlength}</div>
        </div>
      </sl-textarea>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  getInfoIconTemplate() {
    if (!this.infoIconMessage) {
      return html``;
    }
    return html`
      <label class="paper-label" for="sl-textarea">${this.label}</label>
      <info-icon-tooltip
        id="iit-context"
        ?hidden="${this.readonly}"
        .tooltipText="${this.infoIconMessage}"
      ></info-icon-tooltip>
    `;
  }

  validate() {
    const valid = this.slTextarea.reportValidity();
    if (!valid) {
      this.slTextarea.setAttribute('data-user-invalid', '');
    } else {
      this.slTextarea.removeAttribute('data-user-invalid');
    }
    return valid;
  }
}
