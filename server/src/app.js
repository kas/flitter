// npm packages
import express from 'express';
import morgan from 'morgan';

// node.js packages
import path from 'path';

// our packages
import {logger} from './util';
import pool from './db/pg';


// init app
const app = express();

app.disable('x-powered-by');

// set up logging
app.use(morgan('combined', {stream: logger.stream}));

// app.VERB in Express documentation
// get and post are most common verbs
// method takes a path and a function
app.set('port', process.env.PORT || 3000);

// in Express, the order in which routes and middleware are added is important!

app.get('/api/tweet', (req, res) => {
  // get all tweets
  pool.query('SELECT * FROM Pencil;', (err, result) => {
    res.send(result.rows[0].name);
  });
});

app.get('/api/tweet/:user', (req, res) => {
  // get all tweets by user

});

app.get('/headers', (req, res) => {
  res.set('Content-Type', 'text/plain');
  let s = '';
  for (const name in req.headers) s += name + ': ' + req.headers[name] + '\n';
  res.send(s);
});

// app.use is how Express adds middleware
// think of app.use as a catch-all handler for anything that didn't get matched by a route
// Express can distinguish between the 404 and 500 handlers by the number of arguments their callback functions take (covered in ch10 and ch12)
app.use((err, req, res, next) => {
  logger.error('unhandled application error:', err);
  res.status(500).send(err);
});

// export app
export default app;
