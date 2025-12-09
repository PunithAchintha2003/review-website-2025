# Review Website 2025

A comprehensive review platform for books, movies, songs, and teledramas. This full-stack web application allows users to browse, review, and manage multimedia content with an intuitive admin dashboard for content management.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)

## 🎯 About

Review Website 2025 is a Year 2 Semester 1 Computing Group Project that provides a platform for users to discover, review, and interact with various forms of media including books, movies, songs, and teledramas. The platform features user authentication, premium subscriptions, and a comprehensive admin dashboard for content management.

## ✨ Features

### User Features
- **User Authentication**: Secure registration and login with email verification
- **Password Management**: Forgot password functionality with OTP verification
- **Content Browsing**: Browse books, movies, songs, and teledramas
- **Reviews & Comments**: Create and manage reviews and comments on content
- **User Profile**: Manage personal profile and view review history
- **Premium Subscription**: Upgrade to premium membership via Stripe integration
- **Search Functionality**: Search across all content types
- **Category Filtering**: Filter content by categories

### Admin Features
- **Content Management**: CRUD operations for books, movies, songs, and teledramas
- **Category Management**: Create and manage content categories
- **User Management**: View and manage all users, change user roles
- **Image Upload**: Upload and manage images using Cloudinary
- **Dashboard Analytics**: Overview of platform statistics

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Stripe.js** - Payment processing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage
- **Stripe** - Payment processing
- **Resend** - Email service
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** (local or cloud instance)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/PunithAchintha2003/review-website-2025.git
cd review-website-2025
```

### 2. Install Backend Dependencies

```bash
cd "Dashboard and backend/dashboard+backend/server"
npm install
```

### 3. Install Frontend Dependencies (Admin Dashboard)

```bash
cd "../client"
npm install
```

### 4. Client Frontend

The client frontend is a static website. You can open it using a Live Server in VS Code or any web server.

## ⚙️ Configuration

### Backend Configuration

1. Navigate to the server directory:
```bash
cd "Dashboard and backend/dashboard+backend/server"
```

2. Create a `.env` file in the server directory with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email@domain.com

# Server
PORT=8080
```

### Frontend Configuration

1. Navigate to the client directory:
```bash
cd "Dashboard and backend/dashboard+backend/client"
```

2. Update the API base URL in `src/common/SummaryApi.js` if needed.

## 🎮 Usage

### Running the Development Servers

#### Backend Server

```bash
cd "Dashboard and backend/dashboard+backend/server"
npm run dev
```

The backend server will run on `http://localhost:8080`

#### Admin Dashboard (Frontend)

```bash
cd "Dashboard and backend/dashboard+backend/client"
npm run dev
```

The admin dashboard will run on `http://localhost:5173`

#### Client Frontend

1. Open the `Client frontend/Client website` folder in VS Code
2. Use Live Server extension to serve `index.html`
3. Access the site at `http://127.0.0.1:5500`

### Production Build

#### Build Admin Dashboard

```bash
cd "Dashboard and backend/dashboard+backend/client"
npm run build
```

The production build will be in the `dist` directory.

## 📁 Project Structure

```
review-website-2025/
├── Client frontend/
│   └── Client website/          # User-facing website (static)
│
├── Dashboard and backend/
│   └── dashboard+backend/
│       ├── client/               # Admin dashboard (React + Vite)
│       │   ├── src/
│       │   │   ├── component/    # React components
│       │   │   ├── pages/        # Page components
│       │   │   ├── layouts/      # Layout components
│       │   │   ├── route/        # Routing configuration
│       │   │   ├── store/        # Redux store
│       │   │   ├── utils/        # Utility functions
│       │   │   └── common/       # Common API configuration
│       │   └── package.json
│       │
│       └── server/               # Backend server (Express + MongoDB)
│           ├── config/           # Configuration files
│           ├── controllers/     # Route controllers
│           ├── middleware/       # Custom middleware
│           ├── models/          # Mongoose models
│           ├── route/           # API routes
│           ├── utils/           # Utility functions
│           ├── index.js         # Server entry point
│           └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/verify-email` - Verify email with OTP
- `POST /api/user/forgot-password` - Request password reset
- `POST /api/user/reset-password` - Reset password with OTP

### Content Management
- `GET /api/book` - Get all books
- `POST /api/book` - Create book (Admin)
- `PUT /api/book/:id` - Update book (Admin)
- `DELETE /api/book/:id` - Delete book (Admin)

- `GET /api/movie` - Get all movies
- `POST /api/movie` - Create movie (Admin)
- `PUT /api/movie/:id` - Update movie (Admin)
- `DELETE /api/movie/:id` - Delete movie (Admin)

- `GET /api/song` - Get all songs
- `POST /api/song` - Create song (Admin)
- `PUT /api/song/:id` - Update song (Admin)
- `DELETE /api/song/:id` - Delete song (Admin)

- `GET /api/teledrama` - Get all teledramas
- `POST /api/teledrama` - Create teledrama (Admin)
- `PUT /api/teledrama/:id` - Update teledrama (Admin)
- `DELETE /api/teledrama/:id` - Delete teledrama (Admin)

### Reviews
- `GET /api/review` - Get reviews
- `POST /api/review` - Create review
- `PUT /api/review/:id` - Update review
- `DELETE /api/review/:id` - Delete review

### Categories
- `GET /api/category` - Get all categories
- `POST /api/category` - Create category (Admin)
- `PUT /api/category/:id` - Update category (Admin)
- `DELETE /api/category/:id` - Delete category (Admin)

### Orders & Payments
- `POST /api/order` - Create order
- `GET /api/order` - Get user orders

### File Upload
- `POST /api/file/upload` - Upload image to Cloudinary

## 🤝 Contributing

This is a group project for academic purposes. If you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Development Team** - Year 2 Semester 1 Computing Group Project

---

**Note**: This project was developed as part of Year 2 Semester 1 Computing Group Project.
