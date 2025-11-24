import path from 'path';
import { ListDirectoryContentsBody, ListDirectoryContentsResponse } from '../models/getfile';
import fs from 'fs';
import { IReq, IRes } from '../utils/types';


export const listDirectoryContents = (req: IReq<ListDirectoryContentsBody>, res: IRes) => {

  
  try {
  const mockdata = [
      { type: 'folder', name: 'agreements1', id: '478', parentId: '47' },
      { type: 'folder', name: 'agreements2', id: '479', parentId: '47' },
      { type: 'folder', name: 'agreements3', id: '488', parentId: '48' },
      { type: 'folder', name: 'agreements4', id: '489', parentId: '48' },
      { type: 'file', name: 'Non-Disclosure Agreement (NDA) - NDA-94460.pdf', id: '4781', mimeType: 'application/pdf', parentId: '478', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Purchase Agreement - PO-90804.pdf', id: '4782', mimeType: 'application/pdf', parentId: '478', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Change Order - CO-01378.pdf', id: '4791', mimeType: 'application/pdf', parentId: '479', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Services Agreement - SERV-64966.pdf', id: '4792', mimeType: 'application/pdf', parentId: '479', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Contractor Agreement - CTR-40262.pdf', id: '4881', mimeType: 'application/pdf', parentId: '488', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Statement Of Work (SOW) - SOW-26116.pdf', id: '4882', mimeType: 'application/pdf', parentId: '488', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Lease Agreement - LEASE-40931.pdf', id: '4891', mimeType: 'application/pdf', parentId: '489', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Offer Letter - OFFER-44716.pdf', id: '4892', mimeType: 'application/pdf', parentId: '489', lastModifiedDate: new Date().toISOString() },
    ];

    var returnData;
    switch(req.body.parentId) {
      case '47':
      returnData = mockdata.filter(item => item.id === '478' || item.id === '479');
        break;
      case '48':
      returnData = mockdata.filter(item => item.id === '488' || item.id === '489');
        break;  
      case '478':
        returnData = mockdata.filter(item => item.id === '4781' || item.id === '4782');
        break;
      case '479':
        returnData = mockdata.filter(item => item.id === '4791' || item.id === '4792');
        break;
      case '488':
        returnData = mockdata.filter(item => item.id === '4881' || item.id === '4882');
        break;
      case '489':
        returnData = mockdata.filter(item => item.id === '4891' || item.id === '4892');
        break;
      default:
        returnData = mockdata;
    }

  const listDirectoryContentsResult: ListDirectoryContentsResponse = { parentId: req.body.parentId, data: returnData };
      return res.json(listDirectoryContentsResult);

  }catch (err) {
      console.log(`Encountered an error listing drives: ${err.message}`);
    }
};