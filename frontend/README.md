# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Project Setup Instructions

## 1. Install Dependencies

Open a terminal and run the following commands in both the `frontend` and `backend` directories:

```
npm install
```

## 2. Create Environment Variables

In the `frontend` directory, create a file named `.env` with the following content:

```
VITE_API_URL=http://your-backend-ip:4000/api
```

Replace `your-backend-ip` with the actual IP address or domain of your backend server.

## 3. Start the Backend Server

In the `backend` directory, run:

```
npm start
```

## 4. Start the Frontend Server

In the `frontend` directory, run:

```
npm run dev
```

## 5. Access the App

Open your browser and go to the URL shown in the terminal (usually `http://localhost:5173`).

---

### Notes
- Do **not** share your real `.env` file. Each developer should create their own.
- If you need to serve images or files from the backend, ensure the backend server is accessible from the device running the frontend.
