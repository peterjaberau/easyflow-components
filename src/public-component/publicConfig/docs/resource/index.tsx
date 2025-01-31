/** @jsxImportSource @emotion/react */

import { DOC_PREFIX } from '../constants';

export const ACTION_TYPE_MAP_DOC_LINK: Record<string, string> = {
  airtable: `${DOC_PREFIX}airtable`,
  s3: `${DOC_PREFIX}amazons3`,
  appwrite: `${DOC_PREFIX}appwrite`,
  clickhouse: `${DOC_PREFIX}clickhouse`,
  elasticsearch: `${DOC_PREFIX}elastic-search`,
  firebase: `${DOC_PREFIX}firebase`,
  huggingface: `${DOC_PREFIX}hugging-face-api`,
  hfendpoint: `${DOC_PREFIX}hugging-face-endpoint`,
  hydra: `${DOC_PREFIX}hydra`,
  mariadb: `${DOC_PREFIX}mariadb`,
  mssql: `${DOC_PREFIX}microsoft-sql`,
  mongodb: `${DOC_PREFIX}mongodb`,
  mysql: `${DOC_PREFIX}mysql`,
  neon: `${DOC_PREFIX}neon`,
  oracle9i: `${DOC_PREFIX}oracledb`,
  oracle: `${DOC_PREFIX}oracledb`,
  postgresql: `${DOC_PREFIX}postgresql`,
  redis: `${DOC_PREFIX}redis`,
  restapi: `${DOC_PREFIX}restapi`,
  snowflake: `${DOC_PREFIX}snowflake`,
  supabasedb: `${DOC_PREFIX}supabase`,
  tidb: `${DOC_PREFIX}tidb`,
  transformer: `${DOC_PREFIX}transformer`,
  upstash: `${DOC_PREFIX}upstash`,
  aiagent: `${DOC_PREFIX}ai-agent`,

  // graphql: `${DOC_PREFIX}graphql`,
  // dynamodb: `${DOC_PREFIX}dynamodb`,
  // smtp: `${DOC_PREFIX}smtp`,
  // googlesheets: `${DOC_PREFIX}googlesheets`,
  // couchdb: `${DOC_PREFIX}couchdb`,
  // globalData: `${DOC_PREFIX}globalData`,
};
