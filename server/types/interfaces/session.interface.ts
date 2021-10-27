import { Session, SessionData } from 'express-session';

type TSession = Session & Partial<SessionData>;

export interface ISession extends TSession {
  user?: any;
}
