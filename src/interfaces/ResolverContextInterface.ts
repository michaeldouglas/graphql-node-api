import { AuthUser } from './AuthUserInterface';
import { DbConnection } from './DbConnectionInterface';
//import pusher from './../library/Pusher/index';

export interface ResolverContext {
  db?: DbConnection;
  authorizarion?: string;
  user?: AuthUser;
}
