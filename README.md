# E-commerce Application

A full-stack e-commerce application built with React, Node.js, and Stripe for payment processing.

## Features

- User authentication with Firebase
- Product catalog and shopping cart
- Stripe payment integration
- Admin dashboard for product management
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Stripe account for payment processing
- Firebase account for authentication

## Environment Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd ecommerce
```

### 2. Install dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your-database-url"

# Firebase Frontend Configuration
REACT_APP_FIREBASE_API_KEY="your-firebase-api-key"
REACT_APP_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
REACT_APP_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
REACT_APP_FIREBASE_APP_ID="your-app-id"
REACT_APP_FIREBASE_MEASUREMENT_ID="your-measurement-id"

# Firebase Admin SDK (Backend)
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="your-service-account-email"
FIREBASE_PRIVATE_KEY="your-private-key"

# Stripe Configuration (IMPORTANT: Replace with your actual Stripe keys)
REACT_APP_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"
STRIPE_SECRET_KEY="sk_test_your_secret_key"

# API Configuration
REACT_APP_API_URL="http://localhost:5000/api"
```

Create a `server/.env` file with backend-specific variables:

```env
# Database
DATABASE_URL="your-database-url"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Server Configuration
PORT=5000
NODE_ENV="development"

# Frontend URL for CORS
FRONTEND_URL="http://localhost:3000"

# Firebase Admin SDK
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="your-service-account-email"
FIREBASE_PRIVATE_KEY="your-private-key"

# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_secret_key"
```

### 4. Stripe Setup

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Replace the placeholder keys in your `.env` files:
   - `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your publishable key (starts with `pk_test_` or `pk_live_`)
   - `STRIPE_SECRET_KEY`: Your secret key (starts with `sk_test_` or `sk_live_`)

⚠️ **Important**: Never commit your actual Stripe secret keys to version control!

## Running the Application

### Development Mode

1. Start the backend server:
```bash
cd server
npm start
```

2. In a new terminal, start the frontend:
```bash
npm start
```

The application will be available at:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

## Troubleshooting

### Stripe Runtime Error
If you see an error like "Cannot read properties of undefined (reading 'match')", it means:
1. The `REACT_APP_STRIPE_PUBLISHABLE_KEY` environment variable is not set
2. The Stripe publishable key is invalid
3. The `.env` file is not being loaded properly

**Solution**:
1. Ensure your `.env` file is in the root directory
2. Restart the development server after adding environment variables
3. Verify your Stripe keys are correct and properly formatted

### Environment Variables Not Loading
- Restart the development server after changing `.env` files
- Ensure `.env` files are in the correct directories
- Check that variable names start with `REACT_APP_` for frontend variables

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App configuration

## Project Structure

```
ecommerce/
├── public/                 # Static files
├── src/                   # Frontend source code
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── context/          # React context providers
│   ├── utils/            # Utility functions
│   └── App.js            # Main app component
├── server/               # Backend source code
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── index.js          # Server entry point
├── .env                  # Frontend environment variables
└── server/.env           # Backend environment variables
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
