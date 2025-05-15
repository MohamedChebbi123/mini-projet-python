# Student Management System

A modern web application for educational institutions to manage students, courses, and enrollments.

![Student Management System](https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80)

## Overview

This is an Angular-based admin panel for managing students and courses in educational institutions.

The system allows administrators to:
- Manage student profiles
- Create and delete courses
- View and analyze student data
- Track student enrollment in courses

## Features

- **Student Management**
  - View all students
  - Add new students
  - Delete students (including their course enrollments)

- **Course Management**
  - Create new courses
  - View all courses
  - Delete courses

- **Modern UI**
  - Responsive design works on all devices
  - Clean and intuitive interface
  - Beautiful dashboard with statistics

## Tech Stack

- Angular 16+
- TypeScript
- TailwindCSS for styling
- HttpClient for API communication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setting Up the Project

1. Navigate to the project directory:
   ```
   cd path/to/studnet-management-app/admin
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. The application will be available at `http://localhost:4200`

## API Integration

The application communicates with a backend API for data operations. The frontend assumes the following API endpoints are available:

### Students
- `GET /students` - Retrieve all students
- `POST /delete_student` - Delete a student and their course enrollments

### Courses
- `GET /courses` - Retrieve all courses
- `POST /delete_courses` - Delete a course

## Project Structure

```
student-management-app/admin/
├── src/
│   ├── app/
│   │   ├── studentlist/    # Student management
│   │   ├── courses/        # Course viewing
│   │   ├── add-course/     # Course creation
│   │   └── landing-page/   # Home page
│   └── ...
```

## Usage

### Managing Students
1. Navigate to the "Students" page from the navigation bar
2. View the list of all students
3. To delete a student, click the "Delete" button next to their entry

### Managing Courses
1. To add a course, click on "Add Course" in the navigation bar
2. Fill in the course details and submit the form
3. To view all courses, click on "Courses" in the navigation bar
4. To delete a course, click the "Delete" button under the course card



## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Angular](https://angular.io/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [MySQL](https://www.postgresql.com/)
