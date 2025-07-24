# Broberg Consult Backend API

This is the backend API for the Broberg Consult application, providing CRUD operations for managing projects.

## Features

- **Project Management**: Complete CRUD operations for projects
- **Client Information**: Store client details directly with each project
- **Database Integration**: PostgreSQL database with connection pooling
- **RESTful API**: Clean and intuitive API endpoints
- **Error Handling**: Comprehensive error handling and validation

## Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory with your database configuration:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/broberg_consult
PORT=5000
```

3. Set up the database:
```bash
npm run setup-db
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Projects

#### Get All Projects
- **GET** `/api/projects`
- Returns all projects ordered by creation date (newest first)

#### Get Project by ID
- **GET** `/api/projects/:id`
- Returns a specific project by ID

#### Create New Project
- **POST** `/api/projects`
- Body:
```json
{
  "name": "Project Name", // Required
  "description": "Project description",
  "client_name": "Client Company Name", // Optional
  "client_email": "client@company.com", // Optional
  "status": "planning", // Optional: planning, in_progress, on_hold, completed, cancelled
  "start_date": "2025-01-01", // Optional: YYYY-MM-DD format
  "end_date": "2025-06-01", // Optional: YYYY-MM-DD format
  "budget": 25000.00 // Optional: decimal number
}
```

#### Update Project
- **PUT** `/api/projects/:id`
- Body: Same as create, but all fields are optional (partial updates supported)

#### Delete Project
- **DELETE** `/api/projects/:id`
- Deletes a project by ID

#### Get Projects by Client Name
- **GET** `/api/projects/client/:clientName`
- Returns all projects for a specific client (case-insensitive partial match)

## Database Schema

### Projects Table
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    client_name VARCHAR(255), -- Store client name directly
    client_email VARCHAR(255), -- Store client email directly
    status VARCHAR(50) DEFAULT 'planning',
    start_date DATE,
    end_date DATE,
    budget DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Status Values

- `planning` - Project is in planning phase
- `in_progress` - Project is currently being worked on
- `on_hold` - Project is temporarily paused
- `completed` - Project has been finished
- `cancelled` - Project has been cancelled

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created successfully
- `400` - Bad request (validation errors)
- `404` - Resource not found
- `500` - Internal server error

Error responses include a JSON object with an `error` field describing the issue.

## Development

### Adding New Features

1. Create controller functions in the appropriate controller file
2. Add routes in the corresponding routes file
3. Update the main `index.js` file if needed
4. Test the endpoints

### Database Migrations

When making schema changes:

1. Update the `schema.sql` file
2. Run `npm run setup-db` to apply changes
3. Update the API documentation

## Dependencies

- **express**: Web framework
- **pg**: PostgreSQL client
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## License

ISC
