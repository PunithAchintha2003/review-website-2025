# Review Website 2025

MERN Review Website — A full-stack platform for managing and sharing reviews of books, movies, songs, and teledramas.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- User authentication (register, login, password reset, email verification)
- Role-based access (admin, premium, standard users)
- CRUD operations for books, movies, songs, teledramas, and categories
- Review and comment system
- Premium membership and Stripe payment integration
- Image upload with Cloudinary
- Responsive UI with React
- Admin dashboard and user management

## Tech Stack
- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, OTP, Email verification
- **Payments:** Stripe
- **Image Uploads:** Cloudinary
- **Other:** ESLint, Prettier

## Folder Structure
```
review-website-2025/
├── client/         # React frontend
│   ├── src/
│   └── ...
├── server/         # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── route/
│   └── ...
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PunithAchintha2003/review-website-2025.git
   cd review-website-2025
   ```

2. **Install dependencies:**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the `server/` directory and fill in the required values (see [Environment Variables](#environment-variables)).

4. **Run the application:**
   - Start the backend:
     ```bash
     cd server
     npm run dev
     ```
   - Start the frontend:
     ```bash
     cd client
     npm run dev
     ```
   - The frontend will be available at `http://localhost:5173` (default Vite port).

## Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Usage

- Register a new account or log in.
- Browse, add, edit, or delete reviews for books, movies, songs, and teledramas (based on permissions).
- Upgrade to premium for additional features.
- Admins can manage users, categories, and all content.

## Contributing

Contributions are welcome! Please open issues and submit pull requests for new features, bug fixes, or improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Contact

- Author: Punith Achintha
- GitHub: [PunithAchintha2003](https://github.com/PunithAchintha2003)
