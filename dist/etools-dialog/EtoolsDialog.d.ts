import { LitElement } from 'lit';
import '@a11y/focus-trap/focus-trap.js';
import '../etools-loading/etools-loading.js';
import '../etools-button/etools-button.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.component.js';
import '../etools-button/etools-button.js';
declare const EtoolsDialog_base: {
    new (...args: any[]): {
        [x: string]: any;
        keepDialogOpen: boolean;
        showSpinner: boolean;
        spinnerText: string;
        language: string;
        connectedCallback(): void;
        disconnectedCallback(): void;
        handleLanguageChange(e: any): void;
        _confirmBtClicked(): void;
        startSpinner(): void;
        stopSpinner(): void;
    };
} & typeof LitElement;
/**
 * @customElement
 * @appliesMixin DialogSpinnerMixin
 * @demo demo/index.html
 */
export declare class EtoolsDialog extends EtoolsDialog_base {
    render(): import("lit-html").TemplateResult<1>;
    static get is(): string;
    dialogTitle: string;
    okBtnText: string;
    cancelBtnText: string;
    size: string;
    private _opened;
    get opened(): boolean;
    set opened(val: boolean);
    backdrop: boolean;
    modal: boolean;
    noPadding: boolean;
    disableConfirmBtn: boolean;
    disableDismissBtn: boolean;
    hideConfirmBtn: boolean;
    theme: string;
    confirmBtnVariant: string;
    noAutoFocus: boolean;
    showButtons: boolean;
    language: string;
    slDialog: SlDialog;
    constructor();
    initializeProperties(): void;
    protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleLanguageChange(e: any): void;
    getButtonsHTML(): import("lit-html").TemplateResult<1>;
    _cancelBtClicked(): void;
    getDialogClass(size: string, theme: string): string;
    getDialog(): Element | null | undefined;
    scrollDown(): void;
    /**
     * Trigger popup open event
     * @param boolean - If dialog is opened or closed
     */
    private triggerPopupOpenEvent;
}
export {};
