export interface SMPTAction {
  from: string;
  to?: string;
  bcc?: string;
  cc?: string;
  setReplyTo: boolean;
  replyTo: string;
  subject: string;
  contentType: SMTPActionContenType;
  body: string;
  attachment?: string;
}

export enum SMTPActionContenType {
  PLAIN = 'text/plain',
  HTML = 'text/html',
}
