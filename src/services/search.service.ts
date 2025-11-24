import path from 'path';
import { SearchBody, SearchResponse } from '../models/getfile';
import fs from 'fs';
import { IReq, IRes } from '../utils/types';


export const search = (req: IReq<SearchBody>, res: IRes) => {

  const {
    body: {
      searchQuery
    },
  } = req;

  interface mockdata {
  type: string
  name: string;
  id: string;
  mimeType?: string;
  lastModifiedDate?: string;
 }

  try {
   const mockdata = [
      { type: 'folder', name: 'agreements1', id: '478', parentId: '47' },
      { type: 'folder', name: 'agreements2', id: '479', parentId: '47'},
      { type: 'folder', name: 'agreements3', id: '488', parentId: '48'  },
      { type: 'folder', name: 'agreements4', id: '489', parentId: '48'  },
      { type: 'file', name: 'Non-Disclosure Agreement (NDA) - NDA-94460.pdf', id: '4781', mimeType: 'application/pdf', parentId: '478', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Purchase Agreement - PO-90804.pdf', id: '4782', mimeType: 'application/pdf', parentId: '478', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Change Order - CO-01378.pdf', id: '4791', mimeType: 'application/pdf', parentId: '479', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Services Agreement - SERV-64966.pdf', id: '4792', mimeType: 'application/pdf', parentId: '479', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Contractor Agreement - CTR-40262.pdf', id: '4881', mimeType: 'application/pdf', parentId: '488', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Statement Of Work (SOW) - SOW-26116.pdf', id: '4882', mimeType: 'application/pdf', parentId: '488', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Lease Agreement - LEASE-40931.pdf', id: '4891', mimeType: 'application/pdf', parentId: '489', lastModifiedDate: new Date().toISOString() },
      { type: 'file', name: 'Offer Letter - OFFER-44716.pdf', id: '4892', mimeType: 'application/pdf', parentId: '489', lastModifiedDate: new Date().toISOString() },
    ];

  function searchItems(items: mockdata[], searchTerm: string): mockdata[] {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return items.filter(obj => obj.name.toLowerCase().includes(lowerCaseSearchTerm));
  }

  const searchResult: SearchResponse = { results: searchItems(mockdata, searchQuery) };
      return res.json(searchResult);

  }catch (err) {
      console.log(`Search error: ${err.message}`);
    }
};