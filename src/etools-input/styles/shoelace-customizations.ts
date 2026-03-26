import {css} from 'lit';
// TODO - submodule should not import it fro here

const validationStyles = css`
  sl-input div[slot='help-text'] div.char-counter,
  sl-textarea div[slot='help-text'] div.char-counter {
    visibility: visible;
  }

  :host(:not([readonly]):not([disabled])) sl-input:not([invalid]):focus div[slot='help-text'] div.char-counter,
  :host(:not([readonly]):not([disabled])) sl-textarea:not([invalid]):focus div[slot='help-text'] div.char-counter {
    color: var(--primary-color);
  }

  :host(:not([readonly]):not([disabled])) sl-input[invalid] div[slot='help-text'] div.char-counter,
  :host(:not([readonly]):not([disabled])) sl-textarea[invalid] div[slot='help-text'] div.char-counter {
    color: var(--sl-input-required-content-color);
  }

  sl-textarea[show-char-counter] div.err-msg {
    overflow-x: clip;
  }

  sl-input div[slot='help-text'],
  sl-textarea div[slot='help-text'] {
    height: 0;
    display: flex;
    justify-content: space-between;
  }

  :host([readonly]) sl-input div[slot='help-text'] div.char-counter,
  :host([readonly]) sl-textarea div[slot='help-text'] div.char-counter {
    visibility: hidden;
  }

  :host(:not([readonly]):not([disabled])) sl-input[invalid] div[slot='help-text'] div.err-msg,
  :host(:not([readonly]):not([disabled])) sl-textarea[invalid] div[slot='help-text'] div.err-msg {
    visibility: visible;
    height: 0;
    overflow: visible;
  }

  sl-input div[slot='help-text'] div.err-msg,
  sl-textarea div[slot='help-text'] div.err-msg {
    visibility: hidden;
    height: 0;
    overflow: hidden;
    white-space: nowrap;
  }

  :host(:not([readonly]):not([disabled])) sl-input[invalid],
  :host(:not([readonly]):not([disabled])) sl-textarea[invalid],
  :host([invalid]:not([disabled]):not([readonly])) .etools-label {
    --sl-input-border-color: red;
    --sl-input-label-color: red;
  }

  sl-input,
  sl-textarea,
  :host([invalid]:not([disabled]):not([readonly])) .etools-label {
    --sl-input-required-content-color: red;
  }

  .err-msg {
    color: red;
  }

  ::-ms-input-placeholder,
  ::-webkit-input-placeholder,
  ::placeholder {
    color: var(--sl-input-placeholder-color, rgba(0, 0, 0, 0.55));
  }
`;

const labelStyles = css`
  sl-input,
  sl-textarea,
  .etools-label {
    --sl-input-label-color: var(--secondary-text-color);
    --sl-input-required-content-color: red;
    --sl-spacing-3x-small: 0;
    --sl-input-spacing-small: 2px;
    --sl-input-required-content-offset: 3px;
  }

  sl-input::part(form-control-label) {
    line-height: 18px;
    font-size: var(--etools-font-size-12, 12px);
    display: block;
  }

  sl-textarea[always-float-label]::part(form-control-label),
  sl-input[always-float-label]::part(form-control-label) {
    min-height: 18px;
  }

  :host([required]) .etools-label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: 2px;
    color: var(--sl-input-required-content-color);
  }

  :host([readonly]) sl-input::part(form-control-label),
  :host([readonly]) sl-textarea::part(form-control-label),
  :host([readonly]) .etools-label::after {
    --sl-input-required-content: '';
  }

  :host(:not([disabled]):not([readonly]):not([invalid])) sl-input:focus::part(form-control-label),
  :host(:not([disabled]):not([readonly]):not([invalid])) sl-textarea:focus::part(form-control-label),
  :host(:not([disabled]):not([readonly]):not([invalid])) .etools-label.focused {
    color: var(--primary-color);
  }
`;

export const ShoelaceCustomizations = css`
  :host .input-wrapper {
    padding-top: var(--etools-input-padding-top, 8px);
    padding-bottom: var(--etools-input-padding-bottom, 8px);
  }

  sl-textarea::part(textarea) {
    padding-top: 0;
    padding-bottom: 0;
    line-height: 24px;
  }

  sl-input,
  sl-textarea {
    position: relative;
    --sl-input-font-size-small: var(--etools-font-size-16, 16px);
  }

  sl-input::part(prefix) {
    margin-inline-end: 5px;
  }

  :host([readonly]) sl-input,
  :host([readonly]) sl-textarea {
    --sl-input-border-width: 0;
    --sl-input-spacing-small: 0;
    --sl-input-focus-ring-color: rgba(0, 0, 0, 0);
  }

  sl-input::part(form-control-input),
  sl-textarea::part(form-control-input) {
    position: relative;
    padding-bottom: 2px;
  }

  sl-input::part(base),
  sl-textarea::part(base) {
    border: 0;
    box-shadow: none;
    border-radius: 0;
    background: inherit;
    font-family: inherit;
    align-items: center;
  }

  sl-input::part(form-control-input)::after,
  sl-textarea::part(form-control-input)::after {
    content: '';
    position: absolute;
    width: 100%;
    display: block;
    bottom: 0;
    border-bottom: 1px solid var(--secondary-text-color);
  }

  :host([disabled]) sl-input::part(form-control-input)::after,
  :host([disabled]) sl-textarea::part(form-control-input)::after {
    border-bottom-style: dashed;
    border-bottom-width: 1px;
  }

  sl-textarea::part(textarea) {
    font-family: inherit;
    color: var(--primary-text-color) !important;
  }

  :host(:not([disabled]):not([readonly]):not([invalid])) sl-input:focus::part(form-control-input)::after,
  :host(:not([disabled]):not([readonly]):not([invalid])) sl-textarea:focus::part(form-control-input)::after {
    border-color: var(--primary-color);
    border-bottom-width: 2px;
  }

  :host(:not([disabled]):not([readonly])) sl-input[required-placeholder]::part(suffix)::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  :host(:not([disabled]):not([readonly])) sl-input[invalid]::part(form-control-input)::after,
  :host(:not([disabled]):not([readonly])) sl-textarea[invalid]::part(form-control-input)::after {
    border-bottom: 2px solid red;
  }

  :host([readonly]) sl-input::part(form-control-input)::after,
  :host([readonly]) sl-textarea::part(form-control-input)::after {
    border: none;
    border-bottom: none;
  }

  ${labelStyles}
  ${validationStyles}
`;
