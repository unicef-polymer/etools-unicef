export declare function storeFileInDexie(fileInfo: any): any;
export declare function getFileFromDexieById(id: any): any;
export declare const generateRandomHash: () => string;
export declare function getFilesFromDexieByIds(ids: any): any;
export declare function deleteFileFromDexie(id: any): any;
export declare function updateParentIdInDexie(oldParentId: any, newParentId: any): any;
export declare function updateProvidedPropertyNameInDexie(attId: any, propName: any, val: any): any;
export declare function deleteByParentIdFromDexie(parentId: any): any;
/**
 * Avoid returning all files because they contain the binary data also and it's best to save memory
 */
export declare function getFileCountByParentIdFromDexie(parentId: any): any;
