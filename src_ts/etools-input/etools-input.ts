import {css, html} from 'lit';
import {customElement, query, property} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import {ShoelaceCustomizations} from './styles/shoelace-customizations';
import {fireEvent} from '@unicef-polymer/etools-utils/dist/fire-event.util';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import {EtoolsInputBase} from './etools-input-base';
import {ifDefined} from 'lit/directives/if-defined.js';
import '../etools-icons/etools-icon';

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

        etools-icon {
          --etools-icon-font-size: var(--etools-font-size-16, 16px);
        }

        sl-input[wrap-text-in-readonly][readonly]:not([prevent-user-direct-input])::part(form-control-input) {
          display: none;
        }

        .readonly-input {
          display: inline-flex;
          align-items: stretch;
          justify-content: start;
          width: 100%;
        }

        .readonly-input-prefix,
        .readonly-input-suffix {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          cursor: default;
        }

        .readonly-input-prefix ::slotted(*) {
          margin-inline-end: 5px;
        }

        .readonly-input-value {
          width: 100%;
        }

        [hidden] {
          display: none;
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
          ?disabled="${this.disabled}"
          ?required-placeholder="${this.requiredPlaceholder}"
          ?readonly="${this.preventUserDirectInput || this.readonly}"
          ?prevent-user-direct-input="${this.preventUserDirectInput}"
          ?wrap-text-in-readonly="${this.wrapTextInReadonly}"
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
          @keydown="${(e) => {
            if (this.autoValidate) {
              this._autoValidate = true;
            }
            if (this.allowedPattern) {
              const regex = new RegExp(this.allowedPattern);
              if (!regex.test(e.key) && e.keyCode > 46 && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
              }
            }
          }}"
          @sl-invalid="${(e: any) => e.preventDefault()}"
          @sl-input="${(e: any) => {
            let value = e.target!.value;

            if (this.type === 'number') {
              if (this.min !== '' && this.min !== undefined && value < this.min) {
                value = this.min.toString();
                this.slInput.value = value;
              }

              if (this.max !== '' && this.max !== undefined && value > this.max) {
                value = this.max.toString();
                this.slInput.value = value;
              }
            }

            this.value = value;
            fireEvent(this, 'value-changed', {value: value});

            this.charCount = (value || '').toString().length;
          }}"
          exportparts="base,input,
          prefix,suffix,form-control,
          form-control-label,
          form-control-help-text,
          form-control-input"
        >
          <div slot="help-text">
            <div class="err-msg">${this.invalid && this.errorMessage ? this.errorMessage : ''}</div>
            <div class="char-counter" ?hidden="${!this.charCounter}">${this.charCount}/${this.maxlength}</div>
          </div>
          ${this.hideReadonlyText()
            ? html`<slot slot="prefix" name="prefix"></slot> <slot slot="suffix" name="suffix"></slot>`
            : html``}
          <div slot="clear-icon">
            <etools-icon name="cancel"></etools-icon>
          </div>
        </sl-input>
        <div part="readonly-input" class="readonly-input" ?hidden=${this.hideReadonlyText()}>
          ${!this.hideReadonlyText()
            ? html`<span part="readonly-input-prefix" class="readonly-input-prefix"><slot name="prefix"></slot></span>`
            : html``}
          <span part="readonly-input-value" class="readonly-input-value">${this.value || this.placeholder}</span>
          ${!this.hideReadonlyText()
            ? html`<span part="readonly-input-suffix" class="readonly-input-prefix"><slot name="suffix"></slot></span>`
            : html``}
        </div>
      </div>
    `;
  }

  protected updated(_changedProperties: any): void {
    if (this._autoValidate && _changedProperties.has('value') && this.value !== undefined) {
      setTimeout(() => this.validate());
    }
  }

  hideReadonlyText() {
    return !this.wrapTextInReadonly || this.preventUserDirectInput || !this.readonly;
  }

  validate() {
    this.invalid = !this.slInput.reportValidity();
    return !this.invalid;
  }

  focus() {
    this.shadowRoot!.querySelector<SlInput>('sl-input')!.focus();
  }
}
