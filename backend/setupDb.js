const pool = require('./db');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the schema
    await pool.query(schema);
    
    console.log('✅ Database setup completed successfully!');
    console.log('Tables created:');
    console.log('- projects');
    
    // Test the connection
    const projectsResult = await pool.query('SELECT COUNT(*) FROM projects');
    
    console.log(`📊 Current data:`);
    console.log(`- Projects: ${projectsResult.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
  } finally {
    await pool.end();
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;
