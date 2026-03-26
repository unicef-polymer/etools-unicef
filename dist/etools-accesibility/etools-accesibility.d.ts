import { LitElement } from 'lit';
import '../etools-media-query/etools-media-query';
import '../etools-icon-button/etools-icon-button';
import '@shoelace-style/shoelace/dist/components/popup/popup.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
export declare class EtoolsAccesibility extends LitElement {
    language: string;
    counter: number;
    optionsActiveStatus: {
        contrastMonochrome: boolean;
        contrastHard: boolean;
        contrastSoft: boolean;
        cursorBigWhite: boolean;
        cursorBigBlack: boolean;
        zoomScreen: boolean;
        readableText: boolean;
    };
    opened: boolean;
    protected render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    toggle(): void;
    handleLanguageChange(e: any): void;
    /**
     * Document Mouse Down handler function. On document mouse down it is hiding the dropdown popup
     * @param event MouseEvent
     */
    private handleDocumentMouseDown;
    /**
     * Define the following 2 classes in app-theme.css
     *  html.readableText { }
     *  html.contrastSoft { }
     */
    injectStyles(): void;
    setCSSVariables(vars: any): void;
    fontsChange(type: string): void;
    toggleOption(type: string, disableOthers?: string[]): void;
    reset(): void;
}
