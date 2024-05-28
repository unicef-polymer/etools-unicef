import {html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {fireEvent} from '@unicef-polymer/etools-utils/dist/fire-event.util';
import {Environment, EnvironmentType} from '@unicef-polymer/etools-utils/dist/singleton/environment';

@customElement('app-toolbar')
export class AppToolbar extends LitElement {
  @property({type: String, attribute: 'responsive-width'})
  responsiveWidth = '850px';

  @property({type: String, attribute: 'language'})
  language = '';

  @property({type: Object})
  profile!: any;

  @state()
  headerColor = 'var(--header-bg-color)';

  @property({type: Boolean, attribute: 'hide-app-menu'})
  hideAppMenu = false;

  @property({type: Boolean, attribute: 'hide-logo'})
  hideLogo = false;

  @property({type: Boolean, attribute: 'hide-app-selector'})
  hideAppSelector = false;

  protected render() {
    return html`
      <style>
        :host {
          background-color: ${this.headerColor};
          display: flex;
          flex-direction: row;
          align-items: center;
          position: relative;
          min-height: 60px;
          user-select: none;
          color: var(--header-color);
          font-size: var(--app-toolbar-font-size, var(--etools-font-size-20, 20px));
        }

        .nav-menu-button {
          height: 60px;
          margin-inline-start: 16px;
        }

        @media (min-width: ${this.responsiveWidth}) {
          #menuButton {
            display: none;
          }
        }

        @media (max-width: calc(${this.responsiveWidth} - 1px)) {
          etools-app-selector {
            --app-selector-button-padding: 10px 0px;
            width: auto;
            border-inline-end: 0;
          }
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          margin-inline-start: 10px;
          flex-direction: column;
        }

        .logo-wrapper .logo {
          height: 28px;
          width: auto;
        }

        .logo-wrapper .envWarning {
          color: #000;
          background-color: var(--header-color);
          font-weight: 700;
          font-size: var(--etools-font-size-12, 12px);
          line-height: 1;
          padding: 2px 0;
          text-transform: uppercase;
          border-radius: 10px;
          width: 100%;
          text-align: center;
          box-sizing: border-box;
          margin-top: 2px;
        }

        .toolbar {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: 100%;
          align-items: center;
        }

        .left,
        ::slotted([slot='left']),
        ::slotted([slot='dropdowns']),
        ::slotted([slot='icons']) {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
        }

        ::slotted([slot='left']),
        .left {
          order: 1;
        }

        ::slotted([slot='dropdowns']) {
          order: 2;
        }

        ::slotted([slot='icons']) {
          order: 3;
          margin-inline-end: 16px;
        }

        .toolbar .left,
        ::slotted([slot='left']) {
          margin-inline-end: auto;
        }

        ::slotted([slot='dropdowns']),
        ::slotted([slot='icons']) {
          flex-wrap: nowrap;
          flex-direction: row;
          display: flex;
          align-items: center;
          place-content: flex-end;
          margin-inline-end: 16px;
        }

        @media (max-width: 720px) {
          .logo-wrapper {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .toolbar {
            flex-wrap: wrap;
          }

          ::slotted([slot='icons']) {
            order: 2;
          }

          :host-context(html[dir='rtl']) ::slotted([slot='left']) {
            order: 2;
          }

          :host-context(html[dir='rtl']) ::slotted([slot='icons']) {
            order: 1;
          }

          ::slotted([slot='dropdowns']) {
            order: 3;
            flex: 100%;
            margin: 0 16px;
            align-items: center !important;
            place-content: flex-end !important;
          }
        }
      </style>
      <div class="toolbar">
        <slot name="left"> ${this.slotLeft()} </slot>
        <slot name="dropdowns"></slot>
        <slot name="icons"></slot>
      </div>
    `;
  }

  slotLeft() {
    return html`<div class="left">
      ${!this.hideAppMenu
        ? html`<etools-icon-button
            id="menuButton"
            class="nav-menu-button"
            name="menu"
            @click="${() => {
              fireEvent(this, 'menu-button-clicked');
            }}"
          ></etools-icon-button>`
        : html``}
      ${!this.hideAppSelector
        ? html`<etools-app-selector
            id="selector"
            .user="${this.profile}"
            .language="${this.language}"
          ></etools-app-selector>`
        : html``}
      ${!this.hideLogo
        ? html`<div class="logo-wrapper">
            <img
              id="app-logo"
              class="logo"
              src="${Environment.baseUrl}assets/images/etools-logo-color-white.svg"
              alt="eTools"
            />
            ${Environment.is(EnvironmentType.PROD)
              ? ``
              : html`<div class="envWarning" title="${Environment.get().toUpperCase()} TESTING ENVIRONMENT">
                  ${Environment.get()}
                </div>`}
          </div>`
        : html``}
    </div>`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setBgColor();
    document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  handleLanguageChange(e: any) {
    this.language = e.detail.language;
  }

  private setBgColor(): void {
    // If not production environment, changing header color to red
    if (!Environment.is(EnvironmentType.PROD)) {
      this.headerColor = 'var(--nonprod-header-color)';
    }
  }
}
