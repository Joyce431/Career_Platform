# Career Guidance & Employment Integration Platform - Starter Scaffold

This repository is a starter scaffold for the B/DIWA2110 project requirement.
It contains a minimal React frontend, Node/Express backend, and Firebase placeholders.
You should expand, secure, and adapt this scaffold to meet the full assignment requirements.

## Structure
- /frontend - React app (create-react-app style minimal files)
- /backend - Node/Express API server with sample routes
- firebase.rules - Example Firestore rules (starter)
- .env.example - Example environment variables for backend
- README.md - This file

## How to use
1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Start backend (development):
   ```bash
   cd backend
   npm run dev
   ```
4. Start frontend (development):
   ```bash
   cd frontend
   npm start
   ```
5. Replace Firebase config placeholders in `frontend/src/firebaseConfig.js` and configure Firestore rules.

## Notes & Next steps
- This scaffold uses a simple in-memory mock for authentication (you should connect Firebase Auth).
- Database operations in backend are stubbed — integrate Firebase Admin SDK or Firestore SDK in backend.
- Add email verification flows, file uploads (transcripts), and production deployment configs.
- Ensure secure storage of API keys and service account files (do NOT commit real keys).

