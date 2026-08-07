# Deployment Notes

## Frontend
- Build with: npm install && npm run build
- Run locally: npm start
- Container build: docker build -t local-services-marketplace .

## Backend
- Run locally from the backend folder with PHP's built-in server:
  php -S localhost:8000 -t public

## Docker Compose
- Start both services:
  docker compose up --build
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
