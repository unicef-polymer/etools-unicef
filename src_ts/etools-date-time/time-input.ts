'use strict';
import {LitElement, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

/**
 * @customElement
 * @polymer
 */
@customElement('time-input')
export class TimeInput extends LitElement {
  private _value: string | null | undefined;
  private _hoursInput: string | undefined;
  private _minutesInput: string | undefined;

  @property({
    type: String
  })
  set value(value) {
    this._value = value;
    this._valueChanged(this.value);
  }

  get value() {
    return this._value;
  }

  @property({
    type: Boolean,
    reflect: true
  })
  readonly = false;

  @property({
    type: Boolean,
    reflect: true
  })
  required = false;

  @property({
    type: Boolean,
    reflect: true
  })
  disabled = false;

  @property({
    type: Boolean,
    reflect: true,
    attribute: 'auto-validate'
  })
  autoValidate = false;

  @property({
    type: Number
  })
  set hoursInput(hoursInput) {
    this._hoursInput = hoursInput;
    this.computeTime(this.hoursInput, this.minutesInput);
  }

  get hoursInput() {
    return this._hoursInput;
  }

  @property({
    type: Number
  })
  set minutesInput(minutesInput) {
    this._minutesInput = minutesInput;
    this.computeTime(this.hoursInput, this.minutesInput);
  }

  get minutesInput() {
    return this._minutesInput;
  }

  @property({
    type: String
  })
  label = 'Time';

  @property({
    type: Boolean,
    reflect: true
  })
  invalid = false;

  @property({
    type: Boolean
  })
  hideIcon = false;

  @property({
    type: String
  })
  errorMessage = 'Invalid time';

  @property({type: Boolean, attribute: 'no-label-float'})
  noLabelFloat: boolean | undefined;

  render() {
    // language=HTML
    return html`
      <style>
        :host {
          display: block;
          --sl-input-required-content-offset: 3px;
          --sl-input-required-content-color: #ea4022;
        }

        .form-control .form-control__label {
          display: none;
        }

        .form-control .form-control__help-text {
          display: none;
        }

        /* Label */
        .form-control--has-label .form-control__label {
          display: block;
          color: var(--secondary-text-color);
          line-height: 18px;
          font-size: 12px;
        }

        :host([required]) .form-control--has-label .form-control__label::after {
          content: var(--sl-input-required-content);
          margin-inline-start: var(--sl-input-required-content-offset);
          color: var(--sl-input-required-content-color);
        }

        .input {
          flex: 1 1 auto;
          display: inline-flex;
          align-items: stretch;
          justify-content: start;
          position: relative;
          width: 100%;
          font-family: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          vertical-align: middle;
          overflow: hidden;
          cursor: text;
          padding-bottom: 3px;
        }

        .input__control {
          flex: 1 1 auto;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          min-width: 0;
          height: 100%;
          color: var(--sl-input-color);
          border: none;
          background: inherit;
          box-shadow: none;
          padding: 0;
          margin: 0;
          cursor: inherit;
          -webkit-appearance: none;
          padding-inline-end: 5px;
        }

        .input__control::-webkit-search-decoration,
        .input__control::-webkit-search-cancel-button,
        .input__control::-webkit-search-results-button,
        .input__control::-webkit-search-results-decoration {
          -webkit-appearance: none;
        }

        .input__prefix {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          cursor: default;
          margin-inline-end: 5px;
        }

        .input__prefix sl-icon {
          color: var(--sl-input-icon-color);
        }

        :host(:not([disabled]):not([readonly])) .invalid-message[visible] {
          font-size: 12px;
          visibility: visible;
          height: 0;
          overflow: visible;
        }

        .invalid-message {
          visibility: hidden;
          height: 0;
          overflow: hidden;
          white-space: nowrap;
        }

        .input::after {
          content: '';
          position: absolute;
          width: 100%;
          display: block;
          bottom: 0;
          border-bottom: 1px solid var(--secondary-text-color);
        }

        :host([invalid]:not([disabled]):not([readonly])) .input::after {
          border-bottom: 2px solid red;
        }

        :host([invalid]:not([disabled]):not([readonly])) .form-control__label,
        :host([invalid]:not([disabled]):not([readonly])) .invalid-message {
          color: red;
        }

        :host([disabled]) .input::after {
          border-bottom: 1px dashed var(--secondary-text-color);
        }

        :host([readonly]) .input::after {
          border: none;
          border-bottom: none;
        }

        .input input {
          font-size: inherit;
          border: 0;
          text-align: center;
          width: var(--etools-time-inputs-width, 34px);
        }

        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
          background-color: transparent;
          -moz-appearance: textfield;
        }

        *[hidden] {
          display: none;
        }
      </style>

      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--has-label': !this.noLabelFloat
        })}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${this.label ? 'false' : 'true'}
        >
          ${this.label}
        </label>
        <div part="form-control-input" class="form-control-input">
          <div part="base" class="input">
            <span part="prefix" class="input__prefix">
              <sl-icon name="clock" part="prefix" ?hidden="${this.hideIcon}"></sl-icon>
            </span>

            <div class="input__control">
              <input
                .value="${this.hoursInput}"
                @change="${(e) => {
                  console.log(this.hoursInput, e.target.value);
                  if (this.hoursInput !== e.target.value) {
                    this.hoursInput = e.target.value;
                  }
                }}"
                @blur="${this._formatHour}"
                ?readonly="${this.readonly}"
                ?disabled="${this.disabled}"
                placeholder="hh"
                type="number"
                min="0"
                max="23"
              />
              :
              <input
                .value="${this.minutesInput}"
                @change="${(e) => {
                  console.log(this.minutesInput, e.target.value);
                  if (this.minutesInput !== e.target.value) {
                    this.minutesInput = e.target.value;
                  }
                }}"
                @blur="${this._formatMinutes}"
                ?readonly="${this.readonly}"
                ?disabled="${this.disabled}"
                placeholder="mm"
                type="number"
                min="0"
                max="59"
              />
            </div>
          </div>
        </div>

        <div part="invalid-message" class="invalid-message" ?visible=${this.invalid && this.errorMessage}>
          ${this.errorMessage}
        </div>
      </div>
    `;
  }

  constructor() {
    super();
    this.initializeProperties();
  }

  initializeProperties() {}

  _valueChanged(newValue) {
    if (!newValue) {
      if (this.hoursInput || this.minutesInput) {
        this._clearData();
      }
      return;
    }
  }

  computeTime(hours, minutes) {
    if (hours !== undefined && minutes !== undefined) {
      if (this.autoValidate && this._isValidHours() && this._isValidMinutes()) {
        this.invalid = false;
      }
      this.value = hours + ':' + minutes + ':00';
    }
  }

  _formatHour() {
    if (isNaN(Number(this.hoursInput)) || Number(this.hoursInput) < 0 || Number(this.hoursInput) > 23) {
      if (this.autoValidate) {
        console.log('h', 'invalid');
        this.invalid = true;
      }
    } else {
      this.hoursInput = !this.hoursInput || this.hoursInput.length < 2 ? '0' + this.hoursInput : this.hoursInput;
    }
  }

  _formatMinutes() {
    if (isNaN(Number(this.minutesInput)) || Number(this.minutesInput) < 0 || Number(this.minutesInput) > 59) {
      if (this.autoValidate) {
        console.log('m', 'invalid');
        this.invalid = true;
      }
    } else {
      this.minutesInput =
        !this.minutesInput || this.minutesInput.length < 2 ? '0' + this.minutesInput : this.minutesInput;
    }
  }

  _isValidHours() {
    return Number(this.hoursInput) >= 0 && Number(this.hoursInput) < 24;
  }

  _isValidMinutes() {
    return Number(this.minutesInput) >= 0 && Number(this.minutesInput) < 60;
  }

  _clearData() {
    this.hoursInput = undefined;
    this.minutesInput = undefined;
    this.value = null;
    this.invalid = false;
  }

  validate() {
    const valid = this._isValidHours() && this._isValidMinutes();
    this.invalid = !valid;
    return valid;
  }
}
