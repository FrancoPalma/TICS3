const { Pool } = require('pg');
const pool = new Pool({
  user: 'dwrtdkgp',
  host: 'kesavan.db.elephantsql.com',
  database: 'dwrtdkgp',
  password: 'jJhJR28cEIwIp7x9-aEcfty_8MAGEtHp'
});

module.exports = pool;
