# BestCars — Dealership Review Platform

A full-stack web application for browsing car dealerships and reading/submitting customer reviews, built as the capstone project for the IBM Full Stack Software Developer Professional Certificate.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Create React App) |
| Backend API | Django + Django REST Framework |
| Database microservice | Node.js / Express / MongoDB (Mongoose) |
| Sentiment analysis | Watson NLP API |
| Containerization | Docker / Docker Compose |

## Features

- Browse dealerships nationwide, filterable by state
- Read customer reviews with AI-powered sentiment analysis (Positive / Neutral / Negative)
- Submit reviews for dealerships you've visited
- User authentication (register, login, logout)

## Project Structure

```
/
├── server/
│   ├── frontend/          # React app
│   │   └── src/
│   │       ├── components/
│   │       │   ├── Home/
│   │       │   ├── Navbar/
│   │       │   ├── Login/       # Login + Register
│   │       │   └── Dealers/     # Dealers, Dealer, PostReview
│   │       ├── App.js
│   │       └── index.css
│   ├── djangoapp/         # Django app (views, models, urls)
│   ├── database/          # Node/Express/Mongoose microservice
│   │   ├── app.js
│   │   ├── dealership.js
│   │   ├── review.js
│   │   ├── dealerships.json
│   │   └── reviews.json
│   ├── docker-compose.yml
│   └── .env.example
```

## Running Locally

### Prerequisites
- Docker Desktop
- Node.js 18+ (for local frontend dev only)

### Steps

1. **Clone the repo**
   ```bash
   git clone https://github.com/YusefZahran/xrwvm-fullstack_developer_capstone.git
   cd xrwvm-fullstack_developer_capstone
   ```

2. **Set up environment variables**
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env with your values
   ```

3. **Start all services with Docker**
   ```bash
   cd server
   docker-compose up --build
   ```

4. **Run the frontend** (separate terminal, optional — Django serves static in production)
   ```bash
   cd server/frontend
   npm install
   npm start
   ```

5. **Access the app**
   - Frontend: http://localhost:3000
   - Django API: http://localhost:8000
   - MongoDB microservice: http://localhost:3030

### Services overview

| Service | Port | Description |
|---|---|---|
| `djangoapp` | 8000 | Main backend — auth, sentiment, API routes |
| `nodeapp` | 3030 | MongoDB microservice — dealers & reviews |
| `mongo_db` | 27017 | MongoDB instance (internal only) |

## Environment Variables

Copy `server/.env.example` to `server/.env`:

```env
MONGO_DB_USERNAME=admin
MONGO_DB_PASSWORD=password
SECRET_KEY=your-django-secret-key-here
```

**Never commit `.env` to git.**
