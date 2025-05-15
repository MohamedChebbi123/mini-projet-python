from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import requests
import psycopg2
import psycopg2.extras
import os

# Load .env variables
load_dotenv()

# DB Connection
database = psycopg2.connect(
    user="postgres",
    password="mohamed",
    dbname="dbst"
)
cursor = database.cursor(cursor_factory=psycopg2.extras.DictCursor)

# FastAPI setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Models ===
class Student(BaseModel):
    name: str
    age: int
    email: str
    department: str

class StudentLogin(BaseModel):
    name: str
    email: str

class Course(BaseModel):
    course_name: str
    course_field: str
    course_duration: str
    course_price: str

class CourseEnrollment(BaseModel):
    student_id: int
    course_id: int

class FavouriteCourse(BaseModel):
    course_id: int

class StudentID(BaseModel):
    student_id: int

class DeleteEnrolledCourse(BaseModel):
    enrolled_course_id: int

class DeleteCourse(BaseModel):
    course_id: int

class SummaryRequest(BaseModel):
    title: str

# === Routes ===

@app.post("/addstudent")
def add_student(student: Student):
    try:
        cursor.execute(
            "INSERT INTO students (name, age, email, department) VALUES (%s, %s, %s, %s)",
            (student.name, student.age, student.email, student.department)
        )
        database.commit()
        return {"message": "Student added"}
    except Exception as e:
        database.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/loginstudent")
def login_student(student: StudentLogin):
    try:
        cursor.execute("SELECT students_id FROM students WHERE name = %s AND email = %s",
                       (student.name, student.email))
        result = cursor.fetchone()
        if result:
            return {
                "message": "Login successful",
                "student_id": result["students_id"],
                "name": student.name
            }
        raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/profile")
def get_student_profile(student_id: int = Query(...)):
    try:
        cursor.execute("SELECT * FROM students WHERE students_id = %s", (student_id,))
        result = cursor.fetchone()
        if result:
            return dict(result)
        raise HTTPException(status_code=404, detail="Student not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/students")
def get_all_students():
    try:
        cursor.execute("SELECT * FROM students")
        results = cursor.fetchall()
        return [dict(row) for row in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/addcourse")
def add_courses(course: Course):
    try:
        cursor.execute(
            "INSERT INTO courses (course_name, course_field, course_duration, course_price) VALUES (%s, %s, %s, %s)",
            (course.course_name, course.course_field, course.course_duration, course.course_price)
        )
        database.commit()
        return {"message": "Course added successfully"}
    except Exception as e:
        database.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/courses")
def show_courses():
    try:
        cursor.execute("SELECT * FROM courses")
        results = cursor.fetchall()
        return {"courses": [dict(course) for course in results]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/favourite_courses")
def get_favourite_courses(course: FavouriteCourse):
    try:
        cursor.execute("SELECT * FROM courses WHERE course_id = %s", (course.course_id,))
        results = cursor.fetchall()
        return {"courses": [dict(course) for course in results]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/add_course_std")
def add_course_std(enroll: CourseEnrollment):
    try:
        cursor.execute(
            "INSERT INTO student_courses (student_id, course_id) VALUES (%s, %s)",
            (enroll.student_id, enroll.course_id)
        )
        database.commit()
        return {"message": "Student enrolled in course"}
    except Exception as e:
        database.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/student_courses")
def show_student_courses(data: StudentID):
    try:
        cursor.execute("""
            SELECT sc.enrolled_course_id, sc.student_id, sc.course_id, sc.enrollment_date,
                   c.course_name, c.course_duration, c.course_field, c.course_price
            FROM student_courses sc
            JOIN courses c ON sc.course_id = c.course_id
            WHERE sc.student_id = %s
        """, (data.student_id,))
        results = cursor.fetchall()
        return {"enrolled_courses": [dict(row) for row in results]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/del_std_course")
def del_en_course(data: DeleteEnrolledCourse):
    try:
        cursor.execute("DELETE FROM student_courses WHERE enrolled_course_id = %s", (data.enrolled_course_id,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Course not found")
        database.commit()
        return {"message": "Enrolled course deleted"}
    except Exception as e:
        database.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/delete_student")
def del_student(data: StudentID):
    try:
        cursor.execute("DELETE FROM student_courses WHERE student_id = %s", (data.student_id,))
        cursor.execute("DELETE FROM students WHERE students_id = %s", (data.student_id,))
        database.commit()
        return {"message": "Student and their courses deleted"}
    except Exception as e:
        database.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/delete_courses")
def delete_course(data: DeleteCourse):
    try:
        cursor.execute("DELETE FROM courses WHERE course_id = %s", (data.course_id,))
        database.commit()
        return {"message": "Course deleted"}
    except Exception as e:
        database.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/books")
def scrape_books():
    try:
        base_url = "https://books.toscrape.com/"
        result = requests.get(base_url)
        soup = BeautifulSoup(result.text, "html.parser")
        books = []
        for book in soup.select(".product_pod"):
            title = book.h3.a["title"]
            price = book.select_one(".price_color").text
            availability = book.find("p", class_="instock availability").text.strip()
            img_url = urljoin(base_url, book.find("img")["src"])
            cursor.execute(
                "INSERT INTO recommended_books (title, price, image_url, availability) VALUES (%s, %s, %s, %s)",
                (title, price, img_url, availability)
            )
            books.append({
                "title": title,
                "price": price,
                "image": img_url,
                "availability": availability
            })
        database.commit()
        return {"books": books}
    except Exception as e:
        database.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/rec_book")
def get_recommended_books():
    try:
        cursor.execute("SELECT * FROM recommended_books")
        results = cursor.fetchall()
        return {"books": [dict(book) for book in results]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/summarize")
def summarize_book(req: SummaryRequest):
    try:
        api_key = os.getenv("OPENROUTER_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="API key not set in environment")

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

        data = {
            "model": "mistralai/mistral-7b-instruct",
            "messages": [
                {"role": "user", "content": f"Give me a short and simple summary of the book titled '{req.title}'."}
            ]
        }

        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
        summary = response.json()["choices"][0]["message"]["content"]
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
