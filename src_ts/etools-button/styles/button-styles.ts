import {css, unsafeCSS} from 'lit';
export const buttonsStylesContent = `
  :host.default.left-icon:not(variant=["text"])::part(base),
  :host.primary.left-icon:not(variant=["text"])::part(base),
  :host.info.left-icon:not(variant=["text"])::part(base),
  :host.success.left-icon:not(variant=["text"])::part(base),
  :host.error.left-icon:not(variant=["text"])::part(base) {
    padding-inline-end: 12px;
  }

  :host.default.right-icon:not(variant=["text"])::part(base),
  :host.primary.right-icon:not(variant=["text"])::part(base),
  :host.info.right-icon:not(variant=["text"])::part(base),
  :host.success.right-icon:not(variant=["text"])::part(base),
  :host.error.right-icon:not(variant=["text"])::part(base) {
    padding-inline-start: 12px;
  }

  :host.default.left-icon etools-icon,
  :host.primary.left-icon etools-icon,
  :host.success.left-icon etools-icon,
  :host.error.left-icon etools-icon {
    margin-inline-end: 10px;
  }

  :host.info.left-icon etools-icon {
    margin-inline-end: 4px;
  }

  :host.default.right-icon etools-icon,
  :host.primary.right-icon etools-icon,
  :host.info.right-icon etools-icon,
  :host.success.right-icon etools-icon,
  :host.error.right-icon etools-icon {
    margin-inline-start: 10px;
  }

  :host .btn-label {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  :host::part(label) {
    text-transform: uppercase;
  }
  :host {
    --sl-button-font-size-medium: 16px;
    --sl-input-height-medium: 36px;
    --sl-spacing-medium: 8px;
    margin-inline-start: 5px;
    margin-inline-end: 5px;
    min-width: 82px;
  }
  
  :host::part(base) {
    border: none !important;
    align-items: center;
  }

  :host[variant='text'] {
    --sl-button-font-size-medium: 16px;
  }

  :host[variant='text']::part(label) {
    font-weight: 700;
  }

  :host.no-pad {
    --sl-spacing-medium: 0;
  }
  :host.no-marg {
    margin:0;
  }

  :host[variant='text'].neutral::part(base) {
    color: var(--sl-color-neutral-600);
  }

  :host[variant='text'].neutral::part(base):hover {
    color: var(--sl-color-neutral-500);
  }

  :host[variant='text'].font-14 {
    --sl-button-font-size-medium: 14px;
  }
`;
// language=HTML
export const buttonsStyles = css`
  ${unsafeCSS(buttonsStylesContent)}
`;