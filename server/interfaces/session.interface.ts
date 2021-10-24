import { Session, SessionData } from 'express-session';

type TSession = Session & Partial<SessionData>;

export default interface ISession extends TSession {
  user?: any;
}
