import './etools-loading.js';
import {LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import remove from 'lodash-es/remove';
import last from 'lodash-es/last';
import {default as lodashGet} from 'lodash-es/get';
import isEmpty from 'lodash-es/isEmpty';
import {getTranslation} from './utils/translate.js';
import {EtoolsLoading} from './etools-loading.js';
import {Constructor} from '@unicef-polymer/etools-types';

interface ILoadingMixingClass {
  globalLoadingElement: EtoolsLoading;
  etoolsLoadingContainer: any;
  language: string;
  connectedCallback(): void;
  disconnectedCallback(): void;
  handleLanguageChange(e: any): void;
  createLoading(loadingMessage: string): EtoolsLoading;
  removeLoading(loadingElement: EtoolsLoading): void;
  addMessageToQue(messages: string[], source: any): string[];
  removeMessageFromQue(messages: any, source: any): string[];
  handleLoading(event: any): void;
  clearLoadingQueue(event: any): void;
  getContainer(): any;
}

/**
 * @polymer
 * @mixinFunction
 */
// @ts-ignore
export default function LoadingMixin<T extends Constructor<LitElement>>(baseClass: T) {
  class LoadingMixingClass extends baseClass implements ILoadingMixingClass {
    globalLoadingElement!: EtoolsLoading;

    @property({type: Object})
    etoolsLoadingContainer: any;

    @property({type: String})
    language: string = window.EtoolsLanguage || 'en';

    connectedCallback(): void {
      super.connectedCallback();
      this.addEventListener('global-loading', this.handleLoading);
      this.addEventListener('clear-loading-messages', this.clearLoadingQueue);
      document.addEventListener('language-changed', this.handleLanguageChange.bind(this));

      // create loading element, used for global loading
      this.globalLoadingElement = this.createLoading();
      this.globalLoadingElement.messages = [];
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
    }

    handleLanguageChange(e: any): void {
      this.language = e.detail.language;
    }

    /**
     * This method will create an etools-loading absolute element
     * (loading element is appended to the body and it will cover entire screen)
     * @param loadingMessage
     * @returns {Element}
     */
    createLoading(loadingMessage?: string): EtoolsLoading {
      const newLoadingElement = document.createElement('etools-loading') as EtoolsLoading;
      if (typeof loadingMessage === 'string' && loadingMessage !== '') {
        newLoadingElement.loadingText = loadingMessage;
      }
      newLoadingElement.setAttribute('id', 'fromLoadingLixin');
      newLoadingElement.setAttribute('absolute', '');
      this.getContainer().appendChild(newLoadingElement);

      return newLoadingElement;
    }

    /**
     * Use this method to remove a loading element in the detached state of the element where loading is used
     * @param loadingElement
     */
    removeLoading(loadingElement: EtoolsLoading): void {
      if (loadingElement) {
        this.getContainer().removeChild(loadingElement);
      }
    }

    addMessageToQue(messages: string[], source: any): string[] {
      const _messages = messages.slice();
      _messages.push(source);
      return _messages;
    }

    removeMessageFromQue(messages: string[], source: any): string[] {
      const _messages = messages.slice();
      remove(_messages, {loadingSource: source.loadingSource});
      return _messages;
    }

    /**
     * Show loading when data is requested from server, or save is in progress...
     */
    handleLoading(event: any): void {
      event.stopImmediatePropagation();
      if (!this.globalLoadingElement) {
        return;
      }

      const loadingSource = event.detail.loadingSource
        ? event.detail.loadingSource
        : lodashGet(event, 'path.0.localName', 'na');

      if (event.detail.active) {
        const message = lodashGet(event, 'detail.message', getTranslation(this.language, 'LOADING'));
        this.globalLoadingElement.messages = this.addMessageToQue(this.globalLoadingElement.messages, {
          loadingSource: loadingSource,
          message: message
        });
        this.globalLoadingElement.loadingText = last(this.globalLoadingElement.messages).message;
        this.globalLoadingElement.setAttribute('source', last(this.globalLoadingElement.messages).loadingSource);
        this.globalLoadingElement.active = true;
      } else {
        this.globalLoadingElement.messages = this.removeMessageFromQue(this.globalLoadingElement.messages, {
          loadingSource: loadingSource
        });
        if (isEmpty(this.globalLoadingElement.messages)) {
          this.globalLoadingElement.active = false;
        } else {
          this.globalLoadingElement.loadingText = last(this.globalLoadingElement.messages).message;
        }
      }
    }

    clearLoadingQueue(event: any): void {
      event.stopImmediatePropagation();
      this.globalLoadingElement.messages = [];
      this.globalLoadingElement.active = false;
    }

    getContainer(): any {
      if (this.etoolsLoadingContainer) {
        return this.etoolsLoadingContainer;
      } else {
        return document.querySelector('body');
      }
    }
  }

  return LoadingMixingClass as Constructor<ILoadingMixingClass> & T;
}
