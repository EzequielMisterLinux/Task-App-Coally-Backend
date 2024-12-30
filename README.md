# Task Management API App-Coally-Backend

A robust REST API built with TypeScript and Express for managing tasks and users. This API implements secure authentication, file uploads, and follows MVC architecture patterns.

## 🚀 Features

- User authentication and authorization
- Task CRUD operations
- Profile image upload
- Swagger documentation
- CORS protection
- Security headers with Helmet
- MongoDB integration
- Environment configuration
- TypeScript support

## 🏗️ Architecture

The project follows the MVC (Model-View-Controller) architecture pattern with additional layers:

```
src/
├── controllers/      # Request handlers and business logic
├── models/          # Database schemas and models
├── routes/          # API route definitions
├── middlewares/     # Request processing middleware
│   ├── security/    # Authentication middleware
│   └── validations/ # Request validation
├── interfaces/      # TypeScript interfaces
├── repositories/    # Data access layer
└── database/        # Database configuration
```

### Key Components:

- **Controllers**: Handle HTTP requests and contain business logic
- **Models**: Define data structures using Mongoose schemas
- **Repositories**: Handle database operations
- **Middlewares**: Process requests for authentication, validation, and file uploads
- **Interfaces**: Define TypeScript types for the application
- **Routes**: Define API endpoints and their corresponding controllers

## 🛠️ Technologies

- **TypeScript**: Programming language
- **Express**: Web framework
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Multer**: File upload handling
- **Swagger**: API documentation
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logging

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- Git

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGOURL=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:4173
UPLOAD_IMG=http://localhost:3000
NODE_ENV=development
```

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd [your-repo-name]
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

### Scripts

- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build the project
- `npm start`: Run the built project
- `npm run clean`: Clean build directory
- `npm test`: Run tests

## 📡 API Endpoints

### Users

#### POST /api/register
- Creates a new user account
- Accepts multipart/form-data with:
  - names (string)
  - lastnames (string)
  - age (number)
  - email (string)
  - password (string)
  - profileImage (file)

#### POST /api/login
- Authenticates user
- Accepts JSON with:
  - email
  - password
- Returns authentication token in cookie

#### GET /api/profile
- Retrieves authenticated user's profile
- Requires authentication

### Tasks

#### GET /api/tasks
- Retrieves all tasks for authenticated user
- Requires authentication

#### POST /api/tasks
- Creates new task
- Requires authentication
- Accepts JSON with:
  - title (string)
  - description (string)

#### GET /api/tasks/{id}
- Retrieves specific task
- Requires authentication

#### PUT /api/tasks/{id}
- Updates specific task
- Requires authentication
- Accepts JSON with:
  - title (string, optional)
  - description (string, optional)
  - completed (boolean, optional)

#### DELETE /api/tasks/{id}
- Deletes specific task
- Requires authentication

## 📚 API Documentation

The API documentation is available through Swagger UI at:
```
http://localhost:3000/api-docs
```

## 🔐 Security

The API implements several security measures:

- JWT authentication
- Password hashing with bcrypt
- Helmet security headers
- CORS protection
- Input validation
- Secure cookie settings

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Set environment variables for production:
```env
NODE_ENV=production
```

3. Start the server:
```bash
npm start
```

## Test User

For testing purposes, you can use:
- Email: humbertoezequiel.z.c@gmail.com
- Password: A12345678b

## 💻 Development

The project uses TypeScript with the following development tools:

- `ts-node-dev`: Hot-reload for development
- `typescript`: TypeScript compiler
- `jest`: Testing framework
- ESLint configuration available for code style