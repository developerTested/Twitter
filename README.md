# Twitter Clone

A simple Twitter clone built with TypeScript, React, and a Node.js backend. This project mimics the core functionalities of Twitter, allowing users to post tweets, follow other users, and interact with tweets.

## Tech Stack

### Frontend
- **TypeScript**: For type safety and better developer experience.
- **Vite**: A fast development server and build tool.
- **React**: For building user interfaces.
- **Redux**: State management for predictable state.
- **Axios**: Promise-based HTTP client for making API requests.
- **ShadCN**: UI components for a modern design.
- **React Icons**: A library for including icons in the UI.
- **React Hook Form**: For managing forms and validation.
- **Zod**: For schema validation and TypeScript integration.

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for building APIs.
- **Mongoose**: MongoDB object modeling for Node.js.
- **jsonwebtoken**: For authentication using JWTs.
- **bcrypt**: For hashing passwords securely.
- **Cloudinary**: For storing and serving images.
- **cookie-parser**: Middleware for parsing cookies.
- **dotenv**: For environment variable management.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **Multer**: Middleware for handling multipart/form-data, used for uploading files.
- **Zod**: For validation of request bodies and responses.

## Features

- User authentication (sign up, login)
- Post tweets and images
- Follow and unfollow users
- Like and retweet functionality
- View and search for tweets

## Installation

### Prerequisites

- Node.js (v14 or above)
- MongoDB (local or hosted)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and set the following variables:
   ```plaintext
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   CLOUDINARY_URL=<your_cloudinary_url>
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Usage

- Visit the frontend application in your browser at `http://localhost:3000`.
- Use the provided authentication features to create an account or log in.
- Start tweeting!

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you'd like to add.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.