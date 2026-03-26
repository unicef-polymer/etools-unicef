import { __decorate } from "tslib";
import { state } from 'lit/decorators.js';
import { openDialog } from '@unicef-polymer/etools-utils/dist/dialog.util';
import { translate } from '../etools-translate';
export const UPLOAD_STATUS_KEYS = {
    IN_PROGRESS: 'UPLOADS_IN_PROGRESS',
    UNSAVED: 'UPLOADS_UNSAVED'
};
function get(key) {
    return parseInt(sessionStorage.getItem(key) || '0', 10);
}
function set(key, value) {
    const cleanValue = Math.max(0, value);
    sessionStorage.setItem(key, cleanValue.toString());
    dispatchChange(key, cleanValue);
}
function increase(key) {
    set(key, get(key) + 1);
}
function decrease(key) {
    set(key, Math.max(0, get(key) - 1));
}
function resetKey(key) {
    set(key, 0);
}
function dispatchChange(key, value) {
    window.dispatchEvent(new CustomEvent('upload-status-changed', {
        detail: { key, value }
    }));
}
function reset() {
    Object.values(UPLOAD_STATUS_KEYS).forEach(resetKey);
}
/**
 * @LitElement
 * @mixinFunction
 */
export const UploadsMixin = (superClass) => {
    class UploadsClass extends superClass {
        constructor() {
            super(...arguments);
            this.uploadsInProgress = get(UPLOAD_STATUS_KEYS.IN_PROGRESS);
            this.unsavedUploads = get(UPLOAD_STATUS_KEYS.UNSAVED);
            this._uploadsHandleStorageChange = (e) => {
                const { key, value } = e.detail;
                if (key === UPLOAD_STATUS_KEYS.IN_PROGRESS)
                    this.uploadsInProgress = value;
                if (key === UPLOAD_STATUS_KEYS.UNSAVED)
                    this.unsavedUploads = value;
                this.requestUpdate();
            };
            this._uploadsHandleStorageReset = (e) => {
                const { key } = e.detail;
                if (key && Object.values(UPLOAD_STATUS_KEYS).includes(key)) {
                    resetKey(key);
                }
                else {
                    reset();
                }
            };
        }
        connectedCallback() {
            var _a;
            (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            this._uploadsSyncState();
            window.addEventListener('upload-status-changed', this._uploadsHandleStorageChange.bind(this));
        }
        disconnectedCallback() {
            var _a;
            (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            window.removeEventListener('upload-status-changed', this._uploadsHandleStorageChange.bind(this));
        }
        removeUploadTrackingEvents() {
            window.removeEventListener('upload-status-reset', this._uploadsHandleStorageReset.bind(this));
            window.removeEventListener('upload-status-saved', this._uploadsHandleStorageSaved.bind(this));
            window.removeEventListener('upload-status-canceled', this._uploadsHandleStorageCanceled.bind(this));
            window.removeEventListener('beforeunload', this._uploadsHandleBeforeUnload.bind(this));
            window.removeEventListener('unload', this._uploadsHandleBrowserUnload.bind(this));
        }
        addUploadTrackingEvents() {
            this.removeUploadTrackingEvents();
            this._uploadsSyncState();
            window.addEventListener('upload-status-reset', this._uploadsHandleStorageReset.bind(this));
            window.addEventListener('upload-status-saved', this._uploadsHandleStorageSaved.bind(this));
            window.addEventListener('upload-status-canceled', this._uploadsHandleStorageCanceled.bind(this));
            window.addEventListener('beforeunload', this._uploadsHandleBeforeUnload.bind(this));
            window.addEventListener('unload', this._uploadsHandleBrowserUnload.bind(this));
        }
        _uploadsHandleStorageCanceled() {
            this._onUploadDelete();
        }
        _uploadsHandleStorageSaved() {
            this._onUploadSaved();
        }
        _uploadsHandleBrowserUnload() {
            reset();
        }
        _uploadsHandleBeforeUnload(e) {
            if (this.existsUploadsUnsavedOrInProgress()) {
                // Cancel the event as stated by the standard.
                e.preventDefault();
                // Chrome requires returnValue to be set.
                e.returnValue = 'Are you sure? Uploads in progress will be lost!';
            }
        }
        _uploadsSyncState() {
            this.uploadsInProgress = get(UPLOAD_STATUS_KEYS.IN_PROGRESS);
            this.unsavedUploads = get(UPLOAD_STATUS_KEYS.UNSAVED);
            this.requestUpdate();
        }
        /** Trigger when a file upload starts */
        _onUploadStarted(e) {
            if (e) {
                e.stopImmediatePropagation();
            }
            increase(UPLOAD_STATUS_KEYS.IN_PROGRESS);
        }
        /** Trigger when a file upload finishes */
        _onUploadFinished(success) {
            decrease(UPLOAD_STATUS_KEYS.IN_PROGRESS);
            if (success)
                increase(UPLOAD_STATUS_KEYS.UNSAVED);
        }
        /** Trigger when unsaved file is edited or removed */
        _onChangeUnsavedFile(e) {
            if (e) {
                e.stopImmediatePropagation();
            }
            decrease(UPLOAD_STATUS_KEYS.UNSAVED);
        }
        /** Trigger when an uploaded file is deleted */
        _onUploadDelete() {
            decrease(UPLOAD_STATUS_KEYS.UNSAVED);
        }
        /** Trigger when an uploaded file is saved */
        _onUploadSaved() {
            decrease(UPLOAD_STATUS_KEYS.UNSAVED);
        }
        existsUploadsUnsavedOrInProgress() {
            return Number(this.uploadsInProgress) > 0 || Number(this.unsavedUploads) > 0;
        }
        async confirmLeaveUploadInProgress(confirmCallback) {
            if (this.existsUploadsUnsavedOrInProgress()) {
                const confirmed = await openDialog({
                    dialog: 'are-you-sure',
                    dialogData: {
                        content: translate('LEAVE_UPLOAD_IN_PROGRESS'),
                        confirmBtnText: translate('LEAVE'),
                        cancelBtnText: translate('STAY')
                    }
                }).then(({ confirmed }) => confirmed);
                if (confirmed) {
                    reset();
                    if (confirmCallback) {
                        confirmCallback();
                    }
                }
                return confirmed;
            }
            return true;
        }
    }
    __decorate([
        state()
    ], UploadsClass.prototype, "uploadsInProgress", void 0);
    __decorate([
        state()
    ], UploadsClass.prototype, "unsavedUploads", void 0);
    return UploadsClass;
};
