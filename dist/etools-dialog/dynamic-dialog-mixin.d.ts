import './etools-dialog.js';
/**
 * @polymer
 * @mixinFunction
 * @demo demo/index-dynamic.html
 * !!! DEPRECATED - use the exported methods form dynamic-dialog.js
 */
export declare const DynamicDialogMixin: (baseClass: any) => {
    new (): {
        [x: string]: any;
        createDialog(title: any, size: any, okBtnText: any, cancelBtnText: any, closeCallback: any, content: any, removePadding: any, theme: any): HTMLElement;
        createDynamicDialog(config: any): HTMLElement | null;
        _validateParams(config: any): boolean;
        _applyDefaultDialogConfig(dialog: any): void;
        removeDialog(dialogElement: any): void;
    };
    [x: string]: any;
};
