# Environment Configuration Guide

This guide explains how to configure environment variables for different deployment environments.

## Environment Files

### Development (`.env`)

Used for local development. Contains localhost URLs and debug settings.

```bash
# Copy the example file
cp .env.example .env
```

### Production (`.env.production`)

Used for production deployment. Should contain your live server URLs.

```bash
# Create production environment file
cp .env.example .env.production
# Edit with your production values
```

## Required Environment Variables

### API Configuration

- `VITE_API_BASE_URL` - Your backend API base URL
- `VITE_BACKEND_URL` - Your backend server URL (for file uploads)

### Application Settings

- `VITE_APP_NAME` - Application display name
- `VITE_APP_VERSION` - Current version
- `VITE_NODE_ENV` - Environment (development/production)

### File Upload Settings

- `VITE_MAX_FILE_SIZE` - Maximum file size in bytes (default: 5MB)
- `VITE_ALLOWED_FILE_TYPES` - Comma-separated list of allowed MIME types

### Default Images

- `VITE_DEFAULT_AVATAR_URL` - Default user avatar
- `VITE_DEFAULT_PROJECT_URL` - Default project image
- `VITE_DEFAULT_PLACEHOLDER_URL` - Generic placeholder

### Debug Settings

- `VITE_DEBUG_MODE` - Enable/disable debug features
- `VITE_ENABLE_CONSOLE_LOGS` - Enable/disable console logging

## Environment Examples

### Development

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_BACKEND_URL=http://localhost:3001
VITE_DEBUG_MODE=true
```

### Production

```env
VITE_API_BASE_URL=https://your-api.com/api
VITE_BACKEND_URL=https://your-api.com
VITE_DEBUG_MODE=false
```

### Staging

```env
VITE_API_BASE_URL=https://staging-api.com/api
VITE_BACKEND_URL=https://staging-api.com
VITE_DEBUG_MODE=true
```

## Deployment Instructions

### 1. Build for Production

```bash
npm run build
```

### 2. Environment Variables in Hosting Platforms

#### Vercel

Add environment variables in the Vercel dashboard under Settings > Environment Variables.

#### Netlify

Add environment variables in the Netlify dashboard under Site Settings > Environment Variables.

#### Docker

Create a `.env.production` file or pass variables to docker run:

```bash
docker run -e VITE_API_BASE_URL=https://your-api.com/api your-app
```

### 3. Security Notes

- Never commit `.env` files to version control
- Use different values for each environment
- Rotate sensitive values regularly
- Use HTTPS URLs in production

## Troubleshooting

### Common Issues

1. **Images not loading**: Check `VITE_BACKEND_URL` is correct
2. **API calls failing**: Verify `VITE_API_BASE_URL` is accessible
3. **Console errors in production**: Set `VITE_DEBUG_MODE=false`

### Validation

The app will log configuration on startup if debug mode is enabled:

```javascript
// Check browser console for:
[DEBUG] Environment Configuration: { ... }
```
