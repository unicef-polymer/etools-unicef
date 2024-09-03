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

import {LitElement, PropertyValues, html} from 'lit';
import {property, customElement, query} from 'lit/decorators.js';
import {prettyDate} from '@unicef-polymer/etools-utils/dist/date.util';
import {fireEvent} from '@unicef-polymer/etools-utils/dist/fire-event.util';
import '../etools-button/etools-button';
import '../etools-icons/etools-icon';
import '../etools-dropdown/etools-dropdown';
import '../etools-button/etools-button';
import '../etools-input/etools-input';
import {CommonStyles} from './common-styles';
import {CommonMixin} from './common-mixin';
import {getTranslation} from './utils/translate';

/**
 * @polymer
 * @customElement
 * @demo demo/index.html
 */
@customElement('etools-file')
export class EtoolsFile extends CommonMixin(LitElement) {
  render() {
    // language=HTML
    return html`
      ${CommonStyles}
      <style>
        .toast-style {
          min-width: 330px;
        }
        .main-panel {
          text-align: left;
        }
      </style>

      <div class="main-panel" ?disabled="${this.disabled}" ?invalid="${this.invalid}">
        <label id="element-label" ?hidden="${!this._showLabel(this.label)}" aria-hidden="true">${this.label}</label>
        <div class="input">
          <div class="files-container  ${this._getMultipleClass(this.multiple)}">
            <div class="files-wrapper" ?hidden="${!this.showFilesContainer}">
              ${(this.files || []).map((file: any, index: number) => {
                html`<div class="file-area">
                  <div class="selected-file-container ${this._getFileSelectedClass(file)}">
                    ${this.showUploadDate
                      ? html` <div class="upload-date">
                          <div>
                            <label>Upload Date</label>
                            <div>${this._formatUploadDate(file.created, file.id)}</div>
                          </div>
                        </div>`
                      : ``}
                    <div class="file-name-wrapper">
                      <etools-icon class="file-icon" name="attachment"></etools-icon>
                      <span class="file-name" .title="${file.file_name}">${file.file_name}</span>
                    </div>

                    ${this._showReadonlyType(file.type, this.readonly)
                      ? html` <div class="file-type-input-wrapper">
                          <etools-input
                            class="file-type-input"
                            .label="${this.fileTypesLabel}"
                            .value="${this._getFileTypeStr(file.type)}"
                            placeholder="—"
                            readonly
                          >
                          </etools-input>
                        </div>`
                      : ``}
                    ${this._showFileType(this.fileTypes.length, this.readonly, file.type)
                      ? html`
                          <etools-dropdown
                            id="typeDropdown_${index}"
                            label="${this.fileTypesLabel}"
                            placeholder="&#8212;"
                            .selected="${file.type}"
                            .options="${this.fileTypes}"
                            option-value="id"
                            option-label="name"
                            @etools-selected-item-changed="${this._typeChanged}"
                            trigger-value-change-event
                            hide-search
                          >
                          </etools-dropdown>
                        `
                      : ``}
                  </div>

                  <div class="file-actions ${this._getFileSelectedClass(file)}">
                    <!-- download btn if file was uploaded -->
                    <etools-button
                      variant="text"
                      class="download-button primary-btn"
                      size="small"
                      index="${index}"
                      @click="${this._downloadFile}"
                      ?disabled="${!this._showDownloadBtn(file)}"
                      ?hidden="${!this._showDownloadBtn(file)}"
                      title="${getTranslation(this.language, 'DOWNLOAD')}"
                    >
                      <etools-icon slot="prefix" name="cloud-download" class="dw-icon"></etools-icon>
                      ${getTranslation(this.language, 'DOWNLOAD')}
                    </etools-button>

                    <etools-button
                      variant="text"
                      size="small"
                      class="change-button"
                      index="${index}"
                      @click="${this._changeFile}"
                      ?disabled="${this.readonly}"
                      ?hidden="${this.readonly}"
                    >
                      ${getTranslation(this.language, 'CHANGE')}
                    </etools-button>

                    <etools-button
                      variant="text"
                      size="small"
                      class="delete-button"
                      @click="${this._deleteFile}"
                      ?disabled="${this.readonly}"
                      ?hidden="${this._hideDeleteBtn(file)}"
                    >
                      ${getTranslation(this.language, 'DELETE')}
                    </etools-button>
                  </div>
                </div> `;
              })}
            </div>

            <div class="upload-button-wrapper" ?hidden="${!this._showUploadBtn(this.files.length, this.readonly)}">
              <span>
                <etools-button
                  variant="text"
                  size="small"
                  class="upload-button"
                  .title="${this.uploadLabel}"
                  ?disabled="${this.readonly}"
                  @click="${this._openFileChooser}"
                >
                  <etools-icon slot="prefix" name="file-upload"></etools-icon>
                  ${this.uploadLabel}
                </etools-button>
              </span>
            </div>
            <div
              class="no-file-and-readonly"
              ?hidden="${!this._showNoFileAttachedMsg(this.files.length, this.readonly)}"
            >
              ${this.noFileAttachedMsg}
            </div>
          </div>

          <input
            hidden
            type="file"
            id="fileInput"
            @change="${this._fileSelected}"
            .multiple="${this.multiple}"
            .accept="${this.accept}"
          />

          <a id="downloader"></a>
        </div>

        <div part="invalid-message" class="invalid-message" ?visible="${this.invalid && this.errorMessage}">
          ${this.errorMessage}
        </div>
      </div>
    `;
  }

  @property({type: String}) label = 'File attachment';
  @property({type: Array}) files: any[] = [];
  @property({type: Boolean}) multiple = false;
  @property({type: Boolean}) disabled = false;
  @property({type: String}) accept!: string;
  @property({type: String}) uploadLabel = 'Upload File';
  @property({type: Boolean, reflect: true}) readonly = false; //   observer: '_readonlyChanged'
  @property({type: String}) errorMessage = '';
  @property({type: String}) noFileAttachedMsg = 'No file attached';
  @property({type: Object}) fileModel = null;
  @property({type: Boolean}) useDeleteEvents = false;
  @property({type: Boolean, reflect: true}) activateFileTypes = false;
  @property({type: Boolean, reflect: true}) showUploadDate = false;
  @property({type: Boolean, reflect: true}) showUploadBtnAbove = false;
  @property({type: Array}) fileTypes = [];
  @property({type: String}) fileTypesLabel = 'File Type';
  @property({type: Boolean, reflect: true}) hideDeleteBtn = false;
  @property({type: Object}) toastFitInto!: any;
  @property({type: Boolean}) showFilesContainer = false;
  @property({type: Number}) changeFileIndex!: number;

  @query('#fileInput') private fileInputEl!: HTMLInputElement;

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    if (this.multiple && this.label === 'File attachment') {
      this.label += '(s)';
    }
    if (!Array.isArray(this.files)) {
      this.files = [];
    }
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('files')) {
      this._filesChange();
    }
  }

  _formatUploadDate(uploadDate, fileId) {
    if (!fileId) {
      return prettyDate(new Date(Date.now()).toString());
    }
    if (!uploadDate) {
      return '-';
    }
    return prettyDate(String(uploadDate));
  }

  _readonlyChanged(newValue) {
    if (newValue !== undefined) {
      this.hideDeleteBtn = newValue;
    }
  }

  _hideDeleteBtn(file) {
    if (this.readonly) {
      return true;
    }
    if (!this.multiple && (!this.files || !this.files.length)) {
      // reset necessary because data binding doesn't seem to work in all expected cases
      this.hideDeleteBtn = false;
      return false;
    }
    if (this.multiple && this.hideDeleteBtn) {
      return this._showDownloadBtn(file);
    }
    return this.hideDeleteBtn;
  }

  _showFileType(fileTypesLength, readonly, _fileType) {
    return this.activateFileTypes && fileTypesLength > 0 && !readonly;
  }

  _showReadonlyType(_fileType, readonly) {
    return this.activateFileTypes && readonly;
  }

  _getFileTypeStr(fileType) {
    if (!this.fileTypes.length || !fileType) {
      return null;
    }
    const type: any = this._findInAvailableFileTypes(fileType);
    if (type) {
      return type.name;
    }
    return null;
  }

  _findInAvailableFileTypes(fileType) {
    const type = this.fileTypes.filter(function (type: any) {
      return parseInt(type.id, 10) === parseInt(fileType, 10);
    });
    if (type && type.length) {
      return type[0];
    }
    return null;
  }

  _showLabel(label) {
    return typeof label === 'string' && label !== '';
  }

  _showUploadBtn(filesLength, readonly) {
    if (!this.multiple && filesLength > 0) {
      return false;
    }

    return !(filesLength === 0 && readonly === true);
  }

  _showNoFileAttachedMsg(filesLength, readonly) {
    return filesLength === 0 && readonly === true;
  }

  _showDownloadBtn(file) {
    return file && typeof file.path === 'string' && file.path !== '';
  }

  _getFileSelectedClass(file) {
    return !this._showDownloadBtn(file) ? 'only-selected' : '';
  }

  _openFileChooser() {
    if (this.fileInputEl) {
      this.fileInputEl.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
    }
  }

  _typeChanged(_event) {
    // var typeVal = event.target.selected;
    // console.log(event.model.index, typeVal);
    return;
  }

  _replaceFile(newFile) {
    if (this.changeFileIndex >= 0 && newFile) {
      this.fileInputEl.setAttribute('multiple', String(this.multiple));
      // this.set('disabled', false);
      if (this.files[this.changeFileIndex]) {
        if (this.multiple) {
          // check for already selected
          const fileAlreadySelected = this._checkFileAlreadySelected(newFile);
          if (fileAlreadySelected.length > 0) {
            this._displayAlreadySelectedWarning(fileAlreadySelected);
            this.changeFileIndex = -1;
            // reset file input
            this.fileInputEl.value = '';
            return;
          }
        }
        const oldFile = this.files[this.changeFileIndex];
        const newFileObj = JSON.parse(JSON.stringify(oldFile));
        newFileObj.file_name = newFile.name;
        newFileObj.raw = newFile;
        newFileObj.path = null;
        this.files[this.changeFileIndex] = newFileObj;
        this.requestUpdate();
      }
      this.changeFileIndex = -1;
      // reset file input
      this.fileInputEl.value = '';
      return true;
    }
    this.changeFileIndex = -1;
    return false;
  }

  _addMultipleFiles(files) {
    const filesAlreadySelected: any[] = [];
    for (let i = 0; i < files.length; i++) {
      const fileAlreadySelected = this._checkFileAlreadySelected(files[i]);
      if (fileAlreadySelected.length === 0) {
        const fileObj = this._getFileModel();
        fileObj.file_name = files[i].name;
        fileObj.raw = files[i];
        if (this.showUploadBtnAbove) {
          this.files.unshift(fileObj);
          this.requestUpdate();
        } else {
          this.files.push(fileObj);
          this.requestUpdate();
        }
      } else {
        filesAlreadySelected.push(fileAlreadySelected[0]);
      }
    }
    if (filesAlreadySelected.length > 0) {
      this._displayAlreadySelectedWarning(filesAlreadySelected);
    }
  }

  _checkFileAlreadySelected(file) {
    const fileAlreadySelected = this.files.filter(function (f) {
      return f.file_name === file.name && (f.path === '' || f.path === null || typeof f.path === 'undefined');
    });
    return fileAlreadySelected;
  }

  _displayAlreadySelectedWarning(filesAlreadySelected) {
    // show a warning with the already selected files
    let toastWarningMessage = '<p><strong>The following files are already selected:</strong><p>';
    filesAlreadySelected.forEach(function (alreadySelectedFile) {
      toastWarningMessage += '<p>' + alreadySelectedFile.file_name + '</p>';
    });
    fireEvent(this, 'toast', {text: toastWarningMessage});
  }

  _getFileModel() {
    if (this.fileModel) {
      return JSON.parse(JSON.stringify(this.fileModel));
    } else {
      return {
        id: null,
        file_name: null,
        type: null,
        path: null,
        raw: null
      };
    }
  }

  _addSingleFile(file) {
    if (file) {
      const fileObj = this._getFileModel();
      fileObj.file_name = file.name;
      fileObj.type = file.type;
      fileObj.raw = file;

      if (this.files.length === 0) {
        // add file
        this.files.push(fileObj);
      } else {
        // replace/change file
        this.files[0] = fileObj;
      }
      this.files = [...this.files];
    }
  }

  _fileSelected(e) {
    const files = e.target.files;
    // replace file if case
    if (this._replaceFile(files[0]) === true) {
      return;
    }

    // new files selected
    if (this.multiple) {
      this._addMultipleFiles(files);
    } else {
      // single file upload
      const file = e.target.files[0];
      this._addSingleFile(file);
    }
    // reset file input
    this.fileInputEl.value = '';
  }

  _changeFile(e) {
    const index = parseInt(e.target.getAttribute('index'));
    if (!isNaN(index) && index >= 0) {
      this.changeFileIndex = index;
      // this.set('disabled', true);
      this.fileInputEl.removeAttribute('multiple');
      this._openFileChooser();
    }
  }

  _deleteFile(e) {
    if (!this.multiple) {
      if (this.files.length > 0) {
        if (this.useDeleteEvents) {
          this.dispatchEvent(
            new CustomEvent('delete-file', {
              detail: {file: this.files[0], index: 0},
              bubbles: true,
              composed: true
            })
          );
        } else {
          this.files = [];
          this.requestUpdate();
        }
        this.fileInputEl.value = '';
      }
    } else {
      if (typeof e.model.index === 'number' && e.model.index >= 0) {
        if (this.useDeleteEvents) {
          this.dispatchEvent(
            new CustomEvent('delete-file', {
              detail: {
                file: this.files[e.model.index],
                index: e.model.index
              },
              bubbles: true,
              composed: true
            })
          );
        } else {
          this.files.splice(e.model.index, 1);
          this.requestUpdate();
        }
      }
    }
  }

  _filesChange() {
    this.showFilesContainer = this.files instanceof Array && this.files.length > 0;

    if (!this.multiple) {
      if (this.files instanceof Array && this.files.length > 1) {
        this.files = [this.files[0]];
        this.requestUpdate();
      }
    }
  }

  _downloadFile(e) {
    if (this.files.length > 0) {
      let file = this.files[0];
      const index = parseInt(e.target.getAttribute('index'));
      if (this.multiple && !isNaN(index) && index >= 0) {
        file = this.files[index];
      }
      if (typeof file !== 'undefined' && file.path !== '') {
        this.downloadFile(file.file_name, file.path, this.openInNewTab);
      }
    }
  }

  _getMultipleClass(multiple) {
    return multiple ? 'multiple' : '';
  }
}
