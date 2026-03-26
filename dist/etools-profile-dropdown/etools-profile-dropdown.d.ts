import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '../etools-icons/etools-icon';
import '../etools-icon-button/etools-icon-button';
import './etools-user-profile-dialog';
/**
 * `etools-profile-dropdown`
 * User profile dropdown for header toolbar.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export declare class EtoolsProfileDropdown extends LitElement {
    private _profile;
    private userProfileDialog;
    opened: boolean;
    readonly: boolean;
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
    sections: any[];
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
    users: any;
    /**
     *
     *  Profile object should be according to api endpoint
     *  `/users/myprofile/`
     *  and all modifications should be POSTed to the same endpoint
     */
    set profile(val: any);
    get profile(): any;
    profileDialogComponent: string;
    showEmail: boolean;
    hideAvailableWorkspaces: boolean;
    _loadingProfileMsgActive: boolean;
    language: string;
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    _handleLanguageChange(e: any): void;
    _dispatchSaveProfileEvent(ev: any): void;
    _dataLoaded(): void;
    _setDialogProfileData(): void;
    _allHaveValues(...args: any[]): any;
    _isEmpty(value: any): boolean;
    _logout(): void;
    _openUserProfileDialog(): void;
    _toggleMenu(): void;
    _isInPath(path: any, prop: any, value: any): boolean;
}
