# ROI Warehouse Management System (Rebuild)

## Setup Instructions

1. **Install dependencies:**
   ```sh
   npm install --loglevel verbose
   ```

2. **Create a `.env.local` file in the project root with the following variables:**
   ```env
   # Use your MongoDB Atlas connection string. Never use local MongoDB.
   MONGODB_URI=mongodb+srv://charlesbtt7722:<!Aleconfig770822!>@cluster0.eslgbjq.mongodb.net/roi_warehouse?retryWrites=true&w=majority
   JWT_SECRET=your-very-secure-secret
   ```
   > **Note:** This is your actual Atlas connection string. Keep it secure and do not share it publicly. Local MongoDB is not supported.

3. **Run the development server:**
   ```sh
   npm run dev --loglevel verbose
   ```

## Authentication API
- **Register:** `POST /api/auth/register` (body: `{ username, email, password }`)
- **Login:** `POST /api/auth/login` (body: `{ username, password }`)
- **Protected test route:** `GET /api/protected/hello` (requires valid login)

Tokens are stored in HTTP-only cookies for security.

## Folder Structure
- `src/models` — Mongoose models
- `src/lib` — Utility libraries (auth, db)
- `src/app/api` — API routes (Next.js App Router)
- `src/middleware.ts` — Global middleware for API protection

## Development Plan
This project follows a phased, security-first development plan. See `/src` for structure and `/src/app/api` for API examples.
