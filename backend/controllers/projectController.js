const pool = require('../db');

// Get all projects
const getProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Server error while fetching projects' });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Server error while fetching project' });
  }
};

// Add a new project
const addProject = async (req, res) => {
  const { name_of_project, date, location, client_name, project_features, position_held, activities, funding, status } = req.body;
  
  // Validate required fields
  if (!name_of_project) {
    return res.status(400).json({ error: 'Project name is required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO projects (name_of_project, date, location, client_name, project_features, position_held, activities, funding, status, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *`,
      [name_of_project, date, location, client_name, project_features, position_held, activities, funding, status || 'completed']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding project:', err);
    res.status(500).json({ error: 'Server error while adding project' });
  }
};

// Update an existing project
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name_of_project, date, location, client_name, project_features, position_held, activities, funding, status } = req.body;

  try {
    // Check if project exists
    const existingProject = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (existingProject.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const result = await pool.query(
      `UPDATE projects 
       SET name_of_project = COALESCE($1, name_of_project), 
           date = COALESCE($2, date), 
           location = COALESCE($3, location), 
           client_name = COALESCE($4, client_name), 
           project_features = COALESCE($5, project_features), 
           position_held = COALESCE($6, position_held), 
           activities = COALESCE($7, activities), 
           funding = COALESCE($8, funding), 
           status = COALESCE($9, status), 
           updated_at = NOW() 
       WHERE id = $10 RETURNING *`,
      [name_of_project, date, location, client_name, project_features, position_held, activities, funding, status, id]
    );
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Server error while updating project' });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if project exists
    const existingProject = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (existingProject.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Server error while deleting project' });
  }
};

// Get projects by client name
const getProjectsByClient = async (req, res) => {
  const { clientName } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE client_name ILIKE $1 ORDER BY created_at DESC', 
      [`%${clientName}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects by client:', err);
    res.status(500).json({ error: 'Server error while fetching projects by client' });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
  getProjectsByClient,
};
