import {html} from 'lit-element';
export const CommonStyles = html` <style>
  *[hidden] {
    display: none !important;
  }

  sl-button::part(base) {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 16px;
    margin: 0 0;
    padding: 0 0 !important;
  }
  sl-button.change-button::part(label),
  sl-button.delete-button::part(label) {
    padding-inline-start: 5px;
    padding-inline-end: 5px;
  }
  sl-button::part(label) {
    padding-inline-start: 0;
    padding-inline-end: 0;
  }
  #uploadingSpinner {
    width: 18px;
    height: 18px;
  }

  etools-icon[name='done'] {
    color: var(--etools-upload-success-color, #72c300);
  }

  etools-icon[name='error-outline'],
  .delete-button {
    color: var(--etools-upload-danger-color, #ea4022);
  }

  .delete-button::part(base) {
    color: #f1572a;
  }

  .upload-button {
    color: var(--etools-upload-primary-color, var(--primary-color));
    margin-inline-end: 8px;
  }

  sl-button:focus {
    outline: 0;
    box-shadow: 0 0 5px 5px rgba(170, 165, 165, 0.2);
    background-color: rgba(170, 165, 165, 0.2);
  }

  :host([readonly]) .upload-button {
    color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
  }

  :host([disabled]) .upload-button {
    pointer-events: none;
    opacity: 0.33;
  }

  .upload-button etools-icon {
    margin-inline-end: 8px;
  }

  etools-icon {
    min-width: 22px;
    min-height: 22px;
  }
</style>`;
