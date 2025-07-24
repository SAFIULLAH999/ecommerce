# E-commerce Backend API

This is the backend API for the e-commerce application, providing authentication and user management functionality.

## Features

- 🔐 User registration and login
- 🛡️ JWT-based authentication
- 🔒 Password hashing with bcrypt
- ⚡ Rate limiting for security
- 📊 Prisma ORM for database management
- ✅ Input validation
- 🚀 Express.js server

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the server directory:
   ```bash
   cp .env.example .env
   ```
   
   Update the environment variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   JWT_EXPIRES_IN="7d"
   PORT=5000
   NODE_ENV="development"
   FRONTEND_URL="http://localhost:3000"
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # (Optional) Open Prisma Studio to view data
   npx prisma studio
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

#### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!",
  "confirmPassword": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "SALES_REP",
      "isEmailVerified": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST `/api/auth/signin`
Sign in to existing account.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Signin successful",
  "data": {
    "user": {
      "id": "user_id",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "SALES_REP"
    },
    "token": "jwt_token_here"
  }
}
```

#### GET `/api/auth/me`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "SALES_REP",
      "isEmailVerified": false,
      "profileImage": null,
      "lastLoginAt": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### POST `/api/auth/logout`
Logout user (clears token client-side).

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes for auth endpoints
- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: Configurable expiration time
- **Input Validation**: Email format, password strength requirements
- **CORS Protection**: Configurable allowed origins
- **Error Handling**: Secure error messages without sensitive data exposure

## Database Schema

The User model includes:
- Basic profile information (firstName, lastName, email)
- Authentication fields (password, tokens, verification status)
- Social auth support (googleId, facebookId)
- Security features (active status, login tracking)

## Development

### Running Tests
```bash
npm test
```

### Database Management
```bash
# Reset database
npx prisma migrate reset

# View database
npx prisma studio

# Generate new migration
npx prisma migrate dev --name migration_name
```

### Project Structure
```
server/
├── index.js              # Main server file
├── routes/
│   └── auth.js           # Authentication routes
├── middleware/
│   └── auth.js           # Authentication middleware
├── utils/
│   └── auth.js           # Authentication utilities
├── package.json
└── .env.example
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure proper database URL
4. Set up SSL/HTTPS
5. Configure proper CORS origins
6. Set up logging and monitoring

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify DATABASE_URL format
   - Ensure database exists

2. **JWT Token Error**
   - Check JWT_SECRET is set
   - Verify token format in requests
   - Check token expiration

3. **CORS Error**
   - Verify FRONTEND_URL matches client domain
   - Check CORS configuration

### Debug Mode
Set `NODE_ENV=development` for detailed error messages.
