import {html, LitElement} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js';
import '../etools-icons/etools-icon';
import {CommonStyles} from './common-styles';

import {CommonMixin} from './common-mixin';
import {getBlob, getFileUrl} from './offline/file-conversion';
import {storeFileInDexie} from './offline/dexie-operations';
import {abortActiveRequests, getActiveXhrRequests} from '@unicef-polymer/etools-ajax/upload-helper';
import {OfflineMixin} from './offline/offline-mixin';
import {getTranslation} from './utils/translate';
import {RequestHelperMixin} from './request-helper-mixin';

@customElement('etools-upload-multi')
export class EtoolsUploadMulti extends OfflineMixin(RequestHelperMixin(CommonMixin(LitElement))) {
  @property({type: String, reflect: true, attribute: 'upload-btn-label'})
  uploadBtnLabel?: string;
  @property({type: Array, reflect: true, attribute: 'raw-files'})
  rawFiles?: [];
  @property({type: Array})
  _filenames?: any[];
  @property({type: String})
  language?: string;
  render() {
    // language=HTML
    return html`
      ${CommonStyles}
      <style>
        .upload-btn-and-actions {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .filenames-container {
          padding-top: 4px;
          margin-top: 4px;
          margin-bottom: 16px;
        }
        .filename-line {
          flex-direction: row;
          align-items: center;
          display: block;
        }
        .filename {
          padding: 0;
          padding-inline: 8px 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: calc(100% - 100px);
          display: inline-block;
          vertical-align: middle;
        }
        .delete-button {
          padding-inline-start: 24px;
        }
        .filename-container {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .progress-container {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          width: 180px;
        }
        sl-progress-bar {
          --indicator-color: var(--primary-color);
          --height: 4px;
          width: 100%;
        }
        sl-progress-bar::part(base) {
          border-radius: unset;
        }
        .progress-container span {
          font-size: 11px;
          margin: 0 auto;
        }
      </style>

      <div>
        <div class="upload-btn-and-actions">
          <sl-button
            variant="text"
            size="small"
            class="upload-button"
            @click="${this._openFileChooser}"
            title="${this.uploadBtnLabel || getTranslation(this.language, 'UPLOAD_FILES')}"
            ?disabled="${this._shouldDisableUploadBtn(this.readonly, this.uploadInProgress)}"
          >
            <etools-icon name="file-upload"></etools-icon>
            ${this.uploadBtnLabel || getTranslation(this.language, 'UPLOAD_FILES')}
          </sl-button>

          <div class="file-actions">
            <sl-button
              variant="text"
              size="small"
              class="delete-button"
              @click="${this._cancelUpload}"
              ?disabled="${!this.uploadInProgress}"
              ?hidden="${!this.uploadInProgress}"
            >
              <etools-icon name="clear"></etools-icon>
              ${getTranslation(this.language, 'CANCEL')}
            </sl-button>
          </div>
        </div>

        <div class="filenames-container" ?hidden="${!this._thereAreFilesSelected(this._filenames)}">
          ${this._filenames!.map(
            (item) => html`
              <div class="filename-line">
                <div class="filename-container">
                  <etools-icon class="file-icon" name="attachment"></etools-icon>
                  <span class="filename" title="${item.filename}">${item.filename}</span>

                  <etools-icon
                    title="${getTranslation(this.language, 'UPLOADED_SUCCESSFULY')}"
                    name="done"
                    ?hidden="${!item.success}"
                  ></etools-icon>
                  <etools-icon
                    name="${getTranslation(this.language, 'UPLOAD_FAILED')}"
                    ?hidden="${!item.fail}"
                  ></etools-icon>
                </div>
                ${item.uploadProgressValue
                  ? html`
                      <div class="progress-container">
                        <sl-progress-bar .value="${item.uploadProgressValue}"></sl-progress-bar>
                        <span>${item.uploadProgressMsg}</span>
                        <div></div>
                      </div>
                    `
                  : ''}
              </div>
            `
          )}
        </div>

        <!-- Props -->
        <input
          hidden=""
          type="file"
          id="fileInput"
          @change="${this._filesSelected}"
          multiple=""
          accept="${this.accept}"
        />

        <a id="downloader" hidden=""></a>
      </div>
    `;
  }

  constructor() {
    super();

    if (!this.language) {
      this.language = window.localStorage.defaultLanguage || 'en';
    }
    this.handleLanguageChange = this.handleLanguageChange.bind(this);

    this.rawFiles = [];
    this._filenames = [];
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener('language-changed', this.handleLanguageChange);
    this.originalErrorMessage = this.errorMessage;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange);
  }

  handleLanguageChange(e) {
    this.language = e.detail.language;
  }

  _filesSelected(e) {
    const files = e.target.files ? e.target.files : null;
    if (!files || !files.length) {
      return;
    }

    this.rawFiles = files;
    this._filenames = this._extractFilenames(files);

    if (this.autoUpload) {
      this._handleUpload(files);
    }
  }

  _extractFilenames(files) {
    const names: any[] = [];
    for (let i = 0; i < files.length; i++) {
      names.push({
        filename: files.item(i).name,
        success: false,
        fail: false,
        uploadInProgress: this.autoUpload,
        uploadProgressValue: '',
        uploadProgressMsg: ''
      });
    }
    return names;
  }

  async saveFilesInIndexedDb(files) {
    let i;
    const filesInfo: any[] = [];
    const errors: string[] = [];
    for (i = 0; i < files.length; i++) {
      const fileInfo = this.getFileInfo(files[i]);
      const blob = await getBlob(getFileUrl(files[i]));
      const fileInfoForDb = JSON.parse(JSON.stringify(fileInfo));
      fileInfoForDb.binaryData = blob;
      try {
        await storeFileInDexie(fileInfoForDb);
        filesInfo.push(fileInfo);
        this._updateFilename(i, {
          success: true,
          uploadInProgress: false
        });
      } catch (error) {
        errors.push(
          `${getTranslation(this.language, 'ERROR_SAVING_ATTACHMENT_INDEXDB').replace('{0}', fileInfo.filename)}`
        );
        this._updateFilename(i, {
          fail: true,
          uploadInProgress: false
        });
      }
    }
    return {
      success: filesInfo,
      error: errors
    };
  }

  async _handleUpload(files) {
    this.uploadInProgress = true;
    if (this.activateOffline && navigator.onLine === false) {
      const response = await this.saveFilesInIndexedDb(files);
      this.uploadInProgress = false;
      this.resetRawFiles();
      this.fireEvent('upload-finished', response);
      setTimeout(this._clearDisplayOfUploadedFiles.bind(this), 2000);
      return;
    }

    if (this.endpointAcceptsMulti) {
      // we don't have this situation yet
    } else {
      this._uploadAllFilesSequentially(files).then((response) => {
        this.uploadInProgress = false;
        this.resetRawFiles();
        if (response && !response.uploadCanceled) {
          this.fireEvent('upload-finished', {
            success: response.allSuccessResponses,
            error: response.allErrorResponses
          });

          setTimeout(this._clearDisplayOfUploadedFiles.bind(this), 2000);
        }
      });
    }
  }

  _clearDisplayOfUploadedFiles() {
    this._filenames = [];
  }

  _uploadAllFilesSequentially(files): Promise<any> {
    return new Promise((resolve) => {
      const allSuccessResponses: any[] = [];
      const allErrorResponses: any[] = [];
      let counter = 0;
      for (let index = 0; index < files.length; index++) {
        this.uploadRawFile(files[index], files[index].name, (data) => this._computeUploadProgress(index, data))
          .then((response) => {
            this._updateFilename(index, {
              success: true,
              uploadInProgress: false,
              uploadProgressValue: '',
              uploadProgressMsg: ''
            });

            allSuccessResponses.push(response);

            if (counter + 1 === files.length) {
              resolve({
                allSuccessResponses: allSuccessResponses,
                allErrorResponses: allErrorResponses
              });
            }
            counter++;
          })
          .catch((err) => {
            this._updateFilename(index, {
              fail: true,
              uploadInProgress: false,
              uploadProgressValue: '',
              uploadProgressMsg: ''
            });

            allErrorResponses.push(this.prepareErrorMessage(this.language, err));

            if (counter + 1 === files.length) {
              resolve({
                allSuccessResponses: allSuccessResponses,
                allErrorResponses: allErrorResponses
              });
            }
            counter++;
          });
      }
    });
  }

  _computeUploadProgress(index, requestData) {
    if (!requestData) {
      this._updateFilename(index, {uploadProgressValue: '', uploadProgressMsg: ''});
    } else {
      const uploadProgressValue = `${(requestData.loaded * 100) / requestData.total}`;
      const uploadProgressMsg = `${Math.round(requestData.loaded / 1024)} kb of ${Math.round(
        requestData.total / 1024
      )} kb`;
      this._updateFilename(index, {uploadProgressValue, uploadProgressMsg});
    }
  }

  _updateFilename(index, mergeObj) {
    if (!this._filenames?.[index]) {
      return;
    }
    this._filenames[index] = Object.assign({}, this._filenames[index], mergeObj);
    this.requestUpdate();
  }

  _shouldDisableUploadBtn(readonly, uploadInProgress) {
    return readonly || uploadInProgress;
  }

  _thereAreFilesSelected(_filenames) {
    return _filenames && _filenames.length;
  }

  _cancelUpload() {
    const activeReqKeys = Object.keys(getActiveXhrRequests());
    this._filenames = this._filenames?.filter((f) => activeReqKeys.indexOf(f.filename) < 0);

    abortActiveRequests(activeReqKeys);
    this.uploadInProgress = false;
    this.resetRawFiles();

    if (this._filenames?.length) {
      setTimeout(() => {
        this._clearDisplayOfUploadedFiles.bind(this);
      }, 2000);
    }
  }

  resetRawFiles() {
    this.rawFiles = [];
    const fileInput = this.shadowRoot?.querySelector('#fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
