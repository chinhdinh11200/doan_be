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
  // console.log("req : ", req); 
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      console.log("Lỗi middleware passport : ", err);
      next(err);
    } else if (!user) {
      console.log("test lỗi : ", err);
      next(err);
    } else {
      req.user = user;
      console.log("user", user);
      next();
    }
  })(req, res, next);
};
