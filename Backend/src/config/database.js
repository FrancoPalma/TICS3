const { Pool } = require('pg');
const pool = new Pool({
  user: 'joaquin',
  host: 'localhost',
  database: 'clubkiddo',
  password: 'pw123',
  port: '5432'
});

module.exports = pool;
