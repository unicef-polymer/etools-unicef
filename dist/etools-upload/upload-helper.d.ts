export interface UploadConfig {
    endpointInfo?: {
        endpoint: string;
        extraInfo: any;
        rawFilePropertyName: string;
    };
    uploadEndpoint: string;
    jwtLocalStorageKey?: string;
}
export interface SequentialUploadFiles {
    binaryData: any;
    filename: string;
    [key: string]: any;
}
export interface OperationResponse {
    success?: any;
    error?: any;
}
export declare function uploadAllFilesSequentially(config: UploadConfig, files: SequentialUploadFiles[]): Promise<OperationResponse>;
/**
 * config = {
 *  endpointInfo: {},
 *  uploadEndpoint: '',
 *  jwtLocalStorageKey: ''
 * }
 */
export declare function uploadFileStoredInDexie(config: UploadConfig, id: string): Promise<OperationResponse>;
