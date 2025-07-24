const pool = require('./db');

async function viewDatabase() {
  try {
    console.log('🔍 Connecting to database...\n');
    
    // Show all projects
    const projectsResult = await pool.query(`
      SELECT 
        id, 
        name_of_project, 
        client_name, 
        date, 
        location,
        project_features,
        position_held,
        activities,
        funding,
        status
      FROM projects 
      ORDER BY date DESC
    `);
    
    console.log(`📊 Found ${projectsResult.rows.length} projects:\n`);
    
    projectsResult.rows.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name_of_project}`);
      console.log(`   Client: ${project.client_name}`);
      console.log(`   Date: ${project.date}`);
      console.log(`   Location: ${project.location}`);
      console.log(`   Position: ${project.position_held}`);
      console.log(`   Features: ${project.project_features}`);
      console.log(`   Activities: ${project.activities}`);
      console.log(`   Funding: ${project.funding}`);
      console.log(`   Status: ${project.status}`);
      console.log('   ' + '-'.repeat(70));
    });
    
    // Show summary by status
    const statusResult = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM projects 
      GROUP BY status
      ORDER BY count DESC
    `);
    
    console.log('\n📈 Summary by Status:');
    statusResult.rows.forEach(row => {
      console.log(`   ${row.status}: ${row.count} projects`);
    });

    // Show summary by client
    const clientResult = await pool.query(`
      SELECT client_name, COUNT(*) as count
      FROM projects 
      GROUP BY client_name
      ORDER BY count DESC
      LIMIT 10
    `);
    
    console.log('\n🏢 Top 10 Clients by Project Count:');
    clientResult.rows.forEach(row => {
      console.log(`   ${row.client_name}: ${row.count} projects`);
    });

    // Show summary by year
    const yearResult = await pool.query(`
      SELECT 
        CASE 
          WHEN date LIKE '%2010%' THEN '2010'
          WHEN date LIKE '%2011%' THEN '2011'
          WHEN date LIKE '%2012%' THEN '2012'
          WHEN date LIKE '%2013%' THEN '2013'
          WHEN date LIKE '%2014%' THEN '2014'
          WHEN date LIKE '%2015%' THEN '2015'
          WHEN date LIKE '%2016%' THEN '2016'
          WHEN date LIKE '%2017%' THEN '2017'
          WHEN date LIKE '%2018%' THEN '2018'
          WHEN date LIKE '%2019%' THEN '2019'
          WHEN date LIKE '%2020%' THEN '2020'
          WHEN date LIKE '%2021%' THEN '2021'
          WHEN date LIKE '%2022%' THEN '2022'
          WHEN date LIKE '%2023%' THEN '2023'
          WHEN date LIKE '%2024%' THEN '2024'
          WHEN date LIKE '%2025%' THEN '2025'
          ELSE 'Other'
        END as year,
        COUNT(*) as count
      FROM projects 
      GROUP BY year
      ORDER BY year
    `);
    
    console.log('\n📅 Projects by Year:');
    yearResult.rows.forEach(row => {
      console.log(`   ${row.year}: ${row.count} projects`);
    });
    
  } catch (error) {
    console.error('❌ Error viewing database:', error);
  } finally {
    await pool.end();
  }
}

// Run the viewer if this file is executed directly
if (require.main === module) {
  viewDatabase();
}

module.exports = viewDatabase;
