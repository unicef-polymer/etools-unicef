import {createAttachmentsDexie} from './dexie-config';
import {generateRandomHash} from './dexie-operations';
import {property} from 'lit/decorators.js';
import {Constructor} from '../../utils/types';

/**
 * App menu functionality mixin
 * @polymer
 * @mixinFunction
 */
export function OfflineMixin<T extends Constructor<any>>(baseClass: T) {
  class OfflineClass extends baseClass {
    @property({type: Boolean, reflect: true, attribute: 'activate-offline'}) activateOffline = false;

    constructor(...args) {
      super(...args);
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
        parentId:
          window.OfflineUploadParentId ||
          (this.endpointInfo && this.endpointInfo.extraInfo ? this.endpointInfo.extraInfo.parentId : ''),
        unsynced: true
      };
    }
  }
  return OfflineClass;
}
