import {RequestHelperMixin} from './request-helper-mixin';
import {Constructor} from '@unicef-polymer/etools-types';
import {property} from 'lit-element';

export function RequestHelperMulti<T extends Constructor<any>>(baseClass: T) {
  class RequestHelperMultiClass extends RequestHelperMixin(baseClass) {
    @property({type: Boolean, reflect: true, attribute: 'endpoint-accepts-multi'})
    endpointAcceptsMulti = false;
    @property({type: Boolean, reflect: true, attribute: 'cancel-upload'})
    cancelUpload = false;

    constructor(...args) {
      super(...args);
      this.endpointAcceptsMulti = false;
      this.cancelUpload = false;
    }
  }
  return RequestHelperMultiClass;
}
