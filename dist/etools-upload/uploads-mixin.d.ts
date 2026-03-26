import { Constructor } from '@unicef-polymer/etools-types';
import { LitElement } from 'lit';
export declare const UPLOAD_STATUS_KEYS: {
    IN_PROGRESS: string;
    UNSAVED: string;
};
export interface IUploadsClass {
    uploadsInProgress: number;
    unsavedUploads: number;
    addUploadTrackingEvents(): void;
    removeUploadTrackingEvents(): void;
    existsUploadsUnsavedOrInProgress(): boolean;
    confirmLeaveUploadInProgress(confirmCallback?: () => void): Promise<boolean>;
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
export declare const UploadsMixin: <T extends Constructor<LitElement>>(superClass: T) => Constructor<IUploadsClass> & T;
