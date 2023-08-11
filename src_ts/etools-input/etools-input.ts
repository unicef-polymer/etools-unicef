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
        :host {
          width: 100%;
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
        autocomplete="off"
        part="sl-input"
        size="small"
        .label="${this.label}"
        .pattern="${this.pattern}"
        placeholder="${this.placeholder ? this.placeholder : ''}"
        allowed-pattern="${this.allowedPattern}"
        ?required="${this.required}"
        ?readonly="${this.readonly}"
        ?always-float-label="${this.alwaysFloatLabel}"
        .value="${this.value == undefined || this.value == null ? '' : this.value}"
        @keydown="${(event) => {
          if (this.allowedPattern) {
            const regex = new RegExp(this.allowedPattern);
            if (!regex.test(event.key) && event.keyCode > 46 && !event.ctrlKey && !event.altKey) {
              event.preventDefault();
            }
          }
        }}"
        @sl-invalid="${(e: any) => e.preventDefault()}"
        @sl-input="${(event: any) => fireEvent(this, 'value-changed', {value: event.target!.value})}"
        exportparts="base,input,form-control,form-control-label,form-control-help-text"
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
