import {
  MicrosoftSqlAction,
  MicrosoftSqlActionGUIMode,
  MicrosoftSqlActionSqlMode,
  MicrosoftSqlActionType,
} from '../../../publicTypes';

export const MicrosoftSqlActionSqlModeInitial: MicrosoftSqlActionSqlMode = {
  sql: '',
};

export const MicrosoftSqlActionGUIModeInitial: MicrosoftSqlActionGUIMode = {
  table: '',
  type: 'bulk_insert',
  records: '',
};

export const MicrosoftSqlActionInitial: MicrosoftSqlAction<MicrosoftSqlActionType> = {
  mode: 'sql-safe',
  query: MicrosoftSqlActionSqlModeInitial,
};
