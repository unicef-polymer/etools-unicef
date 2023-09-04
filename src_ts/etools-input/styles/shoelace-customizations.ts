import {css} from 'lit';
// TODO - submodule should not import it fro here

const validationStyles = css`
  sl-input div[slot='help-text'] div.char-counter,
  sl-textarea div[slot='help-text'] div.char-counter {
    visibility: visible;
  }
  sl-textarea[show-char-counter] div.err-msg {
    overflow-x: clip;
  }

  sl-input div[slot='help-text'],
  sl-textarea div[slot='help-text'] {
    height: 0;
  }

  :host([readonly]) sl-input div[slot='help-text'] div.char-counter,
  :host([readonly]) sl-textarea div[slot='help-text'] div.char-counter {
    visibility: hidden;
  }

  sl-input[data-user-invalid] div[slot='help-text'] div.err-msg,
  sl-textarea[data-user-invalid] div[slot='help-text'] div.err-msg {
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
  sl-input[data-user-invalid],
  sl-textarea[data-user-invalid] {
    --sl-input-border-color: red;
    --sl-input-label-color: red;
  }
  sl-input,
  sl-textarea {
    --sl-input-required-content-color: red;
  }
  .err-msg {
    color: red;
  }
`;

const labelStyles = css`
  sl-input,
  sl-textarea {
    --sl-input-label-color: var(--secondary-text-color);
    --sl-input-required-content-color: red;
    --sl-spacing-3x-small: 0;
    --sl-input-spacing-small: 2px;
  }
  sl-input::part(form-control-label) {
    line-height: 18px;
    font-size: 12px;
    display: block;
  }
  sl-textarea[always-float-label]::part(form-control-label),
  sl-input[always-float-label]::part(form-control-label) {
    min-height: 18px;
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
    --sl-input-font-size-small: 16px;
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

  sl-textarea::part(textarea) {
    font-family: inherit;
    color: var(--primary-text-color) !important;
  }

  :host(:not([readonly])) sl-input:focus::part(form-control-input)::after,
  :host(:not([readonly])) sl-textarea:focus::part(form-control-input)::after {
    border-color: var(--primary-color);
    border-bottom-width: 2px;
  }
  
  :host(:not([readonly])) sl-input[data-user-invalid]::part(form-control-input)::after,
  :host(:not([readonly])) sl-textarea[data-user-invalid]::part(form-control-input)::after {
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
