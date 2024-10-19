import { S3ACL, S3Resource } from '../../../publicTypes';

export const S3ResourceInitial: S3Resource = {
  bucketName: '',
  region: '',
  endpoint: false,
  baseURL: '',
  accessKeyID: '',
  secretAccessKey: '',
  acl: S3ACL.blank,
};
