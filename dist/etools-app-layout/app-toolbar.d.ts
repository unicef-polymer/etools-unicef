import { LitElement } from 'lit';
export declare class AppToolbar extends LitElement {
    responsiveWidth: string;
    language: string;
    profile: any;
    headerColor: string;
    hideAppMenu: boolean;
    hideLogo: boolean;
    hideAppSelector: boolean;
    textUnderLogo: string;
    protected render(): import("lit-html").TemplateResult<1>;
    slotLeft(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleLanguageChange(e: any): void;
    private setBgColor;
}
