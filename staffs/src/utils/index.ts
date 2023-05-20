import { includes, isEmpty, pickBy } from "lodash";
import {basename, extname} from 'path';
import multer = require('multer')
const path = require('path');

export const pickForSearch = <T extends object>(
  params: T,
  fields: (keyof T)[]
) => {
  return <T>(
    pickBy(
      params,
      (value, key) => includes(fields, <keyof T>key) && !isEmpty(value)
    )
  );
};

export const createUpload = (des: string) => {
  const storage = multer.diskStorage({
    destination: des,
    filename: editFileName
  });
  const upload = multer({ storage });

  return upload;
}

export const editFileName = (req: any, file: any, callback: any) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const random = ('' + Math.random()).substring(2, 8);
  const random_number = timestamp + random;
  const fileExtName = extname(file.originalname);
  const fileBasename = basename(file.originalname, fileExtName);
  callback(null, `${fileBasename}-${random_number}${fileExtName}`, req);
};

export const addBaseUrlToData = (data: any, field: string) => {
  data = JSON.parse(JSON.stringify(data));
  if (Array.isArray(data)) {
    data.map((doc) => {
      if (doc && doc[field]) {
        doc[field] = doc[field].includes('http')
          ? doc[field]
          : path.join(process.env.IMAGE_URL, doc[field]);
      }
    });
  } else { 
    if (data && data[field]) {
      data[field] = data[field].includes('http')
        ? data[field]
        : path.join(process.env.IMAGE_URL, data[field]);
    }
  }
  return data;
};