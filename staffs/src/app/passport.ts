import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import {
  ExtractJwt,
  StrategyOptions,
  Strategy as JWTStrategy,
} from 'passport-jwt';

export const strategy = () => {
  const opts: StrategyOptions = {
    secretOrKey: process.env.JWT_SECRET || 'staff_services',
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  };
  return new JWTStrategy(opts, async (jwtPayload, done) => {    
    done(null, jwtPayload);
  });
};

export const jwtAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    console.log(req.headers);
    if (err) {
      next(err);
    } else if (!user) {
      next();
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};
