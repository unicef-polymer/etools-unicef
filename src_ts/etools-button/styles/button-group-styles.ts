import {css, unsafeCSS} from 'lit';
export const buttonsGroupStylesContent = `
        :host {
          display: flex;
          background: var(--etools-button-group-color, --sl-color-primary-600);
          flex: 1;
          border-radius: var(--sl-input-border-radius-medium);
        }

        :host::part(base) {
          width: 100%;
        }

        ::slotted(etools-button) {
          margin-inline: 0;
        }
`;
// language=HTML
export const buttonsGroupStyles = css`
  ${unsafeCSS(buttonsGroupStylesContent)}
`;
