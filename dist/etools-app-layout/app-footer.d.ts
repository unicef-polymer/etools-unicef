import { LitElement } from 'lit';
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
export declare class AppFooter extends LitElement {
    links: FooterLinkType[];
    render(): import("lit-html").TemplateResult<1>;
}
