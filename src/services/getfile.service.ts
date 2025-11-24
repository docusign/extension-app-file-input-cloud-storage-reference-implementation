import path from 'path';
import { GetFileBody, GetFileResponse } from '../models/getfile';
import fs from 'fs';
import { IReq, IRes } from '../utils/types';

export const getFile = (req: IReq<GetFileBody>, res: IRes) => {
  try {
    const getFileResult: GetFileResponse = { message: 'File transfer initiated' };
    const headerString = req.headers['x-docusign-session'];

    if (headerString) {
    try {
      const buff = Buffer.from(processData(headerString), 'base64');
      const decodedheader = buff.toString('utf-8');
      const parsed = JSON.parse(decodedheader);
      const fileUrl = parsed.filesApiUrl;
      const apiUrl = parsed.callbackUrl;
      const userSessionToken = parsed.sessionToken;

      sendUploadRequestWithSessionToken(fileUrl, apiUrl, userSessionToken)
        .then(result => console.log('Callback response:', result))
        .catch(error => console.error('Upload request failed:', error));


    } catch (err) {
      console.error('Failed to parse header JSON:', err);
    }
  }

    console.log('Return message: ', getFileResult)
    return res.json(getFileResult);

  } catch (err) {
    console.log(`Encountered an error getting file: ${err.message}`);
    const getFileResult: GetFileResponse = { message: 'Failed to initiate file transfer' };
    return res.json(getFileResult);
  }


    function processData(data: string | string[] | ArrayBufferView<ArrayBufferLike>) {
        if (typeof data === 'string') {
            return data;
        } else if (Array.isArray(data)) {
            const combinedString = data.join('');
            return combinedString;
        } else {
            return "blank";
        }
    }

  async function sendUploadRequestWithSessionToken(uploadUrl: string, callbackUrl: string, sessionToken: string): Promise<any> {
  try {
    let filePath: string;
    
    switch(req.body.fileId) {
      case '4781':
        filePath = './agreements/agreements1/Non-Disclosure Agreement (NDA) - NDA-94460.pdf';
        break;
      case '4782':
        filePath = './agreements/agreements1/Purchase Agreement - PO-90804.pdf';
        break;
      case '4791':
        filePath = './agreements/agreements2/Change Order - CO-01378.pdf';
        break;
      case '4792':
        filePath = './agreements/agreements2/Services Agreement - SERV-64966.pdf';
        break;
      case '4881':
        filePath = './agreements/agreements3/Contractor Agreement - CTR-40262.pdf';
        break;
      case '4882':
        filePath = './agreements/agreements3/Statement Of Work (SOW) - SOW-26116.pdf';
        break;
      case '4891':
        filePath = './agreements/agreements4/Lease Agreement - LEASE-40931.pdf';
        break;
      case '4892':
        filePath = './agreements/agreements4/Offer Letter - OFFER-44716.pdf';
        break;
      default:
        filePath = './agreements/agreements1/Non-Disclosure Agreement (NDA) - NDA-94460.pdf';
    }

    const buffer = fs.readFileSync(filePath);

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      },
      body: buffer

    });
    console.log('Starting upload request');
    console.log('Upload URL: ', uploadUrl);
    console.log('Upload token: ', sessionToken);

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(`HTTP error! Status: ${uploadResponse.status}, Message: ${errorData.message}`);
    }

    const uploadResponseData = await uploadResponse.json();
    const uploadDocumentId = uploadResponseData.id;
    var callbackData;

    if(uploadResponse.ok) {
    callbackData = { status: "EXECUTION_STATUS_SUCCEEDED", output: {data: {documentId: uploadDocumentId}} };
    } else {
    callbackData = { status: "EXECUTION_STATUS_FAILED", output: {data: {documentId: uploadDocumentId}} };
    }

    const callbackResponse = await fetch(callbackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify(callbackData)

    });
    console.log('Starting callback request');
    console.log('Callback URL: ', callbackUrl);
    console.log('Callback body: ', callbackData);
    console.log('Callback token: ', sessionToken);

    if (!callbackResponse.ok) {
      const errorData = await callbackResponse.json();
      throw new Error(`HTTP error! Status: ${callbackResponse.status}, Message: ${errorData.message}`);
    }

    const responseData = await callbackResponse.json();


    return responseData;
  }
  
  catch (error) {
    console.error('Error sending POST request:', error);
    throw error;
  }
}

};


