import { Router } from 'express';

import Paths from '../constants/paths';
import { getFile } from '../services/getfile.service';
import { listDrives } from '../services/listdrives.service';
import {listDirectoryContents} from '../services/listdirectorycontents.service'
import {search} from '../services/search.service'
import { expressjwt as jwt } from 'express-jwt';
import { checkSchema } from 'express-validator';
import { getFileBody, listDrivesBody, listDirectoryContentsBody, searchBody } from '../validationSchemas/getfile';
import checkValidationErrors from '../middleware/checkValidationErrors';
import env from '../env';

const getFileRouter = Router();

getFileRouter.post(
  Paths.Get.File.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(getFileBody, ['body']),
  checkValidationErrors,
  getFile,
);

getFileRouter.post(
  Paths.ListDrives.File.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(listDrivesBody, ['body']),
  checkValidationErrors,
  listDrives,
);

getFileRouter.post(
  Paths.ListDirectoryContents.File.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(listDirectoryContentsBody, ['body']),
  checkValidationErrors,
  listDirectoryContents,
);

getFileRouter.post(
  Paths.Search.File.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(searchBody, ['body']),
  checkValidationErrors,
  search,
);

export default getFileRouter;
