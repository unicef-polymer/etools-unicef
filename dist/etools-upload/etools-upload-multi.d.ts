import { LitElement } from 'lit';
import '../etools-button/etools-button';
import '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js';
import '../etools-icons/etools-icon';
declare const EtoolsUploadMulti_base: {
    new (...args: any[]): {
        [x: string]: any;
        activateOffline: boolean;
        connectedCallback(): void;
        getFileInfo(file: any): {
            id: string;
            filetype: any;
            filename: any;
            extraInfo: any;
            parentId: any;
            unsynced: boolean;
        };
    };
} & {
    new (...args: any[]): {
        [x: string]: any;
        endpointAcceptsMulti: boolean;
        cancelUpload: boolean;
        uploadEndpoint: string | null | undefined;
        endpointInfo: object | null | undefined;
        jwtLocalStorageKey: string;
        uploadRawFile(rawFile: any, requestKey: any, onProgressCallback: any): Promise<any>;
    };
} & {
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
} & typeof LitElement;
export declare class EtoolsUploadMulti extends EtoolsUploadMulti_base {
    uploadBtnLabel?: string;
    rawFiles?: [];
    _filenames?: any[];
    language?: string;
    render(): import("lit-html").TemplateResult<1>;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleLanguageChange(e: any): void;
    _filesSelected(e: any): void;
    _extractFilenames(files: any): any[];
    saveFilesInIndexedDb(files: any): Promise<{
        success: any[];
        error: string[];
    }>;
    _handleUpload(files: any): Promise<void>;
    _clearDisplayOfUploadedFiles(): void;
    _uploadAllFilesSequentially(files: any): Promise<any>;
    _computeUploadProgress(index: any, requestData: any): void;
    _updateFilename(index: any, mergeObj: any): void;
    _shouldDisableUploadBtn(readonly: any, uploadInProgress: any): any;
    _thereAreFilesSelected(_filenames: any): any;
    _cancelUpload(): void;
    resetRawFiles(): void;
}
export {};
