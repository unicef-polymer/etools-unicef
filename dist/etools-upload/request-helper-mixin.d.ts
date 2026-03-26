import { Constructor } from '../utils/types';
export declare function RequestHelperMixin<T extends Constructor<any>>(baseClass: T): {
    new (...args: any[]): {
        [x: string]: any;
        endpointAcceptsMulti: boolean;
        cancelUpload: boolean;
        uploadEndpoint: string | null | undefined;
        endpointInfo: object | null | undefined;
        jwtLocalStorageKey: string;
        uploadRawFile(rawFile: any, requestKey: any, onProgressCallback: any): Promise<any>;
    };
} & T;
