# PulseNotes

A full-stack note-taking application with secure user authentication. Create, view, and delete personal notes through a React frontend backed by a Django REST API.

## Features

- User registration and login with JWT authentication
- Automatic access-token refresh for protected routes
- Create, list, and delete personal notes
- Notes scoped per authenticated user
- CORS-enabled API for local frontend development

## Tech Stack

| Layer    | Technologies                                      |
|----------|---------------------------------------------------|
| Frontend | React 19, TypeScript, Vite, React Router, Axios   |
| Backend  | Django 6, Django REST Framework, SimpleJWT        |
| Database | SQLite                                            |
| Tooling  | uv (Python), npm (Node.js)                        |

## Project Structure

```
PulseNotes/
├── backend/                 # Django project
│   ├── api/                 # Notes & auth API app
│   ├── backend/             # Django settings & root URLs
│   └── manage.py
├── frontend/                # React + Vite app
│   ├── src/
│   │   ├── components/      # UI components & protected routes
│   │   ├── pages/           # Home, login, register, 404
│   │   └── api.js           # Axios client with JWT interceptor
│   └── package.json
├── pyproject.toml           # Python dependencies
└── README.md
```

## Prerequisites

- [Python](https://www.python.org/) 3.14+
- [uv](https://docs.astral.sh/uv/) (recommended) or pip
- [Node.js](https://nodejs.org/) 18+ and npm

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd PulseNotes
```

### 2. Backend setup

```bash
# Create and sync the virtual environment
uv sync

# Activate the environment (Windows PowerShell)
.venv\Scripts\Activate.ps1

# Or on macOS/Linux
source .venv/bin/activate

# Apply database migrations
cd backend
python manage.py migrate

# Start the Django development server
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`.

### 3. Frontend setup

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173/` (or the port Vite prints).

### 4. Environment configuration

The frontend expects an API base URL via `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/
```

## API Endpoints

| Method | Endpoint                    | Description              | Auth required |
|--------|-----------------------------|--------------------------|---------------|
| POST   | `/api/user/register/`       | Register a new user      | No            |
| POST   | `/api/token/`               | Obtain JWT access/refresh| No            |
| POST   | `/api/token/refresh/`       | Refresh access token     | No            |
| GET    | `/api/notes/`               | List current user's notes| Yes           |
| POST   | `/api/notes/`               | Create a note            | Yes           |
| DELETE | `/api/notes/delete/<id>/`   | Delete a note            | Yes           |

Authenticated requests must include:

```http
Authorization: Bearer <access_token>
```

## Usage

1. Open the frontend and register a new account.
2. Log in to receive JWT tokens (stored in `localStorage`).
3. Create notes with a title and content from the home page.
4. Delete notes you no longer need.
5. Use **Logout** to clear tokens and return to the login screen.

## Development Scripts

### Backend

```bash
cd backend
python manage.py migrate          # Apply migrations
python manage.py createsuperuser  # Create Django admin user
python manage.py runserver        # Start API server
```

### Frontend

```bash
cd frontend
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run Oxlint
```

## Security Notes

- JWT access tokens expire after **30 minutes**; refresh tokens after **1 day**.
- The current settings use `DEBUG=True`, `ALLOWED_HOSTS=["*"]`, and open CORS for local development. Tighten these before deploying to production.
- Keep `SECRET_KEY` and any credentials out of version control; use environment variables in production.

## License

This project is for personal / educational use. Add a license file if you plan to distribute it.
