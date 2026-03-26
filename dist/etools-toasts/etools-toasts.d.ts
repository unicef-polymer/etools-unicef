import { LitElement, CSSResultArray } from 'lit';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import './etools-alert';
export type ToastOptions = {
    text: string;
    hideCloseBtn: boolean;
    duration?: number;
    variant?: string;
    icon?: string;
};
export declare const DefaultToastOptions: {
    duration: number;
    variant: string;
};
export declare class EtoolsToasts extends LitElement {
    private toastQueue;
    protected render(): unknown;
    connectedCallback(): void;
    closeAllToasts(): void;
    queueToast({ detail }: CustomEvent<ToastOptions>): void;
    showNext(index: any): void;
    static get styles(): CSSResultArray;
}
