import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import './etools-user-profile-dialog';
import {getTranslation} from './utils/translate';

/**
 * `etools-profile-dropdown`
 * User profile dropdown for header toolbar.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
@customElement('etools-profile-dropdown')
export class EtoolsProfileDropdown extends LitElement {
  private _profile: any;

  @state()
  private userProfileDialog!: any;

  @property({type: Boolean, reflect: true})
  opened: boolean = false;

  @property({type: Boolean, reflect: true})
  readonly: boolean = true;
  /**
   *
   * Expected structure of array elements :
   *
   *      el = {
   *        label: 'element label',
   *        value: '234'
   *      }
   * @type (ArrayBuffer|ArrayBufferView)
   */
  @property({type: Array})
  sections: any[] = [];

  /**
   *
   * Expected structure of array elements :
   *
   *      el = {
   *        label: 'element label',
   *        value: '234'
   *      }
   * @type (ArrayBuffer|ArrayBufferView)
   */
  @property({type: Array})
  offices: any;

  /**
   *
   * Expected structure of array elements :
   *
   *      user = {
   *        label: user.full_name,
   *        value: user.id
   *      }
   * @type (ArrayBuffer|ArrayBufferView)
   */
  @property({type: Object})
  users: any;

  /**
   *
   *  Profile object should be according to api endpoint
   *  `/users/myprofile/`
   *  and all modifications should be POSTed to the same endpoint
   */
  @property({type: Object})
  set profile(val) {
    this._profile = val;
    this._dataLoaded();
  }

  get profile() {
    return this._profile;
  }

  @property({type: Boolean, attribute: 'show-email', reflect: true})
  showEmail: boolean = false;

  @property({type: Boolean, attribute: 'hide-available-workspaces', reflect: true})
  hideAvailableWorkspaces: boolean = false;

  @property({type: Boolean})
  _loadingProfileMsgActive: boolean = false;

  @property({type: String})
  language: string = window.EtoolsLanguage || 'en';

  render() {
    // language=HTML
    return html`
      <style>
        #profile::part(base) {
          width: 60px;
          height: 60px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          --sl-border-radius-medium: 0;
          color: var(--header-secondary-text-color, rgba(255, 255, 255, 0.7));
        }

        :host([opened]) #profile::part(base) {
          color: var(--dark-scondary-text-color, rgba(0, 0, 0, 0.54));
          background: var(--primary-background-color, #ffffff);
        }

        sl-menu {
          --sl-border-radius-medium: 0;
          --sl-panel-border-width: 0;
          box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12),
            0 8px 10px -5px rgba(0, 0, 0, 0.4);
        }

        sl-dropdown::part(trigger) {
          position: relative;
          z-index: 2;
        }

        sl-dropdown {
          --sl-z-index-dropdown: 1;
        }

        sl-menu-item {
          color: var(--dark-scondary-text-color, rgba(0, 0, 0, 0.54));
        }
      </style>

      <sl-dropdown
        hoist
        placement="bottom-start"
        .open="${this.opened}"
        @sl-show="${() => {
          this.opened = true;
        }}"
        @sl-hide="${() => {
          this.opened = false;
        }}"
      >
        <sl-icon-button id="profile" name="social:person" slot="trigger" role="button"></sl-icon-button>
        <sl-menu>
          <sl-menu-item @click="${this._openUserProfileDialog}">
            <sl-icon slot="prefix" name="communication:textsms"></sl-icon>
            ${getTranslation(this.language, 'PROFILE')}
          </sl-menu-item>
          <sl-menu-item @click="${this._logout}">
            <sl-icon slot="prefix" name="refresh"></sl-icon>
            ${getTranslation(this.language, 'SIGN_OUT')}
          </sl-menu-item>
        </sl-menu>
      </sl-dropdown>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('language-changed', this._handleLanguageChange.bind(this));
    this.userProfileDialog = document.createElement('etools-user-profile-dialog');
    this.userProfileDialog.addEventListener('save-profile', this._dispatchSaveProfileEvent.bind(this));
    this.userProfileDialog.setAttribute('id', 'userProfileDialog');
    this.userProfileDialog.language = this.language;
    document.querySelector('body')!.appendChild(this.userProfileDialog);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this._handleLanguageChange.bind(this));
  }

  _handleLanguageChange(e) {
    this.language = e.detail.language;
  }

  _dispatchSaveProfileEvent(ev) {
    this.dispatchEvent(
      new CustomEvent('save-profile', {
        detail: ev.detail,
        bubbles: true,
        composed: true
      })
    );
  }

  _dataLoaded() {
    if (!this.userProfileDialog) {
      // Fixes timing issue
      return;
    }
    // if (this._allHaveValues('users', 'profile', 'offices', 'sections')) {
    if (this._allHaveValues('profile')) {
      this.userProfileDialog.profile = this.profile;
      this.userProfileDialog.language = this.language;
      // this.userProfileDialog.offices = this.offices;
      // this.userProfileDialog.users = this.users;
      // this.userProfileDialog.sections = this.sections;
      if (this._loadingProfileMsgActive) {
        this._loadingProfileMsgActive = false;
        this.dispatchEvent(new CustomEvent('global-loading', {bubbles: true, composed: true}));
      }
    }
  }

  _setDialogProfileData() {
    if (!this.profile) {
      return;
    }
    this.userProfileDialog.profile = JSON.parse(JSON.stringify(this.profile));
    this.userProfileDialog.language = this.language;
    this.userProfileDialog.showEmail = this.showEmail;
    this.userProfileDialog.hideAvailableWorkspaces = this.hideAvailableWorkspaces;
  }

  _allHaveValues(...args) {
    return args.reduce((hasVal, prop) => {
      return !this._isEmpty(this[prop]) && hasVal;
    }, true);
  }

  _isEmpty(value) {
    if (value == null) {
      return true;
    }
    for (var key in value) {
      if (this.hasOwnProperty.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  _logout() {
    this.dispatchEvent(new CustomEvent('sign-out', {bubbles: true, composed: true}));
    this.opened = false;
  }

  _openUserProfileDialog() {
    this._setDialogProfileData();
    this.userProfileDialog.openUserProfileDialog();
    // if (this._allHaveValues('users', 'profile', 'offices', 'sections')) {
    if (!this._allHaveValues('profile')) {
      this.dispatchEvent(
        new CustomEvent('global-loading', {
          detail: {active: true, message: 'Loading profile...'},
          bubbles: true,
          composed: true
        })
      );
      this._loadingProfileMsgActive = true;
    }
    this.opened = false;
  }

  _toggleMenu() {
    this.opened = !this.opened;
  }

  _isInPath(path, prop, value) {
    path = path || [];
    for (let i = 0; i < path.length; i++) {
      if (path[i][prop] === value) {
        return true;
      }
    }
    return false;
  }
}
