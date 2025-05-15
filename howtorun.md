# Student Management Application

A full-featured student management system with FastAPI, PostgreSQL, and AI integration.

## Overview

This application provides an API for managing students, courses, enrollment, book recommendations and AI-powered book summaries.

## Quick Start

1. **Prerequisites**
   - Python 3.7+
   - PostgreSQL
   - OpenRouter API key (for book summaries)

2. **Setup Environment**
   ```
   # Create virtual environment
   python -m venv venv
   venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Database Setup**
   - Create a PostgreSQL database named `dbst`
   - Create the necessary tables (schema in the full documentation)

4. **Environment Variables**
   - Create a `.env` file with your OpenRouter API key:
     ```
     OPENROUTER_API_KEY=your_api_key_here
     ```

5. **Run the Application**
   ```
   uvicorn main:app --reload
   ```

6. **Access the API**
   - API endpoint: http://127.0.0.1:8000
   - Swagger documentation: http://127.0.0.1:8000/docs

## Core Features

- Student management (add, view, delete)
- Course management (add, view, delete)
- Course enrollment system
- Book recommendations with web scraping
- AI-powered book summaries

## Performance Testing

Run the included Locust performance tests:

```
python run_advanced_test.py --users 20 --duration 30s
```

## Documentation

For complete documentation including:
- Full API endpoint details
- Database schema
- Setup instructions
- Troubleshooting

See the [DOCUMENTATION.md](./DOCUMENTATION.md) file.

## License

[Your License]
