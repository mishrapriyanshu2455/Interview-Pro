# Interview Prep App

A full-stack interview preparation application with AI-generated interview reports, resume analysis, and a 7-day study roadmap.

## Features
- User authentication (register, login, logout) with token blacklist on the backend.
- Upload resume and self-description to generate a tailored interview report.
- View recent interview reports and download a PDF résumé/analysis.
- Protected routes — only authenticated users can create or view reports.
- PDF generation on the server using Puppeteer and AI-driven content.

## Repo Structure
- `Backend/` — Node.js / Express server, MongoDB models, AI service integration
- `Frontend/` — React + Vite SPA, Context for Auth & Interview state

## Quick Setup
Prerequisites: Node.js 18+, npm, MongoDB instance

Backend

1. cd Backend
2. npm install
3. Create a `.env` with the required variables (e.g., `MONGO_URI`, `JWT_SECRET`, any AI keys)
4. npm run dev

Frontend

1. cd Frontend
2. npm install
3. npm run dev

The frontend expects the backend at `http://localhost:3000`. If you changed the backend port, update the `baseURL` in `Frontend/src/Features/auth/services/auth.api.js` and `Frontend/src/Features/interview/services/interview.api.js`.

## Environment variables (recommended)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing secret
- AI integration keys (as used by your `ai.service.js`)

## Authentication Notes
- Login and register endpoints set a cookie named `token`.
- Logout blacklists the token in the backend (`blacklist.model`) and clears the cookie.
- Frontend protects routes using the `Protected` component which checks `user` from context.

## Running the app locally
Start the backend and frontend in separate terminals:

```bash
# backend
cd Backend
npm install
npm run dev

# frontend
cd Frontend
npm install
npm run dev
```

Open the app at `http://localhost:5173` (Vite default) or the port Vite reports.

## Screenshots
<img width="983" height="905" alt="Screenshot 2026-06-07 175809" src="https://github.com/user-attachments/assets/f1a40a14-2b08-4c34-b42b-7cecbb32952d" />


## Troubleshooting
- If authentication appears to "auto-login", ensure cookies are cleared and check the backend `getMe` route and JWT validation middleware.
- If PDF download fails, check backend logs for Puppeteer errors and that the AI service returns valid HTML.

## License
This project is private.
