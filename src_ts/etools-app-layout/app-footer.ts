import {Environment} from '@unicef-polymer/etools-utils/dist/singleton/environment';
import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';

export interface FooterLinkType {
  url: string;
  label: string;
  target?: string;
}
/**
 * page footer element
 * @LitElement
 * @customElement
 */
@customElement('app-footer')
export class AppFooter extends LitElement {
  @property({type: Array})
  links: FooterLinkType[] = [];

  render() {
    // main template
    // language=HTML
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: flex-end;
          padding: 18px 24px;
          width: 100%;
          min-height: 90px;
          box-sizing: border-box;
        }

        #footer-content {
          display: flex;
          flex-direction: row;
        }

        #unicef-logo {
          display: flex;
          flex-direction: row;
          display: inline-flex;
          padding-inline-end: 30px;
        }

        #unicef-logo img {
          height: 28px;
          width: 115px;
        }

        .footer-link {
          margin: auto 16px;
          color: var(--secondary-text-color);
          text-decoration: none;
        }

        .footer-link:first-of-type {
          margin-inline-start: 30px;
        }

        @media print {
          :host {
            display: none;
          }
        }
      </style>
      <footer>
        <div id="footer-content">
          <span id="unicef-logo">
            <img src="${Environment.basePath}assets/images/UNICEF_logo.webp" alt="UNICEF logo" />
          </span>
          ${repeat(
            this.links,
            (item) => item.url,
            (item) =>
              html`<a href="${item.url}" target="${item.target || '_blank'}"
                ><span class="footer-link">${item.label}</span></a
              >`
          )}
        </div>
      </footer>
    `;
  }
}
