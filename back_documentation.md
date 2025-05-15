# Student Management Application Documentation

## Project Overview

This is a Student Management Application built with FastAPI for the backend. The application provides a RESTful API to manage students, courses, enrollment, and includes additional features like book recommendations and summaries.

## Features

- **Student Management**: Add, view, and delete students
- **Course Management**: Add, view, and delete courses
- **Enrollment System**: Enroll students in courses, view enrolled courses, and remove enrollments
- **Book Recommendations**: Scrape book information from external sources and provide recommendations
- **Book Summaries**: Generate summaries for books using AI (via OpenRouter API)

## Technical Stack

- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **Web Scraping**: BeautifulSoup4
- **AI Integration**: OpenRouter API with Mistral-7B
- **Performance Testing**: Locust

## Database Schema

The application uses PostgreSQL with the following main tables:

- **students**: Stores student information
- **courses**: Stores course information
- **student_courses**: Junction table for student enrollment in courses
- **recommended_books**: Stores book recommendations

## API Endpoints

### Student Endpoints

- `POST /addstudent`: Add a new student
- `POST /loginstudent`: Student login
- `GET /profile?student_id={id}`: Get student profile
- `GET /students`: Get all students
- `POST /delete_student`: Delete a student

### Course Endpoints

- `POST /addcourse`: Add a new course
- `GET /courses`: Get all courses
- `POST /favourite_courses`: Get a specific course
- `POST /delete_courses`: Delete a course

### Enrollment Endpoints

- `POST /add_course_std`: Enroll a student in a course
- `POST /student_courses`: Get courses enrolled by a student
- `POST /del_std_course`: Un-enroll a student from a course

### Book Endpoints

- `GET /books`: Scrape and store book recommendations
- `GET /rec_book`: Get stored book recommendations
- `POST /summarize`: Generate a summary for a book

## Setup and Installation

### Prerequisites

- Python 3.7+
- PostgreSQL
- Git (optional)

### Environment Setup

1. Clone the repository (if applicable):
   ```
   git clone <repository-url>
   cd studnet-management-app/back
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up the database:
   - Create a PostgreSQL database named `dbst`
   - Make sure the PostgreSQL server is running

5. Create a `.env` file in the project root with:
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```

6. Create the necessary database tables:
   ```sql
   CREATE TABLE students (
     students_id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     age INTEGER NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     department VARCHAR(100) NOT NULL
   );

   CREATE TABLE courses (
     course_id SERIAL PRIMARY KEY,
     course_name VARCHAR(100) NOT NULL,
     course_field VARCHAR(100) NOT NULL,
     course_duration VARCHAR(50) NOT NULL,
     course_price VARCHAR(50) NOT NULL
   );

   CREATE TABLE student_courses (
     enrolled_course_id SERIAL PRIMARY KEY,
     student_id INTEGER REFERENCES students(students_id) ON DELETE CASCADE,
     course_id INTEGER REFERENCES courses(course_id) ON DELETE CASCADE,
     enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE recommended_books (
     book_id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     price VARCHAR(50) NOT NULL,
     image_url TEXT NOT NULL,
     availability VARCHAR(100) NOT NULL
   );
   ```

## Running the Application

1. Ensure your virtual environment is activated:
   ```
   venv\Scripts\activate
   ```

2. Start the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

3. The API will be available at: `http://127.0.0.1:8000`

4. Access the API documentation at: `http://127.0.0.1:8000/docs`

## Performance Testing

The application includes Locust performance testing scripts:

1. Ensure Locust is installed:
   ```
   pip install locust
   ```

2. Run the basic performance test (10 users, 30 seconds):
   ```
   python run_performance_test.py
   ```

3. Run advanced performance test with parameters:
   ```
   python run_advanced_test.py --users 20 --spawn-rate 2 --duration 1m
   ```

4. View detailed test reports in the `performance_reports` directory

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Ensure PostgreSQL is running
   - Check database credentials in the code
   - Verify the `dbst` database exists

2. **OpenRouter API Errors**
   - Ensure your `.env` file contains a valid API key
   - Check your internet connection

3. **Transaction Errors**
   - If you see errors about aborted transactions, verify that your operations are in a valid SQL state
   - Each write operation includes proper error handling and transaction rollback

### Debugging

For detailed logging, modify the application to include additional logging information:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Development

### Adding New Endpoints

To add a new endpoint:

1. Define any required Pydantic models
2. Add the route function with appropriate decorator
3. Implement database operations with proper error handling
4. Test the endpoint

Example:
```python
class NewModel(BaseModel):
    field1: str
    field2: int

@app.post("/new_endpoint")
def new_function(data: NewModel):
    try:
        # Implementation
        return {"result": "success"}
    except Exception as e:
        database.rollback()
        raise HTTPException(status_code=500, detail=str(e))
```

## License

This project is licensed under [Your License]

## Contact

For support or questions, please contact [Your Contact Information]
