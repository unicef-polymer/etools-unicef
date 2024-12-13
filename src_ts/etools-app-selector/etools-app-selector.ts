import {LitElement, html, css, CSSResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {
  adminIcon,
  apdIcon,
  dashIcon,
  externalIcon,
  famIcon,
  fmIcon,
  pmpIcon,
  pseaIcon,
  tpmIcon,
  tripsIcon,
  unppIcon,
  ampIcon,
  menuIcon,
  storageIcon
} from './app-selector-icons';
import {EtoolsUser, UserGroup} from '@unicef-polymer/etools-types';
import '../etools-icon-button/etools-icon-button';
import {getTranslation} from './utils/translate';

export enum Applications {
  PMP = 'pmp',
  EPD = 'epd',
  T2F = 't2f',
  TPM = 'tpm',
  AP = 'ap',
  PSEA = 'psea',
  FM = 'fm',
  LM = 'lastmile',
  APD = 'apd',
  DASH = 'dash',
  ADMIN = 'admin',
  AMP = 'amp',
  MENU = 'menu'
}

export enum GROUPS {
  TPM = 'Third Party Monitor',
  USER = 'UNICEF User',
  AUDITOR = 'Auditor',
  CO_ADMINISTRATOR = 'Country Office Administrator'
}

@customElement('etools-app-selector')
export class AppSelector extends LitElement {
  // language=css
  static styles: CSSResult = css`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 73px;
      height: 60px;
      align-items: center;
      justify-content: center;
      border-inline-end: 1px solid var(--light-divider-color, rgba(255, 255, 255, 0.12));
    }

    :host([opened]) {
      background: #ffffff;
    }

    apps-button {
      color: var(--header-secondary-text-color, rgba(255, 255, 255, 1));
    }

    .dropdown {
      position: absolute;
      inset-inline-start: 0;
      top: 60px;
      box-shadow:
        0 16px 24px 2px rgba(0, 0, 0, 0.14),
        0 6px 30px 5px rgba(0, 0, 0, 0.12),
        0 8px 10px -5px rgba(0, 0, 0, 0.4);
      background-color: #ffffff;
      transition: 0.3s;
      transform-origin: top;
      transform: scaleY(0);
      z-index: 90;
    }

    :host([opened]) .dropdown {
      transform: scaleY(1);
    }

    .apps-select {
      position: absolute;
      background: var(--primary-element-background, #ffffff);
      top: 60px;
      z-index: 100;
      padding: 0;
    }

    .content-wrapper {
      display: flex;
      align-items: stretch;
      flex-direction: row;
      padding: 5px;
      box-sizing: border-box;
      font-size: var(--etools-font-size-14, 14px);
      white-space: nowrap;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      border-left: 1px solid rgba(0, 0, 0, 0.12);
      width: 179px;
      align-items: center;
    }

    .content-wrapper:hover {
      background: var(--app-selector-item-hover-color, #eeeeee);
    }

    .empty-wrapper {
      border-left: none;
    }

    .empty-wrapper:hover {
      background: transparent;
    }

    .app-title {
      font-size: var(--etools-font-size-13, 13px);
      font-weight: 500;
      padding-left: 6px;
      padding-right: 6px;
      line-height: 1.2;
      cursor: pointer;
      white-space: normal;
      display: block;
      justify-content: center;
      max-width: 116px;
    }

    .etools-apps {
      width: 360px;
    }

    svg #adminIcon path.option,
    svg #externalIcon path.option {
      fill: var(--dark-icon-color, #cccccc);
    }

    #externalIcon {
      min-width: 16px;
    }

    .admin {
      display: flex;
      align-items: center;
      padding-left: 4px;
      width: 50%;
      box-sizing: border-box;
    }

    .gray {
      background: #eeeeee;
    }

    a,
    a:link,
    a:visited,
    a:hover,
    a:active {
      color: var(--app-selector-text-color, rgba(0, 0, 0, 0.87));
      text-decoration: none;
    }

    .module-group {
      border-right: 1px solid rgba(0, 0, 0, 0.12);
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .module-group-title {
      text-transform: capitalize;
      font-weight: 450;
      padding: 6px;
      background: #eeeeee;
      font-size: var(--etools-font-size-12, 12px);
      border-right: 1px solid var(--divider-color);
      border-left: 1px solid var(--divider-color);
      display: flex;
      color: #444444;
    }

    .datamart #storageIcon path {
      fill: var(--light-theme-secondary-color, rgba(0, 0, 0, 0.54));
    }
  `;

  @property({type: String, attribute: 'language'})
  language: string = window.EtoolsLanguage || 'en';

  @property({type: String})
  iconTitle = 'APP_SELECTOR';

  @property({type: String})
  baseSite: string = window.location.origin;

  @property({type: Array})
  allowedAps: Applications[] = [];

  @property({type: Boolean, attribute: 'opened', reflect: true})
  opened = false;

  set user(user: EtoolsUser) {
    this.setPermissions(user);
  }

  private appPermissionsByGroup: Map<Applications, string[]> = new Map([
    [Applications.DASH, [GROUPS.USER]],
    [Applications.PMP, [GROUPS.USER]],
    [Applications.T2F, [GROUPS.USER]],
    [Applications.TPM, [GROUPS.USER, GROUPS.TPM]],
    [Applications.AP, [GROUPS.USER, GROUPS.AUDITOR]],
    [Applications.APD, [GROUPS.USER]],
    [Applications.FM, [GROUPS.USER, GROUPS.TPM]]
  ]);

  render(): unknown {
    return html`
      <style>
        etools-icon-button.apps-button {
          display: flex;
          flex-direction: row;
          --etools-icon-font-size: var(--etools-font-size-24, 24px);
          padding: var(--app-selector-button-padding, 10px 16px 10px 16px);
          color: var(--header-secondary-text-color, rgba(255, 255, 255, 1));
          z-index: 100;
          box-sizing: content-box !important;
        }

        etools-icon-button.icon-opened {
          background: #ffffff;
          color: var(--dark-primary-text-color, rgba(0, 0, 0, 0.87));
        }
      </style>
      <etools-icon-button
        .label="${this.iconTitle === 'APP_SELECTOR' ? getTranslation(this.language, 'APP_SELECTOR') : this.iconTitle}"
        .title="${this.iconTitle === 'APP_SELECTOR' ? getTranslation(this.language, 'APP_SELECTOR') : this.iconTitle}"
        @click="${this.toggleMenu}"
        class="apps-button ${this.opened ? 'icon-opened' : ''}"
        name="apps"
      ></etools-icon-button>

      <div class="dropdown">
        ${this.opened
          ? html`
                        <div class="etools-apps">
                            <span class="module-group-title">${getTranslation(
                              this.language,
                              'PROGRAMME_MANAGEMENT'
                            )}</span>
                            <div class="module-group">
                                <a
                                        class="content-wrapper"
                                        rel="external"
                                        @click="${this.goToPage}"
                                        href="https://www.unpartnerportal.org/login"
                                        target="_blank"
                                >
                                    ${unppIcon}
                                    <div class="app-title">${getTranslation(this.language, 'UN_PARTNER_PORTAL')}</div>
                                    ${externalIcon}
                                </a>
                                ${
                                  this.checkAllowedApps([Applications.PMP])
                                    ? html`
                                        <a
                                          class="content-wrapper"
                                          rel="external"
                                          @click="${this.goToPage}"
                                          href="${this.baseSite}/${Applications.PMP}/"
                                        >
                                          ${pmpIcon}
                                          <div class="app-title">
                                            ${getTranslation(this.language, 'PARTNERSHIP_MANAGEMENT')}
                                          </div>
                                        </a>
                                      `
                                    : ''
                                }
                                ${
                                  this.checkAllowedApps([Applications.EPD])
                                    ? html`
                                        <a
                                          class="content-wrapper"
                                          rel="external"
                                          @click="${this.goToPage}"
                                          href="${this.baseSite}/${Applications.EPD}/"
                                        >
                                          ${pmpIcon}
                                          <div class="app-title">${getTranslation(this.language, 'EPD')}</div>
                                        </a>
                                      `
                                    : ''
                                }
                            </div>

                            ${
                              this.checkAllowedApps([
                                Applications.T2F,
                                Applications.AP,
                                Applications.TPM,
                                Applications.PSEA
                              ])
                                ? html`
                                    <span class="module-group-title"
                                      >${getTranslation(this.language, 'MONITORING_ASSURANCE')}</span
                                    >
                                    <div class="module-group">
                                      ${this.checkAllowedApps([Applications.T2F])
                                        ? html`
                                            <a
                                              class="content-wrapper"
                                              rel="external"
                                              @click="${this.goToPage}"
                                              href="${this.baseSite}/${Applications.T2F}/"
                                            >
                                              ${tripsIcon}
                                              <div class="app-title">
                                                ${getTranslation(this.language, 'TRIP_MANAGEMENT')}
                                              </div>
                                            </a>
                                          `
                                        : ''}
                                      ${this.checkAllowedApps([Applications.TPM])
                                        ? html`
                                            <a
                                              class="content-wrapper"
                                              rel="external"
                                              @click="${this.goToPage}"
                                              href="${this.baseSite}/${Applications.TPM}/"
                                            >
                                              ${tpmIcon}
                                              <div class="app-title">
                                                ${getTranslation(this.language, 'THIRD_PARTY_MONITORING')}
                                              </div>
                                            </a>
                                          `
                                        : ''}
                                      ${this.checkAllowedApps([Applications.AP])
                                        ? html`
                                            <a
                                              class="content-wrapper"
                                              rel="external"
                                              @click="${this.goToPage}"
                                              href="${this.baseSite}/${Applications.AP}/"
                                            >
                                              ${famIcon}
                                              <div class="app-title">
                                                ${getTranslation(this.language, 'FINANCIAL_ASSURANCE')}
                                              </div>
                                            </a>
                                          `
                                        : ''}
                                      ${this.checkAllowedApps([Applications.PSEA])
                                        ? html`
                                            <a
                                              class="content-wrapper"
                                              rel="external"
                                              @click="${this.goToPage}"
                                              href="${this.baseSite}/${Applications.PSEA}/"
                                            >
                                              ${pseaIcon}
                                              <div class="app-title">
                                                ${getTranslation(this.language, 'PSEA_ASSURANCE')}
                                              </div>
                                            </a>
                                          `
                                        : ''}
                                      ${this.checkAllowedApps([Applications.FM])
                                        ? html`
                                            <a
                                              class="content-wrapper"
                                              rel="external"
                                              @click="${this.goToPage}"
                                              href="${this.baseSite}/${Applications.FM}/"
                                            >
                                              ${fmIcon}
                                              <div class="app-title">
                                                ${getTranslation(this.language, 'FIELD_MONITORING')}
                                              </div>
                                            </a>
                                          `
                                        : ''}
                                    </div>
                                  `
                                : ''
                            }

                            <span class="module-group-title">${getTranslation(
                              this.language,
                              'DASHBOARDS_ANALYTICS'
                            )}</span>
                            <div class="module-group">
                                ${
                                  this.checkAllowedApps([Applications.APD])
                                    ? html`
                                        <a
                                          class="content-wrapper"
                                          rel="external"
                                          @click="${this.goToPage}"
                                          href="${this.baseSite}/${Applications.APD}/"
                                        >
                                          ${apdIcon}
                                          <div class="app-title">${getTranslation(this.language, 'ACTION_POINTS')}</div>
                                        </a>
                                      `
                                    : ''
                                }
                                ${
                                  this.checkAllowedApps([Applications.DASH])
                                    ? html`
                                        <a
                                          class="content-wrapper"
                                          rel="external"
                                          @click="${this.goToPage}"
                                          href="${this.baseSite}/${Applications.DASH}/"
                                        >
                                          ${dashIcon}
                                          <div class="app-title">${getTranslation(this.language, 'DASHBOARDS')}</div>
                                        </a>
                                      `
                                    : ''
                                }

                                <a class="datamart content-wrapper" rel="external" href="https://datamart.unicef.io"
                                   target="_blank">
                                    ${storageIcon}
                                    <div class="app-title">${getTranslation(this.language, 'DATAMART')}</div>
                                    ${externalIcon}
                                </a>
                            </div>
                        </div>
                        ${
                          this.checkAllowedApps([Applications.AMP])
                            ? html`
                                <span class="module-group-title"
                                  >${getTranslation(this.language, 'ADMINISTRATION')}</span
                                >
                                <div class="module-group">
                                  <a
                                    class="content-wrapper"
                                    rel="external"
                                    @click="${this.goToPage}"
                                    href="${this.baseSite}/${Applications.AMP}/"
                                  >
                                    ${ampIcon}
                                    <div class="app-title">${getTranslation(this.language, 'AMP')}</div>
                                  </a>
                                  <div class="content-wrapper empty-wrapper"></div>
                                </div>
                              `
                            : ''
                        }
                        <div class="module-group gray">
                        ${
                          this.checkAllowedApps([Applications.ADMIN])
                            ? html`
                                <a class="admin" rel="external" href="${this.baseSite}/${Applications.ADMIN}/">
                                  ${adminIcon}
                                  <div class="app-title">${getTranslation(this.language, 'ADMIN')}</div>
                                </a>
                              `
                            : ''
                        }
                         <a class="admin" rel="external" href="${this.baseSite}/${Applications.MENU}/">
                            ${menuIcon}
                            <div class="app-title">${getTranslation(this.language, 'MENU')}</div>
                          </a>
                        </div>
                      </div>
                    `
          : ''}
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', () => {
      this.opened = false;
    });
    document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.addEventListener('click', (e: Event) => e.stopPropagation());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleLanguageChange(e: any) {
    this.language = e.detail.language;
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.opened = false;
      const button = this.shadowRoot?.querySelector<HTMLElement>('etools-icon-button');
      if (button) {
        button.focus();
      }
    }
  }

  /**
   * Toggles the menu opened and closed
   *
   */
  toggleMenu(): void {
    this.opened = !this.opened;
  }

  checkAllowedApps(applications: Applications[]): boolean {
    return applications.some((application: Applications) => this.allowedAps.includes(application));
  }

  // [ch14186], https://github.com/unicef-polymer/etools-app-selector/pull/54/files
  goToPage(e: any): void {
    const path: string = (e.target! as HTMLElement).closest('a')?.getAttribute('href') || '';
    if (!e.ctrlKey && !e.metaKey) {
      window.location.href = path;
    }
  }

  private getPresetAllowedApps(user: EtoolsUser) {
    // show AMP app for all users
    const allowedApplications: Applications[] = [Applications.AMP];
    // check admin app
    const isAdmin = Boolean(
      Boolean(user.is_superuser) || (user.groups || []).find(({name}: UserGroup) => name === GROUPS.CO_ADMINISTRATOR)
    );
    if (isAdmin) {
      allowedApplications.push(Applications.ADMIN);
    }
    // check psea app
    const isTPM: boolean = (user.groups || []).some(({name}: UserGroup) => name === GROUPS.TPM);
    const isAuditor: boolean = (user.groups || []).some(({name}: UserGroup) => name === GROUPS.AUDITOR);
    if (!isTPM) {
      allowedApplications.push(Applications.PSEA);
    }
    if (!user.is_unicef_user && !isTPM && !isAuditor) {
      allowedApplications.push(Applications.EPD);
    }
    return allowedApplications;
  }

  private setPermissions(user: EtoolsUser): void {
    if (!user) {
      this.allowedAps = [];
      return;
    }
    const allowedApplications: Applications[] = this.getPresetAllowedApps(user);

    // check apps permissions
    for (const [application, groups] of this.appPermissionsByGroup) {
      const appAllowed: boolean = (user.groups || []).some(({name}: UserGroup) => groups.includes(name));
      if (appAllowed) {
        allowedApplications.push(application);
      }
    }
    this.allowedAps = allowedApplications;
  }
}
