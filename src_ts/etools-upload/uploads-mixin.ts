import {Constructor} from '@unicef-polymer/etools-types';
import {LitElement} from 'lit';
import {state} from 'lit/decorators.js';
import {openDialog} from '@unicef-polymer/etools-utils/dist/dialog.util';
import {translate} from '../etools-translate';

export const UPLOAD_STATUS_KEYS = {
  IN_PROGRESS: 'UPLOADS_IN_PROGRESS',
  UNSAVED: 'UPLOADS_UNSAVED'
};

function get(key: string): number {
  return parseInt(sessionStorage.getItem(key) || '0', 10);
}

function set(key: string, value: number) {
  const cleanValue = Math.max(0, value);
  sessionStorage.setItem(key, cleanValue.toString());
  dispatchChange(key, cleanValue);
}

function increase(key: string) {
  set(key, get(key) + 1);
}

function decrease(key: string) {
  set(key, Math.max(0, get(key) - 1));
}

function resetKey(key: string) {
  set(key, 0);
}

function dispatchChange(key: string, value: number) {
  window.dispatchEvent(
    new CustomEvent('upload-status-changed', {
      detail: {key, value}
    })
  );
}

function reset() {
  Object.values(UPLOAD_STATUS_KEYS).forEach(resetKey);
}

export interface IUploadsClass {
  uploadsInProgress: number;
  unsavedUploads: number;

  addUploadTrackingEvents(): void;
  removeUploadTrackingEvents(): void;

  existsUploadsUnsavedOrInProgress(): boolean;

  confirmLeaveUploadInProgress(confirmCallback?: () => void): Promise<boolean>;

  // Optional: If these methods are accessed externally, include them too:
  _onUploadStarted(e?: Event): void;
  _onUploadFinished(success?: boolean): void;
  _onChangeUnsavedFile(e?: Event): void;
  _onUploadDelete(): void;
  _onUploadSaved(): void;
}

/**
 * @LitElement
 * @mixinFunction
 */
export const UploadsMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class UploadsClass extends superClass {
    @state()
    uploadsInProgress = get(UPLOAD_STATUS_KEYS.IN_PROGRESS);

    @state()
    unsavedUploads = get(UPLOAD_STATUS_KEYS.UNSAVED);

    connectedCallback(): void {
      super.connectedCallback?.();
      this._uploadsSyncState();
      window.addEventListener('upload-status-changed', this._uploadsHandleStorageChange.bind(this));
    }

    disconnectedCallback(): void {
      super.disconnectedCallback?.();
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

    _uploadsHandleBeforeUnload(e: Event) {
      if (this.existsUploadsUnsavedOrInProgress()) {
        // Cancel the event as stated by the standard.
        e.preventDefault();
        // Chrome requires returnValue to be set.
        (e as any).returnValue = 'Are you sure? Uploads in progress will be lost!';
      }
    }

    _uploadsHandleStorageChange = (e: Event) => {
      const {key, value} = (e as CustomEvent).detail;
      if (key === UPLOAD_STATUS_KEYS.IN_PROGRESS) this.uploadsInProgress = value;
      if (key === UPLOAD_STATUS_KEYS.UNSAVED) this.unsavedUploads = value;
      this.requestUpdate();
    };

    _uploadsHandleStorageReset = (e: Event) => {
      const {key} = (e as CustomEvent).detail;
      if (key && Object.values(UPLOAD_STATUS_KEYS).includes(key)) {
        resetKey(key);
      } else {
        reset();
      }
    };

    _uploadsSyncState() {
      this.uploadsInProgress = get(UPLOAD_STATUS_KEYS.IN_PROGRESS);
      this.unsavedUploads = get(UPLOAD_STATUS_KEYS.UNSAVED);
      this.requestUpdate();
    }

    /** Trigger when a file upload starts */
    _onUploadStarted(e?: Event) {
      if (e) {
        e.stopImmediatePropagation();
      }
      increase(UPLOAD_STATUS_KEYS.IN_PROGRESS);
    }

    /** Trigger when a file upload finishes */
    _onUploadFinished(success?: boolean) {
      decrease(UPLOAD_STATUS_KEYS.IN_PROGRESS);
      if (success) increase(UPLOAD_STATUS_KEYS.UNSAVED);
    }

    /** Trigger when unsaved file is edited or removed */
    _onChangeUnsavedFile(e?: Event) {
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

    existsUploadsUnsavedOrInProgress(): boolean {
      return Number(this.uploadsInProgress) > 0 || Number(this.unsavedUploads) > 0;
    }

    async confirmLeaveUploadInProgress(confirmCallback?: () => void): Promise<boolean> {
      if (this.existsUploadsUnsavedOrInProgress()) {
        const confirmed = await openDialog({
          dialog: 'are-you-sure',
          dialogData: {
            content: translate('LEAVE_UPLOAD_IN_PROGRESS'),
            confirmBtnText: translate('LEAVE'),
            cancelBtnText: translate('STAY')
          }
        }).then(({confirmed}) => confirmed);

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

  return UploadsClass as Constructor<IUploadsClass> & T;
};
