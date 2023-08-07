import {LitElement, css, customElement, html, property, query} from 'lit-element';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import {ShoelaceCustomizations} from './styles/shoelace-customizations';
import {fireEvent} from '@unicef-polymer/etools-utils/dist/fire-event.util';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.js';

@customElement('etools-input')
export class EtoolsInput extends LitElement {
  @property({type: String})
  label!: string;

  @property({type: String, reflect: true})
  pattern!: string;

  @property({type: String, reflect: true})
  placeholder!: string;

  @property({type: String})
  value!: string;

  @property({type: Boolean})
  required!: boolean;

  @property({type: Boolean})
  readonly!: boolean;

  @property({type: String, attribute: 'error-message', reflect: true})
  errorMessage!: string;

  @query('sl-input')
  slInput!: SlInput;

  static get styles() {
    return [
      ShoelaceCustomizations,
      css`
        sl-input::part(input) {
          width: 100%;
        }
      `
    ];
  }

  render() {
    return html`
      <sl-input
        id="sl-input"
        autocomplete="off"
        size="small"
        .label="${this.label}"
        .pattern="${this.pattern}"
        placeholder="${this.placeholder ? this.placeholder : ''}"
        ?required="${this.required}"
        ?readonly="${this.readonly}"
        .value="${this.value ? this.value : ''}"
        @sl-invalid="${(e: any) => e.preventDefault()}"
        @sl-input="${(event: any) => fireEvent(this, 'value-changed', {value: event.target!.value})}"
        exportparts="base,input,form-control,form-control-label,form-control-help-text"
      >
        <div slot="help-text">
          <div class="err-msg">${this.errorMessage}</div>
        </div>
        <slot slot="prefix" name="prefix"></slot>
      </sl-input>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  validate() {
    const valid = this.slInput.reportValidity();
    if (!valid) {
      this.slInput.setAttribute('data-user-invalid', '');
    } else {
      this.slInput.removeAttribute('data-user-invalid');
    }
    return valid;
  }
}
