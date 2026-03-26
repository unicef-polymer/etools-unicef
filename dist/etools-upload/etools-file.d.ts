/**
 `etools-file`

 This element will allow you to select and prepare the files you are gonna upload.
 The component doesn't upload the files, it just manages an array of them, which is reachable from the parent component.

 ### Styling

 You can use defined variables to change element style.

 Custom property | Description | Default
 ----------------|-------------|----------
 `--etools-file-secondary-text-color` | Secondary text color | `rgba(255, 255, 255, 0.54)`
 `--etools-file-main-btn-color` | Main buttons text color(upload and download buttons) | `#00acff`
 `--etools-file-delete-btn-color` | Delete button text color | `#f1572a`
 `--etools-file-single-file-wrapper` | Mixin applied to single file name wrapper | `{}`
 `--etools-file-filename-container` | Mixin applied to the filename container | `{}`
 `--etools-file-readonly-filename-container` | Mixin applied to the filename container(only if it's readonly) | `{}`
 `--etools-file-actions-multiple` | Mixin applied to file action buttons container if multiple is `true` | `{}`
 `--etools-file-actions-single` | Mixin applied to file action buttons container for single file selection | `{}`
 `--etools-file-error` | Mixin applied to the error message element | `{}`
 `--etools-file-type-underline-color` | File type underline color | `rgba(0, 0, 0, 0.12)`
 `--etools-file-area-with-type-border-color` | File area with type underline color | `rgba(0, 0, 0, 0.12)`
 `--etools-file-label` | File type underline color | `rgba(0, 0, 0, 0.12)`
 `--etools-file-area-with-type` | File area with type mixin | `{}`
 `--etools-file-upload-button-paper-btn` | Upload btn paper-button mixin | `{}`
 `--etools-file-upload-button` | Upload button mixin | `{}`
 */
import { LitElement, PropertyValues } from 'lit';
import '../etools-button/etools-button';
import '../etools-icons/etools-icon';
import '../etools-dropdown/etools-dropdown';
import '../etools-button/etools-button';
import '../etools-input/etools-input';
declare const EtoolsFile_base: {
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
/**
 * @polymer
 * @customElement
 * @demo demo/index.html
 */
export declare class EtoolsFile extends EtoolsFile_base {
    render(): import("lit-html").TemplateResult<1>;
    label: string;
    files: any[];
    multiple: boolean;
    disabled: boolean;
    accept: string;
    uploadLabel: string;
    readonly: boolean;
    errorMessage: string;
    noFileAttachedMsg: string;
    fileModel: null;
    useDeleteEvents: boolean;
    activateFileTypes: boolean;
    showUploadDate: boolean;
    showUploadBtnAbove: boolean;
    fileTypes: never[];
    fileTypesLabel: string;
    hideDeleteBtn: boolean;
    toastFitInto: any;
    showFilesContainer: boolean;
    changeFileIndex: number;
    private fileInputEl;
    protected firstUpdated(changedProperties: PropertyValues): void;
    updated(changedProperties: PropertyValues): void;
    _formatUploadDate(uploadDate: any, fileId: any): string;
    _readonlyChanged(newValue: any): void;
    _hideDeleteBtn(file: any): any;
    _showFileType(fileTypesLength: any, readonly: any, _fileType: any): boolean;
    _showReadonlyType(_fileType: any, readonly: any): any;
    _getFileTypeStr(fileType: any): any;
    _findInAvailableFileTypes(fileType: any): null;
    _showLabel(label: any): boolean;
    _showUploadBtn(filesLength: any, readonly: any): boolean;
    _showNoFileAttachedMsg(filesLength: any, readonly: any): boolean;
    _showDownloadBtn(file: any): any;
    _getFileSelectedClass(file: any): "" | "only-selected";
    _openFileChooser(): void;
    _typeChanged(_event: any): void;
    _replaceFile(newFile: any): boolean | undefined;
    _addMultipleFiles(files: any): void;
    _checkFileAlreadySelected(file: any): any[];
    _displayAlreadySelectedWarning(filesAlreadySelected: any): void;
    _getFileModel(): any;
    _addSingleFile(file: any): void;
    _fileSelected(e: any): void;
    _changeFile(e: any): void;
    _deleteFile(e: any): void;
    _filesChange(): void;
    _downloadFile(e: any): void;
    _getMultipleClass(multiple: any): "" | "multiple";
}
export {};
