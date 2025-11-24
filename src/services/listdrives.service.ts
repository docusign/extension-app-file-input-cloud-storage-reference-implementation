import path from 'path';
import { ListDrivesBody, ListDrivesResponse } from '../models/getfile';
import fs from 'fs';
import { IReq, IRes } from '../utils/types';


export const listDrives = (req: IReq<ListDrivesBody>, res: IRes) => {

  
  try {
  const mockdata = [
      { containerId: '47', containerName: 'Shared Drive 1'},
      { containerId: '48', containerName: 'Shared Drive 2'},
    ];
  const listDrivesResult: ListDrivesResponse = { containerType: "drive", data: mockdata };
      return res.json(listDrivesResult);

  }catch (err) {
      console.log(`Encountered an error listing drives: ${err.message}`);
    }
};