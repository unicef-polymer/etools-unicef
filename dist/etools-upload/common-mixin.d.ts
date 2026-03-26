import { Constructor } from '../utils/types';
export declare function CommonMixin<T extends Constructor<any>>(baseClass: T): {
    new (...args: any[]): {
        [x: string]: any;
        uploadInProgress: boolean;
        label: string;
        required: boolean;
        readonly: boolean;
        accept: string;
        autoUpload: boolean;
        disabled: boolean;
        _invalid: boolean;
        autoValidate: boolean;
        errorMessage: string;
        openInNewTab: boolean;
        invalid: boolean;
        _invalidChanged(): void;
        _showLabel(label: any): boolean;
        _openFileChooser(): void;
        fireEvent(evName: string, detail?: any): void;
        downloadFile(filename: any, url: any, openInNewTab: any): void;
        prepareErrorMessage(lang: any, error: any): any;
    };
} & T;
