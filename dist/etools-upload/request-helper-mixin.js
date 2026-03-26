import { __decorate } from "tslib";
import { upload } from '@unicef-polymer/etools-utils/dist/etools-ajax/upload-helper';
import { property } from 'lit/decorators.js';
export function RequestHelperMixin(baseClass) {
    class RequestHelperClass extends baseClass {
        constructor(...args) {
            super(...args);
            this.endpointAcceptsMulti = false;
            this.cancelUpload = false;
            this.uploadEndpoint = null;
            this.endpointInfo = null;
            this.jwtLocalStorageKey = '';
        }
        uploadRawFile(rawFile, requestKey, onProgressCallback) {
            const config = {
                endpointInfo: this.endpointInfo,
                uploadEndpoint: this.uploadEndpoint,
                jwtLocalStorageKey: this.jwtLocalStorageKey
            };
            return upload(config, rawFile, requestKey, onProgressCallback);
        }
    }
    __decorate([
        property({ type: Boolean, reflect: true, attribute: 'endpoint-accepts-multi' })
    ], RequestHelperClass.prototype, "endpointAcceptsMulti", void 0);
    __decorate([
        property({ type: Boolean, reflect: true, attribute: 'cancel-upload' })
    ], RequestHelperClass.prototype, "cancelUpload", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: 'upload-endpoint' })
    ], RequestHelperClass.prototype, "uploadEndpoint", void 0);
    __decorate([
        property({ type: Object, reflect: true, attribute: 'endpoint-info' })
    ], RequestHelperClass.prototype, "endpointInfo", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: 'jwt-local-storage-key' })
    ], RequestHelperClass.prototype, "jwtLocalStorageKey", void 0);
    return RequestHelperClass;
}
