import './etools-loading.js';
import { Constructor } from '../utils/types.js';
import { EtoolsLoading } from './etools-loading.js';
/**
 * @polymer
 * @mixinFunction
 */
export declare function LoadingMixin<T extends Constructor<any>>(baseClass: T): {
    new (...args: any[]): {
        [x: string]: any;
        connectedCallback(): void;
        disconnectedCallback(): void;
        handleLanguageChange(e: any): void;
        /**
         * This method will create an etools-loading absolute element
         * (loading element is appended to the body and it will cover entire screen)
         * @param loadingMessage
         * @returns {Element}
         */
        createLoading(loadingMessage?: string): EtoolsLoading;
        /**
         * Use this method to remove a loading element in the detached state of the element where loading is used
         * @param loadingElement
         */
        removeLoading(loadingElement: any): void;
        addMessageToQue(messages: any, source: any): any;
        removeMessageFromQue(messages: any, source: any): any;
        /**
         * Show loading when data is requested from server, or save is in progress...
         */
        handleLoading(event: any): void;
        clearLoadingQueue(event: any): void;
        getContainer(): any;
    };
    readonly properties: {
        /**
         *  If is set, this element will be used as loading container instead of default body
         */
        etoolsLoadingContainer: {
            type: ObjectConstructor;
        };
    };
} & T;
