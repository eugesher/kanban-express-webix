import { Router } from 'express';
import AppController from '../controllers/app.controller';
import passport from '../middlewares/passport';
import { Session, SessionData } from 'express-session';

// todo: refactor

const api = Router();

type TSession = Session & Partial<SessionData>;

interface ISession extends TSession {
  user?: any;
}

api.post('/register', AppController.register);
api.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/api/data',
  }),
);

api.post('/login/status', (req, res) => {
  const session = req.session as ISession;
  res.send(session.user || null);
});

api.post('/logout', (req, res) => {
  const session = req.session as ISession;
  delete session.user;
  res.send({});
});

api.get('/data', (req, res) => {
  res.send([
    {
      id: 1,
      title: 'The Shawshank Redemption',
      year: 1994,
      votes: 678790,
      rating: 9.2,
      rank: 1,
    },
    {
      id: 2,
      title: 'The Godfather',
      year: 1972,
      votes: 511495,
      rating: 9.2,
      rank: 2,
    },
    {
      id: 3,
      title: 'The Godfather: Part II',
      year: 1974,
      votes: 319352,
      rating: 9.0,
      rank: 3,
    },
    {
      id: 4,
      title: 'The Good, the Bad and the Ugly',
      year: 1966,
      votes: 213030,
      rating: 8.9,
      rank: 4,
    },
    {
      id: 5,
      title: 'My Fair Lady',
      year: 1964,
      votes: 533848,
      rating: 8.9,
      rank: 5,
    },
    {
      id: 6,
      title: '12 Angry Men',
      year: 1957,
      votes: 164558,
      rating: 8.9,
      rank: 6,
    },
  ]);
});

export default api;