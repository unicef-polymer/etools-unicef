import {css, html} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import {ShoelaceCustomizations} from './styles/shoelace-customizations';
import {fireEvent} from '@unicef-polymer/etools-utils/dist/fire-event.util';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.js';
import {EtoolsInputBase} from './etools-input-base';

@customElement('etools-input')
export class EtoolsInput extends EtoolsInputBase {
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
        part="sl-input"
        size="small"
        .label="${this.label}"
        .pattern="${this.pattern}"
        allowed-pattern="${this.allowedPattern}"
        placeholder="${this.placeholder}"
        ?required="${this.required}"
        ?readonly="${this.readonly}"
        .value="${this.value ? this.value : ''}"
        @keydown="${(event) => {
          if (this.allowedPattern) {
            const regex = new RegExp(this.allowedPattern);
            if (!regex.test(event.key) && event.keyCode > 46 && !event.ctrlKey && !event.altKey) {
              event.preventDefault();
            }
          }
        }}"
        @sl-invalid="${(e: any) => e.preventDefault()}"
        @sl-input="${(event: any) => {
          fireEvent(this, 'value-changed', {value: event.target!.value});
        }}"
        exportparts="base,input,form-control"
      >
        <div slot="help-text">
          <div class="err-msg">${this.invalid && this.errorMessage ? this.errorMessage : ''}</div>
        </div>
        <slot slot="prefix" name="prefix"></slot>
      </sl-input>
    `;
  }

  validate() {
    this.invalid = !this.slInput.reportValidity();
    if (this.invalid) {
      this.slInput.setAttribute('data-user-invalid', '');
    } else {
      this.slInput.removeAttribute('data-user-invalid');
    }
    return !this.invalid;
  }
}
