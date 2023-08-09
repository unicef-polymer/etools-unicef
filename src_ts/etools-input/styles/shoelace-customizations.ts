import {css} from 'lit-element';
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

  sl-input[readonly] div[slot='help-text'] div.char-counter,
  sl-textarea[readonly] div[slot='help-text'] div.char-counter {
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
    line-height: 19px;
    font-size: 12px;
    display: block;
  }
`;

export const ShoelaceCustomizations = css`
  sl-input::part(form-control) {
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
    --sl-input-font-size-small: 16px;
  }
  sl-input[readonly],
  sl-textarea[readonly] {
    --sl-input-border-width: 0;
    --sl-input-spacing-small: 0;
    --sl-input-focus-ring-color: rgba(0, 0, 0, 0);
  }

  sl-input:not([readonly]):focus::part(base),
  sl-textarea:not([readonly]):focus::part(base) {
    border: none;
    border-bottom: 2px solid var(--primary-color);
    box-shadow: 0 0 0 -1px var(--primary-color), 0 3px 0 -2px var(--primary-color);
    border-radius: 0;
  }

  sl-input::part(base),
  sl-textarea::part(base) {
    border: none;
    border-bottom: 1px solid var(--secondary-text-color);
    box-shadow: none;
    border-radius: 0;
    background: inherit;
    font-family: inherit;
  }

  sl-textarea::part(textarea) {
    font-family: inherit;
    color: var(--primary-text-color) !important;
  }

  sl-input[data-user-invalid]::part(base),
  sl-textarea[data-user-invalid]::part(base) {
    border-bottom: 1px solid red;
  }

  sl-input[readonly]::part(base),
  sl-textarea[readonly]::part(base) {
    border: none;
    border-bottom: none;
  }

  ${labelStyles}
  ${validationStyles}
`;
