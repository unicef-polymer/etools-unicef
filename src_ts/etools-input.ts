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
        .spacing {
          padding-top: var(--etools-input-padding-top, 8px);
          padding-bottom: var(--etools-input-padding-bottom, 8px);
        }
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
        class="spacing"
        autocomplete="off"
        size="small"
        .label="${this.label}"
        .pattern="${this.pattern}"
        placeholder="${this.placeholder}"
        ?required="${this.required}"
        ?readonly="${this.readonly}"
        .value="${this.value ? this.value : ''}"
        @sl-invalid="${(e: any) => e.preventDefault()}"
        @sl-input="${(event: any) => fireEvent(this, 'value-changed', {value: event.target!.value})}"
        exportparts="base,input,form-control"
      >
        <div slot="help-text">
          <div class="err-msg">${this.errorMessage}</div>
        </div>
      </sl-input>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  validate() {
    return this.slInput.reportValidity();
  }
}
