import express from 'express';
import usersRouter from './user';
import taxesRouter from './tax';

const app = express();

app.use('/api/users', usersRouter);
app.use('/api/taxes', taxesRouter);


export default app;