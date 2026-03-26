import { Constructor } from '../utils/types';
declare global {
    interface Window {
        EtoolsLanguage: any;
    }
}
/**
 * @polymer
 * @mixinFunction
 * @demo demo/index-spinner.html
 */
export declare function DialogSpinnerMixin<T extends Constructor<any>>(baseClass: T): {
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
} & T;
