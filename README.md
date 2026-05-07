# Product Management System

A full-stack web application for managing products with authentication, built using Node.js/Express backend and React frontend.

## Features

- **Authentication**: JWT-based admin authentication
- **Product CRUD Operations**: Create, Read, Update, Delete products
- **Image Upload**: Optional product image upload with validation
- **Form Validation**: Client-side and server-side validation
- **Responsive Design**: Clean and modern UI/UX
- **Protected Routes**: Admin-only access for product management

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Express Validator

### Frontend
- React.js
- React Router
- Axios for API calls
- CSS (no framework - custom styles)

## Project Structure

```
Machinetest/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── products.js
│   ├── middleware/
│   │   └── auth.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/product-management
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   (or `npm start` for production)

5. Create an admin user (optional - you can register via the frontend):
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"username": "admin", "password": "admin123"}'
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new admin user
- `POST /api/auth/login` - Login admin user

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get single product (public)
- `POST /api/products` - Create new product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

## Product Schema

```javascript
{
  name: String (required),
  price: Number (required, positive),
  category: String (required),
  inStock: Boolean (default: true),
  image: String (optional)
}
```

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

## Usage

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Login with admin credentials
4. Create, view, edit, and delete products
5. Upload images for products (optional)

## Image Upload

- Supported formats: JPEG, JPG, PNG, GIF
- Maximum file size: 5MB
- Images are stored in `backend/uploads/` directory
- Images are served at `/uploads` endpoint

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- File upload validation

## Development

### Running in Development Mode

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Make sure MongoDB is running on your system
2. **CORS Errors**: Ensure backend is running and CORS is properly configured
3. **Image Upload Issues**: Check `uploads` directory permissions
4. **Authentication Issues**: Verify JWT secret is the same in backend and frontend

### Port Conflicts

- Backend runs on port 5000 by default
- Frontend runs on port 3000 by default
- Change ports in `.env` file (backend) or `package.json` (frontend) if needed

## License

This project is for educational purposes only.
