import {upload} from '@unicef-polymer/etools-utils/dist/etools-ajax/upload-helper';
import {Constructor} from '../utils/types';
import {property} from 'lit/decorators.js';
import {UploadConfig} from './upload-helper';

export function RequestHelperMixin<T extends Constructor<any>>(baseClass: T) {
  class RequestHelperClass extends baseClass {
    @property({type: Boolean, reflect: true, attribute: 'endpoint-accepts-multi'})
    endpointAcceptsMulti = false;

    @property({type: Boolean, reflect: true, attribute: 'cancel-upload'})
    cancelUpload = false;

    @property({type: String, reflect: true, attribute: 'upload-endpoint'})
    uploadEndpoint: string | null | undefined = null;

    @property({type: Object, reflect: true, attribute: 'endpoint-info'})
    endpointInfo: object | null | undefined = null;

    @property({type: String, reflect: true, attribute: 'jwt-local-storage-key'})
    jwtLocalStorageKey = '';

    constructor(...args) {
      super(...args);
    }

    uploadRawFile(rawFile, requestKey, onProgressCallback) {
      const config = {
        endpointInfo: this.endpointInfo,
        uploadEndpoint: this.uploadEndpoint,
        jwtLocalStorageKey: this.jwtLocalStorageKey
      };
      return upload(config as UploadConfig, rawFile, requestKey, onProgressCallback);
    }
  }

  return RequestHelperClass;
}
