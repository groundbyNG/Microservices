import express from 'express';
import session from 'express-session';
import transactionRouter from './transaction';
import { taxRouter } from './tax';
import signinRouter from './signin';
import signupRouter from './signup';
import logoutRouter from './logout';

const app = express();

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  }));

app.use('/api/logout', logoutRouter);
app.use('/api/signup', signupRouter);
app.use('/api/signin', signinRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/tax', taxRouter);

export default app;