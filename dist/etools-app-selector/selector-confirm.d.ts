import { LitElement } from 'lit';
import '../etools-dialog/etools-dialog';
export declare class SelectorConfirm extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    language: string;
    content: string;
    confirmBtnText: string;
    cancelBtnText: string;
    connectedCallback(): void;
    handleLanguageChange(e: any): void;
    set dialogData({ content, confirmBtnText, cancelBtnText }: any);
    handleDialogClosed(confirmed: boolean): void;
}
