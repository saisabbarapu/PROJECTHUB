# Environment Variables Example

## Frontend Configuration (.env file in frontend directory)

Create a file named `.env` in the `frontend` directory with this content:

```
# API URL for backend connection
VITE_API_URL=http://localhost:4000/api
```

### Different scenarios:

**Same computer:**
```
VITE_API_URL=http://localhost:4000/api
```

**Different computers (replace with actual IP):**
```
VITE_API_URL=http://192.168.1.100:4000/api
```

**Production:**
```
VITE_API_URL=https://yourdomain.com/api
```

## Backend Configuration (.env file in backend directory) - Optional

Create a file named `.env` in the `backend` directory if you want to customize:

```
MONGODB_URL=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=4000
```

## How to find your IP address:

**Windows:**
```cmd
ipconfig
```
Look for "IPv4 Address" under your network adapter.

**Mac/Linux:**
```bash
ifconfig
# or
ip addr
```

## Important Notes:
- The frontend `.env` file is REQUIRED
- The backend `.env` file is optional (uses defaults if not provided)
- Never commit `.env` files to version control
- Restart the servers after changing environment variables 