import { __decorate } from "tslib";
import { createAttachmentsDexie } from './dexie-config';
import { generateRandomHash } from './dexie-operations';
import { property } from 'lit/decorators.js';
/**
 * App menu functionality mixin
 * @polymer
 * @mixinFunction
 */
export function OfflineMixin(baseClass) {
    class OfflineClass extends baseClass {
        constructor(...args) {
            super(...args);
            this.activateOffline = false;
        }
        connectedCallback() {
            super.connectedCallback();
            if (this.activateOffline) {
                createAttachmentsDexie();
            }
        }
        getFileInfo(file) {
            return {
                id: generateRandomHash(),
                filetype: file.type,
                filename: file.name,
                extraInfo: this.endpointInfo ? this.endpointInfo.extraInfo : '',
                parentId: window.OfflineUploadParentId ||
                    (this.endpointInfo && this.endpointInfo.extraInfo ? this.endpointInfo.extraInfo.parentId : ''),
                unsynced: true
            };
        }
    }
    __decorate([
        property({ type: Boolean, reflect: true, attribute: 'activate-offline' })
    ], OfflineClass.prototype, "activateOffline", void 0);
    return OfflineClass;
}
