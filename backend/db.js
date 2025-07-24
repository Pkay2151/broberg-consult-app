const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false,
  } : false,
});

module.exports = pool;
// This code sets up a connection pool to a PostgreSQL database using the 'pg' library.
// It uses environment variables to configure the connection string and enables SSL for secure connections.
// The pool is exported for use in other parts of the application, allowing for efficient database interactions