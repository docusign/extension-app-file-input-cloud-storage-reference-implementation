import { Schema } from 'express-validator';

export const getFileBody: Schema = {
  fileId: {isString: true},
};

export const listDrivesBody: Schema = {
  containerType: {isString: true},
  sort: {isArray: { options: [{ min: 1 }] }, optional: true},
  'sort.*.sortKey': { trim: true, isString: true, optional: true },
  'sort.*.sortOrder': { trim: true, isString: true, optional: true },
  limit: { isInt: true, optional: true },
  parentId: { isString: true, optional: true },
  metadata: { isObject: true, optional: true },
};

export const listDirectoryContentsBody: Schema = {
  parentId: {isString: true},
  sort: {isArray: { options: [{ min: 1 }] }, optional: true},
  'sort.*.sortKey': { trim: true, isString: true, optional: true },
  'sort.*.sortOrder': { trim: true, isString: true, optional: true },
  limit: { isInt: true, optional: true },
  metadata: { isObject: true, optional: true },
};

export const searchBody: Schema = {
  searchQuery: {isString: true},
  parentId: {isString: true, optional: true},
  sort: {isArray: { options: [{ min: 1 }] }, optional: true},
  'sort.*.sortKey': { trim: true, isString: true , optional: true},
  'sort.*.sortOrder': { trim: true, isString: true , optional: true},
  limit: { isInt: true, optional: true },
  metadata: { isObject: true, optional: true },
};