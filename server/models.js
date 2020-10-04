require('dotenv').config();

const { Pool } = require('pg');
const pg_url =
  'postgres://eiotbchd:Gn9uz12VjwFzU01g36Uc2V0OKHv1rdwg@lallah.db.elephantsql.com:5432/eiotbchd';
const pool = new Pool({ connectionString: pg_url });

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
