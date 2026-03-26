import { LitElement, CSSResult } from 'lit';
import { EtoolsUser } from '@unicef-polymer/etools-types';
import '../etools-icon-button/etools-icon-button';
import './selector-confirm';
export declare enum Applications {
    PMP = "pmp",
    EPD = "epd",
    ECN = "ecn",
    PRP = "prp",
    T2F = "t2f",
    AP = "ap",
    PSEA = "psea",
    FM = "fm",
    LM = "lastmile",
    APD = "apd",
    DASH = "dash",
    ADMIN = "admin",
    AMP = "amp",
    MENU = "menu",
    GPD = "government",
    RSS = "administration"
}
export declare enum GROUPS {
    TPM = "Third Party Monitor",
    USER = "UNICEF User",
    AUDITOR = "Auditor",
    CO_ADMINISTRATOR = "Country Office Administrator",
    RSS = "RSS"
}
export declare class AppSelector extends LitElement {
    static styles: CSSResult;
    language: string;
    iconTitle: string;
    baseSite: string;
    allowedAps: Applications[];
    hiddenApps: Applications[];
    opened: boolean;
    set user(user: EtoolsUser);
    private appPermissionsByGroup;
    render(): unknown;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleLanguageChange(e: any): void;
    handleKeyDown(e: KeyboardEvent): void;
    /**
     * Toggles the menu opened and closed
     *
     */
    toggleMenu(): void;
    checkAllowedApps(applications: Applications[]): boolean;
    goToPage(e: any): void;
    goToPageWithConfirm(e: any): void;
    private getPresetAllowedApps;
    private setPermissions;
    showGPD(user: any): any;
    hasVisibilityByPartnerGroups(user: any): any;
}
