import { Constructor } from '../../utils/types';
/**
 * App menu functionality mixin
 * @polymer
 * @mixinFunction
 */
export declare function OfflineMixin<T extends Constructor<any>>(baseClass: T): {
    new (...args: any[]): {
        [x: string]: any;
        activateOffline: boolean;
        connectedCallback(): void;
        getFileInfo(file: any): {
            id: string;
            filetype: any;
            filename: any;
            extraInfo: any;
            parentId: any;
            unsynced: boolean;
        };
    };
} & T;
