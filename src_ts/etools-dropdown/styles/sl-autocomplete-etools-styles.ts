import {css} from 'lit';

export default css`
  :host {
    --sl-shadow-x-small: 0 1px 2px hsl(240 3.8% 46.1% / 15%);
    --sl-shadow-small: 0 1px 2px hsl(240 3.8% 46.1% / 30%);
    --sl-shadow-medium: 0 2px 4px hsl(240 3.8% 46.1% / 30%);
    --sl-shadow-large: 0 2px 8px hsl(240 3.8% 46.1% / 30%);
    --sl-shadow-x-large: 0 4px 16px hsl(240 3.8% 46.1% / 30%);

    --sl-input-border-width: 0;
    --sl-input-font-family: var(--sl-font-sans, 'Roboto, Noto, sans-serif');
    --sl-button-font-size-medium: var(--etools-font-size-16, 16px);
    --sl-input-border-color-focus: #0099ff;
    --sl-color-primary-600: #0099ff;
    --sl-input-required-content-color: #ea4022;
  }

  sl-menu-item:focus-visible::part(base) {
    background-color: rgba(192, 192, 192, 0.2);
    color: var(--sl-color-neutral-1000);
  }

  .select--standard sl-menu-item[checked]::part(base),
  .select--standard:not(.select--multiple) sl-menu-item[checked]::part(base) {
    background-color: #dcdcdc;
    color: var(--sl-color-neutral-1000);
  }

  .select--standard sl-menu-item[checked]:focus-visible::part(base),
  .select--standard:not(.select--multiple) sl-menu-item[checked]:focus-visible::part(base) {
    background-color: #cfcfcf;
  }

  .form-control {
    --sl-input-label-font-size-medium: var(--etools-font-size-12, 12px);
    padding: 8px 0;
  }

  :host([invalid]:not([readonly]):not([disabled])) .form-control__label {
    --sl-input-label-color: #ea4022;
  }

  .form-control--has-label .form-control__label {
    margin-bottom: 0;
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 1px;
    padding-bottom: 3px;
  }

  .select--standard .select__combobox {
    --sl-input-height-medium: 26px;
    --sl-input-border-radius-medium: 0;
    --sl-input-spacing-medium: 0;
    padding-block: 1px;
    padding-bottom: 3px;
    box-shadow: none !important;
    position: relative;
    background: inherit;
    min-width: 30px;
  }

  .select--standard .select__combobox:after {
    content: '';
    position: absolute;
    width: 100%;
    display: block;
    bottom: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.54);
  }

  :host-context([readonly]) .select--standard .select__combobox:after {
    border-bottom: none;
  }

  .select--standard.select--transparent .select__combobox:after {
    display: none;
  }

  .select__clear {
    padding-left: 10px;
  }

  .select__tags {
    margin: 0;
    height: 100%;
    min-height: 24px;
  }

  .select--readonly .select__tags sl-tag:not(:last-child) {
    padding-right: 5px;
    border-right: 1px solid var(--sl-input-label-color);
  }

  .select__expand-icon {
    color: rgba(0, 0, 0, 0.54);
    font-size: var(--etools-font-size-22, 22px);
  }

  :host-context([multiple]) sl-tag::part(base) {
    line-height: 1;
    background-color: transparent;
    border: 0px;
    padding: 0;
  }

  sl-tag::part(remove-button) {
    color: #ea4022;
    margin-left: 5px;
  }

  .select--medium .select__tags {
    gap: 8px;
  }

  :host([transparent]) .form-control-input,
  :host([readonly]) .form-control-input {
    border: 0;
  }

  :host([transparent]) {
    --sl-input-color: rgba(255, 255, 255, 1);
    --sl-input-color-hover: rgba(255, 255, 255, 1);
  }

  :host([transparent]) .select__expand-icon {
    color: rgba(255, 255, 255, 1);
  }

  :host([transparent]) .select__display-input[is-placeholder] {
    color: var(--sl-input-placeholder-light-color, rgba(255, 255, 255, 0.7));
  }

  .select--standard.select--disabled:not(.select--readonly) .select__combobox:after {
    border-bottom-style: dashed;
    border-bottom-width: 1px;
  }

  .select--standard.select--invalid:not(.select--disabled):not(.select--readonly) .select__combobox:after {
    border-bottom-style: solid;
    border-color: #ea4022;
    border-bottom-width: 2px;
  }

  .select--standard:not(.select--disabled):not(.select--readonly):not(.select--invalid).select--open
    .select__combobox:after,
  .select--standard:not(.select--disabled):not(.select--readonly):not(.select--invalid).select--focused
    .select__combobox:after {
    border-color: var(--sl-input-border-color-focus);
    border-bottom-width: 2px;
  }

  .search sl-input {
    --sl-focus-ring-width: 0;
    position: relative;
  }

  .search sl-input:focus {
    box-shadow: none;
  }

  .search sl-input:after {
    content: '';
    position: absolute;
    width: 100%;
    display: block;
    bottom: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.54);
  }

  .search sl-input::part(prefix) {
    --sl-input-spacing-medium: 0;
    color: rgba(0, 0, 0, 0.54);
  }

  .search sl-input:focus:after {
    border-color: var(--sl-input-border-color-focus);
    border-bottom-width: 2px;
  }

  .select--multiple sl-menu-item::part(checked-icon) {
    border: 2px solid rgba(0, 0, 0, 0.54);
    border-radius: 2px;
  }

  .select--multiple sl-menu-item[checked]::part(checked-icon) {
    color: #fff;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .select--multiple sl-menu-item:not([checked])::part(checked-icon) {
    color: transparent;
  }

  /* We need to keep it here for the button because it is used to calculate the line-height*/
  .footer {
    --sl-input-border-width: 1px;
  }

  etools-icon[name='cancel'] {
    --etools-icon-font-size: var(--etools-font-size-16, 16px);
  }
`;
