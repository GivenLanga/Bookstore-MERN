# Project Link: https://bookworl.netlify.app/

# Admin Login:

Email: adminbook@gmail.com
Password: Adimn@2025

# BookVerse - MERN Book Store

BookVerse is a full-stack web application for browsing, searching, and managing books, built with the MERN stack (MongoDB, Express, React, Node.js) and Firebase Authentication.

---

## Features

- **User Dashboard**: Browse trending books, search, manage cart and wishlist, and view your profile with a unique avatar.
- **Admin Dashboard**: Add, edit, and delete books with table and card views.
- **Authentication**: Secure login/signup with Firebase Auth, including password reset.
- **Wishlist & Cart**: Add/remove books to/from wishlist and cart, with persistent state using Redux.
- **Book Details**: View detailed information about each book, including images and descriptions.
- **Responsive UI**: Modern, responsive design using Tailwind CSS and Material UI icons.
- **Notifications**: User feedback via notistack snackbars.
- **Error Handling**: Robust error boundaries for catching UI errors.

---

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Material UI, Redux Toolkit, notistack, react-router-dom
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Authentication**: Firebase Authentication
- **State Management**: Redux Toolkit
- **Icons**: Material UI Icons, React Icons
- **Avatar**: Dicebear Avatars (random cartoon avatar per user)

---

## Folder Structure

- `/frontend/src/pages` - Admin pages (Home, Create, Edit, Delete, ShowBook)
- `/frontend/src/userDashBoard` - User dashboard and components
- `/frontend/src/redux` - Redux store and slices for cart/wishlist
- `/frontend/src/home` - Book card, table, and modal components
- `/frontend/src/components` - Shared components (Spinner, Backbutton)
- `/backend` - Express API and MongoDB models

---

## How It Works

- **Admin** logs in with a specific email (set in `.env` as `VITE_ADMIN_EMAIL`) and can manage all books.
- **Users** can browse, search, add to cart/wishlist, and view their profile with a persistent avatar.
- **Redux** is used for cart and wishlist state, persisted in memory.
- **Book images**: If a book has no image, a placeholder is shown.
- **Profile avatar**: Each user gets a unique Dicebear avatar, consistent across sessions.

---

## Setup & Usage

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Firebase project for authentication

### 1. Backend

1. `cd backend`
2. Create a `.env` file with:
   ```
   MONGODB_URL=your_mongodb_connection_string
   ```
3. Install dependencies: `npm install`
4. Start server: `npm run dev`

### 2. Frontend

1. `cd frontend`
2. Create a `.env` file with:
   ```
   VITE_API_KEY=your_firebase_api_key
   VITE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_PROJECT_ID=your_firebase_project_id
   VITE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_APP_ID=your_firebase_app_id
   VITE_ADMIN_EMAIL=admin@example.com
   ```
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`

### 3. Usage

- Visit `http://localhost:5173` (or the port Vite shows).
- Sign up or log in.
- If you log in as the admin email, you get admin features.
- Regular users get the user dashboard.

---

## Customization

- **Admin Email**: Set `VITE_ADMIN_EMAIL` in your frontend `.env` to control admin access.
- **Book Images**: Add image URLs when creating/editing books.
- **Avatars**: Dicebear avatars are generated and stored in localStorage for consistency.

---

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

---

## License

MIT

---

## Credits

- [Dicebear Avatars](https://www.dicebear.com/)
- [Firebase](https://firebase.google.com/)
- [Material UI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
