# Egyptian League Management API

A RESTful API for managing the Egyptian football league, built with Node.js, Express, and MongoDB. Supports user registration (with avatar upload), authentication, team and match management, and role-based access control.

## Features
- User registration with avatar image upload
- JWT-based authentication and role-based authorization
- CRUD operations for teams and matches
- Data validation and error handling
- Pagination for listing users, teams, and matches
- File upload handling with Multer

## Technology Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- Multer (file uploads)
- JWT (authentication)
- express-validator (validation)
- bcryptjs (password hashing)

## Setup Instructions
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm run run:dev
   ```

## API Endpoints

### Users
- `POST /api/users/register` — Register a new user (with avatar upload, field name: `avatar`)
- `POST /api/users/login` — Login and receive JWT token
- `GET /api/users` — List all users (JWT required)

### Teams
- `GET /teams` — List all teams (pagination: `?limit=10&page=1`)
- `POST /teams` — Add a new team
- `GET /teams/:id` — Get team by ID
- `PUT /teams/:id` — Update team by ID
- `DELETE /teams/:id` — Delete team by ID

### Matches
- `GET /matches` — List all matches (pagination: `?limit=10&page=1`)
- `POST /matches` — Add a new match
- `GET /matches/:id` — Get match by ID
- `PUT /matches/:id` — Update match by ID
- `DELETE /matches/:id` — Delete match by ID

## Data Models

### User
- `firstName`: String
- `lastName`: String
- `email`: String (unique, validated)
- `password`: String (hashed)
- `role`: String (`USER`, `ADMIN`, `MANGER`)
- `avatar`: String (image filename)
- `token`: String (JWT)

### Team
- `name`: String
- `city`: String
- `stadium`: String
- `foundedYear`: Number

### Match
- `homeTeam`: String
- `awayTeam`: String
- `matchDate`: Date
- `score`: String

## Authentication & Authorization
- JWT tokens are required for protected routes (e.g., listing users)
- Role-based access control via middleware (`allowedTo.js`)

## File Uploads
- User avatars are uploaded via Multer and stored in the `uploads/` directory
- Only image files are accepted
- The `uploads/` folder is ignored by git via `.gitignore`

## Error Handling
- Centralized error handling with custom `AppError` class
- Standard HTTP status codes

## Data Migration
- Use `migrateDumyData.js` to seed the database with dummy data

## License
ISC

---

For any questions or issues, please open an issue in the repository.

