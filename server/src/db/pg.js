// npm packages
import pg from 'pg';

// our packages
import {db as dbConfig} from '../../config';
import {logger} from '../util';

// init pg
const pool = new pg.Pool(dbConfig);

pool.on('error', (err, client) => {
  logger.error('idle client error', err.message, err.stack);
});

// export the query method for passing queries to the pool
module.exports.query = (text, values, callback) => {
  return pool.query(text, values, callback);
};
