import { OracleDBAction, OracleDBActionType } from '../../../publicTypes';

export const OracleDBActionSQLModeInitial = {
  raw: '',
};

export const OracleDBActionInitial: OracleDBAction<OracleDBActionType> = {
  mode: 'sql-safe',
  opts: OracleDBActionSQLModeInitial,
};
