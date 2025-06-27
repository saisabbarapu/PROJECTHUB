# API Configuration Guide

This guide explains how to configure the API URL for different environments (local development, friend's system, production).

## Quick Setup

### Option 1: Using the Switch Script (Recommended)

1. **Switch to Local Development:**
   ```bash
   node switch-api.js local
   ```

2. **Switch to Friend's System:**
   ```bash
   node switch-api.js friend
   ```

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

### Option 2: Manual Configuration

Edit the `config.js` file and change the `getCurrentConfig()` function:

```javascript
// For local development
return config.development;

// For friend's system
return config.friendSystem;

// For production
return config.production;
```

## Configuration Details

### Local Development
- **URL:** `http://localhost:4000/api`
- **Use when:** Running backend on your local machine
- **Command:** `node switch-api.js local`

### Friend's System
- **URL:** `http://192.168.187.84:4000/api`
- **Use when:** Backend is running on your friend's computer
- **Command:** `node switch-api.js friend`

### Production
- **URL:** `/api`
- **Use when:** Deploying to production
- **Note:** Assumes API is served from the same domain

## Troubleshooting

### Images Not Loading

If images are not loading after switching configurations:

1. **Check Backend Server:**
   - Ensure the backend server is running on the correct IP/port
   - Verify the server is accessible from your network

2. **Check Network Connectivity:**
   - Try pinging the IP address: `ping 192.168.187.84`
   - Check if port 4000 is open: `telnet 192.168.187.84 4000`

3. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for API request errors in the Console tab
   - Check Network tab for failed requests

4. **Verify CORS Configuration:**
   - Ensure the backend CORS settings include your frontend URL
   - Check if the backend allows requests from your IP

### Common Issues

1. **"Network Error" or "Connection Refused":**
   - Backend server is not running
   - Wrong IP address or port
   - Firewall blocking the connection

2. **"CORS Error":**
   - Backend CORS configuration doesn't include your frontend URL
   - Need to update backend CORS settings

3. **"Timeout Error":**
   - Network is slow or unstable
   - Backend server is overloaded

## Backend CORS Configuration

Make sure your backend server includes your frontend URL in the CORS configuration:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://192.168.187.84:3000',
    'http://YOUR_IP:3000'  // Add your IP here
  ],
  credentials: true
}));
```

## Environment Variables

You can also use environment variables by creating a `.env` file:

```env
VITE_API_URL=http://192.168.187.84:4000/api
```

This will override the config.js settings.

## Debugging

The API configuration includes debugging logs. Check the browser console for:

- API Request logs
- API Response logs
- Error messages

This will help identify connection issues quickly. 