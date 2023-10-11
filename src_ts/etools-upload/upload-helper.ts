import {deleteFileFromDexie, getFileFromDexieById} from './offline/dexie-operations';
import {upload} from '@unicef-polymer/etools-ajax/upload-helper';

export interface UploadConfig {
  endpointInfo?: {
    endpoint: string;
    extraInfo: any;
    rawFilePropertyName: string; // Defaults to 'file'
  };
  uploadEndpoint?: string;
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

export function uploadAllFilesSequentially(
  config: UploadConfig,
  files: SequentialUploadFiles[]
): Promise<OperationResponse> {
  return new Promise(function (resolve, _reject) {
    const allSuccessResponses: any[] = [];
    const allErrorResponses: any[] = [];
    let i;
    let counter = 0;

    for (i = 0; i < files.length; i++) {
      upload(config, files[i].binaryData, files[i].filename)
        .then((response) => {
          allSuccessResponses.push(response);

          if (counter + 1 === files.length) {
            resolve({
              success: allSuccessResponses,
              error: allErrorResponses
            });
          }
          counter++;
        })
        .catch((err) => {
          allErrorResponses.push(err);

          if (counter + 1 === files.length) {
            resolve({
              success: allSuccessResponses,
              error: allErrorResponses
            });
          }
          counter++;
        });
    }
  });
}

/**
 * config = {
 *  endpointInfo: {},
 *  uploadEndpoint: '',
 *  jwtLocalStorageKey: ''
 * }
 */
export async function uploadFileStoredInDexie(config: UploadConfig, id: string): Promise<OperationResponse> {
  const file = await getFileFromDexieById(id);

  const response: OperationResponse = {
    success: null,
    error: null
  };

  if (!file) {
    response.error = 'File ' + id + ' not found in Dexie';
    return response;
  }

  try {
    response.success = await upload(config, file.binaryData, file.filename);
  } catch (error) {
    response.error = error;
    return response;
  }

  try {
    await deleteFileFromDexie(id);
  } catch (error) {
    response.error = error;
  }

  return response;
}
