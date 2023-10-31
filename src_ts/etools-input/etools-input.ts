import {css, html} from 'lit';
import {customElement, query, property} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import {ShoelaceCustomizations} from './styles/shoelace-customizations';
import {fireEvent} from '@unicef-polymer/etools-utils/dist/fire-event.util';
import type SlInput from '@shoelace-style/shoelace/dist/components/input/input.js';
import {EtoolsInputBase} from './etools-input-base';
import {ifDefined} from 'lit/directives/if-defined.js';

@customElement('etools-input')
export class EtoolsInput extends EtoolsInputBase {
  @query('sl-input')
  slInput!: SlInput;

  /**
   * Disable shoelace internal input interaction/input. Mark internal input as readonly while keeping
   * standard shoelace input styles and functionalities. Used by datepicker at this point.
   */
  @property({type: Boolean, reflect: true, attribute: 'prevent-user-direct-input'})
  preventUserDirectInput = false;

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
      <div class="input-wrapper">
        <sl-input
          id="sl-input"
          autocomplete="off"
          part="sl-input"
          size="small"
          .label="${this.label}"
          .pattern="${this.pattern}"
          placeholder="${this.placeholder ? this.placeholder : ''}"
          allowed-pattern="${this.allowedPattern}"
          ?invalid="${this.invalid}"
          ?required="${this.required}"
          ?required-placeholder="${this.requiredPlaceholder}"
          ?readonly="${this.preventUserDirectInput || this.readonly}"
          ?always-float-label="${this.alwaysFloatLabel}"
          .min="${ifDefined(this.min)}"
          .max="${ifDefined(this.max)}"
          .step="${ifDefined(this.step)}"
          .type="${ifDefined(this.type)}"
          ?no-spin-buttons="${ifDefined(this.noSpinButtons)}"
          ?password-toggle="${ifDefined(this.passwordToggle)}"
          ?password-visible="${ifDefined(this.passwordVisible)}"
          ?clearable="${ifDefined(this.clearable)}"
          .minlength="${ifDefined(this.minlength)}"
          .maxlength="${ifDefined(this.maxlength)}"
          .autocapitalize="${ifDefined(this.autocapitalize)}"
          .autocorrect="${ifDefined(this.autocorrect)}"
          .value="${this.value == undefined || this.value == null ? '' : this.value}"
          @keydown="${(event) => {
            if (this.autoValidate) {
              this._autoValidate = true;
            }
            if (this.allowedPattern) {
              const regex = new RegExp(this.allowedPattern);
              if (!regex.test(event.key) && event.keyCode > 46 && !event.ctrlKey && !event.altKey) {
                event.preventDefault();
              }
            }
          }}"
          @input="${(event) => {
            if (this.type === 'number') {
              const value = event.target!.value;
              if (this.min !== '' && this.min !== undefined && value < this.min) {
                this.value = this.min;
              }
              if (this.max !== '' && this.max !== undefined && value > this.max) {
                this.value = this.max;
              }
            }
          }}"
          @sl-invalid="${(e: any) => e.preventDefault()}"
          @sl-input="${this.inputValueChanged}"
          exportparts="base,input,form-control,form-control-label,form-control-help-text, form-control-input"
        >
          <div slot="help-text">
            <div class="err-msg">${this.invalid && this.errorMessage ? this.errorMessage : ''}</div>
          </div>
          <slot slot="prefix" name="prefix"></slot>
          <slot slot="suffix" name="suffix"></slot>
        </sl-input>
      </div>
    `;
  }

  protected updated(_changedProperties: any): void {
    if (this._autoValidate && _changedProperties.has('value') && this.value !== undefined) {
      setTimeout(() => this.validate());
    }
  }

  inputValueChanged(event: any) {
    let value = event.target!.value;
    if (this.type === 'number') {
      if (this.min !== '' && this.min !== undefined && value < this.min) {
        value = this.min;
      }
      if (this.max !== '' && this.max !== undefined && value > this.max) {
        value = this.max;
      }
    }
    fireEvent(this, 'value-changed', {value: value});
  }

  validate() {
    this.invalid = !this.slInput.reportValidity();
    return !this.invalid;
  }

  focus() {
    this.shadowRoot!.querySelector<SlInput>('sl-input')!.focus();
  }
}
