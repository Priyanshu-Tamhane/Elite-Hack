# Backend - Authentication API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

3. Start MongoDB locally or use MongoDB Atlas

4. Run the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user (requires auth token)
