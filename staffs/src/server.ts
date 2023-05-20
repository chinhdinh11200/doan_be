import express, { Request, Response, Express, NextFunction } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import authRouter from './app/routes/auth';
import createClient from './app/sequelize';
import errorHandler from './app/middlewares/errorHandle'
import * as http from 'http';
import passport from 'passport';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import { jwtAuthenticate, strategy } from './app/passport';
import path = require('path');
const morgan = require('morgan');
const fs = require('fs');

dotenv.config();

/**
 * Module dependencies.
 */

const startTime = process.hrtime();

// import createApp from './app/app';

// dotenv.config();
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  // tslint:disable-next-line:no-magic-numbers
  const portNumber = parseInt(val, 10);

  if (isNaN(portNumber)) {
    // named pipe
    return val;
  }

  if (portNumber >= 0) {
    // port number
    return portNumber;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(
  process.env.PORT === undefined ? '8081' : process.env.PORT
);

export const createApp = async function () {
  const app = express();
  const port = process.env.PORT;
  const sequelize = await createClient();

  // cors
  const corsOption: CorsOptions = {
    origin: [
      'http://localhost:5173'
    ],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization',
      'Cookies'
    ],
    credentials: true,
    methods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  // app.set('views', `${__dirname}/views`);
  app.use(cors(corsOption));
  app.use(helmet({
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin',
    },
    contentSecurityPolicy: true,
  }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set('view engine', 'pug');
  // app.use(upload.array());
  app.use(express.static('public'));

  console.log(path.join(__dirname, '..', 'public'));
  app.use(
    '/public',
    express.static(path.join(__dirname, '..', 'public'))
  );

  // morgan
  const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' });
  app.use(morgan('combined', { stream: accessLogStream }));
  const setTokenFromCookie = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);
    if (req.cookies && req.cookies.jwt) {
      req.headers.authorization = `Bearer ${req.cookies.jwt}`;
    }
    next();
  };
  // routers
  app.use('/auth', setTokenFromCookie, authRouter(sequelize));

  passport.use(strategy());

  app.use(passport.initialize());
  app.use('/', jwtAuthenticate, router(sequelize));

  app.use(errorHandler);

  return { app };
};

createApp().then(async ({ app }) => {
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  const server = http.createServer(app);
  server.timeout = 1200000; // 1200s

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Event listener for HTTP server 'error' event.
   */

  function onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind =
      typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${(<number>port).toString()}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server 'listening' event.
   */

  function onListening() {
    const addr = server.address();
    const bind =
      typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr!.port.toString()}`;
    console.log(`Listening on ${bind}`);

    const diff = process.hrtime(startTime);
    console.log(
      `api server listening took ${diff[0]} seconds and ${diff[1]} nanoseconds.`
    );
  }
});
