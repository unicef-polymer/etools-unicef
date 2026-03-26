import { LitElement } from 'lit';
import '../etools-button/etools-button.js';
import '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js';
import '../etools-icons/etools-icon.js';
declare const EtoolsUpload_base: import("@unicef-polymer/etools-types").Constructor<import("./uploads-mixin.js").IUploadsClass> & {
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
export declare class EtoolsUpload extends EtoolsUpload_base {
    uploadBtnLabel?: string | null | undefined;
    noLabelFloat: boolean | undefined;
    alwaysFloatLabel?: boolean | null | undefined;
    _fileUrl?: string | null | undefined;
    _filename?: string | null | undefined;
    _rawFile?: File | null | undefined;
    showDeleteBtn?: boolean | null | undefined;
    originalErrorMessage?: string | null | undefined;
    serverErrorMsg?: string | null | undefined;
    success?: boolean | null | undefined;
    fail?: boolean | null | undefined;
    showChange?: boolean | null | undefined;
    allowMultilineFilename?: boolean | null | undefined;
    uploadProgressValue?: string | null | undefined;
    uploadProgressMsg?: string | null | undefined;
    language?: string | null | undefined;
    _cancelTriggered?: boolean | null | undefined;
    _savedFileUrl?: string | null | undefined;
    trackUploadStatus?: boolean;
    render(): import("lit-html").TemplateResult<1>;
    set fileUrl(url: string | null | undefined);
    get fileUrl(): string | null | undefined;
    set rawFile(file: File | null | undefined);
    get rawFile(): File | null | undefined;
    set uploadedFileInfo(info: any);
    constructor();
    initializeProperties(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleLanguageChange(e: any): void;
    _thereIsAFileSelectedOrSaved(_filename: any): boolean;
    _fileSelected(e: any): void;
    _fireChangeFileEventIfApplicable(): void;
    _handleUpload(): Promise<void>;
    saveFileInIndexedDb(file: any): Promise<{
        success: {
            id: string;
            filetype: any;
            filename: any;
            extraInfo: any;
            parentId: any;
            unsynced: boolean;
        };
        error?: undefined;
    } | {
        error: unknown;
        success?: undefined;
    }>;
    setInvalid(invalid: any, errMsg: any): void;
    resetValidations(): void;
    resetStatus(): void;
    setUploadProgress(requestData: any): void;
    resetUploadProgress(): void;
    _fileUrlChanged(fileUrl: any): void;
    getFilenameFromURL(url: any): string | undefined;
    _showDownloadBtn(fileUrl: any): boolean;
    _showChange(readonly: any, _filename: any, uploadInProgress: any, showChange?: boolean): any;
    _showDeleteBtn(readonly: any, _filename: any, showDeleteBtn: any, uploadInProgress: any): any;
    _showCancelBtn(uploadInProgress: any, fileUrl: any, fail: any): any;
    _cancelUpload(): void;
    _deleteFile(): void;
    _changeFile(): void;
    _resetFilename(): void;
    isNotNumber(value?: string | null): boolean;
    resetRawFile(): void;
    _downloadFile(_e: any): void;
    validate(): boolean;
    autoValidateHandler(): void;
    _invalidChanged(): void;
    validFileType(fileName: any): boolean;
    _getFileExtension(fileName: any): any;
    customClassMap(classes: any): string;
}
export {};
