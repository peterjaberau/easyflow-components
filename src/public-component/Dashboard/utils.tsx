/** @jsxImportSource @emotion/react */
import { ResourceType } from '../publicTypes';
import { COPY_STATUS, copyToClipboard as copy } from '../utils';
import i18n from 'i18next';
import { ReactNode, lazy } from 'react';
import { createMessage } from '../../design/react';
import React from 'react';

const SupabaseIcon = lazy(() => import('../Icon/actionIcons/supabase'));
const GraphQLIcon = lazy(() => import('../Icon/actionIcons/graphql'));
const ElasticIcon = lazy(() => import('../Icon/actionIcons/elastic'));
const DynamoIcon = lazy(() => import('../Icon/actionIcons/dynamo'));
const SnowflakeIcon = lazy(() => import('../Icon/actionIcons/snowflake'));
const SmtpIcon = lazy(() => import('../Icon/actionIcons/smtp'));
const GoogleSheetIcon = lazy(() => import('../Icon/actionIcons/googlesheets'));
const HuggingFaceIcon = lazy(() => import('../Icon/actionIcons/huggingface'));
const MariaDbIcon = lazy(() => import('../Icon/actionIcons/mariadb'));
const TidbIcon = lazy(() => import('../Icon/actionIcons/tidb'));
const NeonIcon = lazy(() => import('../Icon/actionIcons/neon'));
const S3Icon = lazy(() => import('../Icon/actionIcons/s3'));
const MySqlIcon = lazy(() => import('../Icon/actionIcons/mysql'));
const MicrosoftSqlIcon = lazy(() => import('../Icon/actionIcons/microsoftsql'));
const RestApiIcon = lazy(() => import('../Icon/actionIcons/restapi'));
const MongoDbIcon = lazy(() => import('../Icon/actionIcons/mongodb'));
const RedisIcon = lazy(() => import('../Icon/actionIcons/redis'));
const UpstashIcon = lazy(() => import('../Icon/actionIcons/upstash'));
const HydraIcon = lazy(() => import('../Icon/actionIcons/dydra'));
const PostgreSqlIcon = lazy(() => import('../Icon/actionIcons/postgresql'));
const FirebaseIcon = lazy(() => import('../Icon/actionIcons/firebase'));
const ClickhouseIcon = lazy(() => import('../Icon/actionIcons/clickhouse'));
const CouchDBIcon = lazy(() => import('../Icon/actionIcons/couchdb'));
const OracleDBIcon = lazy(() => import('../Icon/actionIcons/oracle'));
const AppwriteIcon = lazy(() => import('../Icon/actionIcons/appwrite'));
const AirtableIcon = lazy(() => import('../Icon/actionIcons/airtable'));

const message = createMessage();

export const copyToClipboard = (text: string) => {
  const flag = copy(text);
  if (flag === COPY_STATUS.EMPTY) {
    message.info({
      content: i18n.t('empty_copied_tips'),
    });
  } else {
    message.success({
      content: i18n.t('copied'),
    });
  }
};
export function getIconFromResourceType(type: ResourceType, size: string): ReactNode | null {
  switch (type) {
    case 'supabasedb':
      return <SupabaseIcon size={size} />;
    case 'graphql':
      return <GraphQLIcon size={size} />;
    case 'elasticsearch':
      return <ElasticIcon size={size} />;
    case 'dynamodb':
      return <DynamoIcon size={size} />;
    case 'snowflake':
      return <SnowflakeIcon size={size} />;
    case 'smtp':
      return <SmtpIcon size={size} />;
    case 'googlesheets':
      return <GoogleSheetIcon size={size} />;
    case 'hfendpoint':
    case 'huggingface':
      return <HuggingFaceIcon size={size} />;
    case 'mariadb':
      return <MariaDbIcon size={size} />;
    case 'tidb':
      return <TidbIcon size={size} />;
    case 'neon':
      return <NeonIcon size={size} />;
    case 's3':
      return <S3Icon size={size} />;
    case 'mysql':
      return <MySqlIcon size={size} />;
    case 'mssql':
      return <MicrosoftSqlIcon size={size} />;
    case 'restapi':
      return <RestApiIcon size={size} />;
    case 'mongodb':
      return <MongoDbIcon size={size} />;
    case 'redis':
      return <RedisIcon size={size} />;
    case 'upstash':
      return <UpstashIcon size={size} />;
    case 'hydra':
      return <HydraIcon size={size} />;
    case 'postgresql':
      return <PostgreSqlIcon size={size} />;
    case 'firebase':
      return <FirebaseIcon size={size} />;
    case 'clickhouse':
      return <ClickhouseIcon size={size} />;
    case 'couchdb':
      return <CouchDBIcon size={size} />;
    case 'oracle':
    case 'oracle9i':
      return <OracleDBIcon size={size} />;
    case 'appwrite':
      return <AppwriteIcon size={size} />;
    case 'airtable':
      return <AirtableIcon size={size} />;
  }
  return null;
}
