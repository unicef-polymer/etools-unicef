import Dexie from 'dexie';

// Extend the Window interface to include the Etools property
declare global {
  interface Window {
    Etools: {
      AttachmentsDbName?: string;
      AttachmentsDb?: any;
    };
    OfflineUploadParentId?: string;
  }
}
// Dexie db will be used to store attachments uploaded while offline
export function createAttachmentsDexie(): void {
  // You can keep the code as it is
  window.Etools = window.Etools || {};
  if (!window.Etools.AttachmentsDbName) {
    console.log('window.Etools.AttachmentsDbName needs to be set!');
  } else {
    if (!window.Etools.AttachmentsDb) {
      const db = new Dexie(window.Etools.AttachmentsDbName);
      db.version(1).stores({
        attachments: 'id, parentId'
      });

      window.Etools.AttachmentsDb = db;
    }
  }
}
