declare global {
    interface Window {
        Etools: {
            AttachmentsDbName?: string;
            AttachmentsDb?: any;
        };
        OfflineUploadParentId?: string;
    }
}
export declare function createAttachmentsDexie(): void;
