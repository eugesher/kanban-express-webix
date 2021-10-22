import passport from 'passport';
import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../entities/user.entity';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await getRepository(User).findOne({ username });

    if (!user) {
      return done(null, false, { message: 'invalid user credentials' });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return done(null, false, { message: 'invalid user credentials' });
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
