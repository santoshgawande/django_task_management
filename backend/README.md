# Backend (Django)

This directory contains the Django REST Framework backend with Channels WebSocket support.

## Prerequisites
- Python 3.10+
- PostgreSQL
- Redis
- channel
- websocket

## Setup
1. Create virtualenv:

```bash
   python3.10 -m venv venv
   source venv/bin/activate
```

2. Install deps:
```bash
pip install -r requirements.txt
```
3. Configure .env (copy .env.example):
```bash
SECRET_KEY=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
```
4. Migrate & seed:
```bash
python manage.py migrate
python manage.py seed_data
```
5. Start backend (ASGI):
```bash
uvicorn taskmanager.asgi:application --reload
```

### Commands

```bash
python manage.py test — run tests

python manage.py shell — Django shell
```

## API Endpoints

- `POST /api/accounts/register/`

- `POST /api/accounts/login/`

- `GET /api/tasks/` (filter, paginate)

## WebSocket

- `ws://localhost:8000/ws/tasks/` for real-time updates





