const { Pool } = require('pg');
require('dotenv').config();

async function createDatabase() {
  // Connect to default postgres database
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  });

  try {
    console.log('Creating broberg_consult database...');
    
    // Check if database exists
    const checkDb = await pool.query(`
      SELECT 1 FROM pg_database WHERE datname = 'broberg_consult'
    `);

    if (checkDb.rows.length === 0) {
      // Create the database
      await pool.query('CREATE DATABASE broberg_consult');
      console.log('✅ Database "broberg_consult" created successfully!');
    } else {
      console.log('ℹ️ Database "broberg_consult" already exists.');
    }

  } catch (error) {
    console.error('❌ Error creating database:', error.message);
  } finally {
    await pool.end();
  }
}

createDatabase();
