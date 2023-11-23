import {css, unsafeCSS} from 'lit';
export const buttonsGroupStylesContent = `
        :host {
          display: flex;
          background: var(--etools-button-group-color, --sl-color-primary-600);
          flex: 1;
        }
        :host::part(base) {
          width: 100%;
        }
`;
// language=HTML
export const buttonsGroupStyles = css`
  ${unsafeCSS(buttonsGroupStylesContent)}
`;
