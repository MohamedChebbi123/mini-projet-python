# Student Management Application

## Project Overview

This is a student management application that allows students to browse courses, save favorites, and manage their profiles. The application is built with a modern tech stack including Next.js for the frontend and a backend API service.

## Features

- **User Authentication**: Sign up and login functionality for students
- **Course Browsing**: View available courses with detailed information
- **Books/Course Materials**: Access educational books and materials related to courses
- **Favorite Courses**: Save and manage favorite courses
- **User Profile**: View and update student profile information
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Frontend
- **Next.js**: React framework for building the user interface
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling components
- **Axios**: For API requests

### Backend
- RESTful APIs running on separate services
- Data storage for user information and course details

## Project Structure

```
student-app/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js app directory
│   │   ├── Books/     # Books/course materials listing page
│   │   ├── components/# Reusable components like Navbar
│   │   ├── Courses/   # Course details page
│   │   ├── Favoritebooks/ # Saved favorite courses and books
│   │   ├── Login/     # User login page
│   │   ├── Profile/   # User profile page
│   │   ├── Signup/    # User registration page
│   │   ├── Student_course/ # Student's enrolled courses
│   │   ├── layout.tsx # App layout component
│   │   └── page.tsx   # Home page
```

## How to Run the Project

### Prerequisites

1. Node.js (v14.0 or later)
2. npm or yarn package manager
3. Running backend services (API servers)

### Setup Instructions

#### Step 1: Clone the repository

```bash
git clone <repository-url>
cd studnet-management-app/front/student-app
```

#### Step 2: Install dependencies

```bash
npm install
# or
yarn install
```

#### Step 3: Configure API endpoints

Ensure that the backend services are running:
- Course service at `http://localhost:8000`
- User/Favorites service at `http://localhost:8081`

#### Step 4: Run the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

To create a production build:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Using the Application

1. **Sign Up**: Create a new student account through the registration page
2. **Log In**: Access your account with your credentials
3. **Browse Books and Courses**: View available books and courses in the Books section
4. **Course Details**: View comprehensive information about specific courses
5. **Favorite Courses/Books**: Save courses and books to your favorites for quick access later
6. **Profile Management**: View and update your profile information

## API Integration

The frontend communicates with two main API services:

1. **Course API** (http://localhost:8000):
   - Provides course and book listings and details
   - Handles course search and filtering
   - Manages educational materials and resources

2. **User API** (http://localhost:8081):
   - Manages user authentication
   - Handles favorite courses and books functionality
   - Stores user profile information

## Troubleshooting

- **Login Issues**: Ensure the user API is running at the correct port
- **Missing Courses or Books**: Verify that the course API is accessible
- **API Connection Errors**: Check network connectivity and API server status
- **Book Display Problems**: Ensure that book data is being properly fetched from the API

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about styling with Tailwind
- [Axios Documentation](https://axios-http.com/docs/intro) - learn about making HTTP requests
