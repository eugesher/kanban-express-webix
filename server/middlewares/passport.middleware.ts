import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import User from '../entities/user.entity';

const INVALID_CREDENTIALS_MESSAGE = 'invalid user credentials';

passport.use(
  new LocalStrategy(async (username, password, done) => {
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

    return done(null, user);
  }),
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
