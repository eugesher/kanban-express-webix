import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import User from '../entities/user.entity';
import ISession from '../types/interfaces/session.interface';

const INVALID_CREDENTIALS_MESSAGE = 'invalid user credentials';

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      const user = await getRepository(User).findOne(
        { username },
        { select: ['id', 'password'] },
      );

      if (!user) {
        return done(null, false, { message: INVALID_CREDENTIALS_MESSAGE });
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
        return done(null, false, { message: INVALID_CREDENTIALS_MESSAGE });
      }

      const session = req.session as ISession;
      session.user = user;

      return done(null, user);
    },
  ),
);

passport.serializeUser((user, done) => {
  const u = user as User;
  done(null, u.id);
});

passport.deserializeUser((id, done) => {
  getRepository(User)
    .findOne(id)
    .then((user) => {
      done(null, user);
    });
});

export default passport;
