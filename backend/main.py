import mysql.connector
from fastapi import FastAPI, HTTPException,Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

database = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="",  
    database="dbst"  
)
cursor = database.cursor(dictionary=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class Student(BaseModel):
    name: str
    age: int
    email: str
    department: str
    
class Course(BaseModel):
    course_name:str
    course_field:str
    course_duration:str
    course_price:str

class StudentLogin(BaseModel):
    name: str
    email: str

@app.get("/test-db")
def test_db_connection():
    try:
        cursor.execute("SELECT 1")  
        cursor.fetchone()
        return {"message": "Database connection is working"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/addstudent")
def add_student(student: Student):
    print(student)
    try:
        sql = "INSERT INTO STUDENTS (name, age, email, department) VALUES (%s, %s, %s, %s)"
        values = (student.name, student.age, student.email, student.department)
        cursor.execute(sql, values)
        database.commit()
        return {"message": "Student added"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/loginstudent")
def login_student(student: StudentLogin):
    try:
        
        sql = "SELECT students_id FROM STUDENTS WHERE name = %s AND email = %s"
        values = (student.name, student.email)
        cursor.execute(sql, values)
        result = cursor.fetchone()

        
        cursor.fetchall()  

        if result:
            return {
                "message": "Login successful",
                "student_id": result["students_id"],
                "name": student.name
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/profile")
def get_student_profile(student_id: int = Query(..., description="The ID of the student")):
    try:
        sql = "SELECT * FROM STUDENTS WHERE students_id = %s"
        values = (student_id,)
        cursor.execute(sql, values)
        result = cursor.fetchone()

        
        cursor.fetchall() 

        if result:
            return {
                "student_id": result["students_id"],
                "name": result["name"],
                "age": result["age"],
                "email": result["email"],
                "department": result["department"]
            }
        else:
            raise HTTPException(status_code=404, detail="Student not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/students")
def get_all_students():
    try:
        cursor.execute("SELECT * FROM STUDENTS")
        results = cursor.fetchall()
        return {"students": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/addcourse")
def addcourses(courses:Course):
    try:
        sql="INSERT INTO courses (course_name , course_field , course_duration , course_price) VALUES (%s, %s, %s, %s)"
        values=(courses.course_name , courses.course_field , courses.course_duration , courses.course_price)
        cursor.execute(sql,values)
        database.commit()
        return{"message","student added succesfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/courses")
def showcourses():
    try:
        cursor.execute("SELECT * FROM courses")       
        results=cursor.fetchall()
        return {"courses": results}  
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



