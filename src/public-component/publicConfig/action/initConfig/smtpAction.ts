import { SMPTAction, SMTPActionContenType } from '../../../publicTypes';

export const SMTPActionInitial: SMPTAction = {
  from: '',
  to: '',
  bcc: '',
  cc: '',
  setReplyTo: false,
  replyTo: '',
  subject: '',
  contentType: SMTPActionContenType.PLAIN,
  body: '',
  attachment: '',
};
