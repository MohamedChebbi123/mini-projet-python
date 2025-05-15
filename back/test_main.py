from fastapi.testclient import TestClient
from main import app  # Make sure your FastAPI app is named 'app' in main.py

client = TestClient(app)

def test_add_student():
    response = client.post("/addstudent", json={
        "name": "John Doe",
        "age": 20,
        "email": "john@example.com",
        "department": "CS"
    })
    assert response.status_code == 200
    assert response.json()["message"] == "Student added"
    print(response.json())  


# def test_login_student():
#     response = client.post("/loginstudent", json={
#         "name": "John Doe",
#         "email": "john@example.com"
#     })
#     assert response.status_code == 200
#     data = response.json()
#     assert "student_id" in data
#     assert data.get("message") == "Login successful", f"Expected 'Login successful', got {data.get('message')}"
#     assert data.get("name") == "John Doe", f"Expected 'John Doe', got {data.get('name')}"
#     print(f"Message: {data.get('message')}")
#     print(f"Name: {data.get('name')}")


#     # Save student_id for the next test (could be stored in a fixture in real testing)
#     global test_student_id
#     test_student_id = data["student_id"]

# def test_get_profile():
#     response = client.get(f"/profile?student_id={test_student_id}")
#     assert response.status_code == 200
#     data = response.json()
#     assert data["name"] == "John Doe"
#     assert data["age"] == 20
#     assert data["email"] == "john@example.com"
#     assert data["department"] == "CS"

# def test_add_course():
#     response = client.post("/addcourse", json={
#         "course_name": "Python Basics",
#         "course_field": "Programming",
#         "course_duration": "3 weeks",
#         "course_price": "$50"
#     })
#     assert response.status_code == 200
#     assert response.json()["message"] == "Course added successfully"

# def test_show_courses():
#     response = client.get("/courses")
#     assert response.status_code == 200
#     data = response.json()
#     assert "courses" in data
#     assert len(data["courses"]) > 0

#     # Save course_id for the next test
#     global test_course_id
#     test_course_id = data["courses"][-1]["course_id"]

# def test_enroll_course():
#     response = client.post("/add_course_std", json={
#         "student_id": test_student_id,
#         "course_id": test_course_id
#     })
#     assert response.status_code == 200
#     assert response.json()["message"] == "Student enrolled in course"

# def test_student_courses():
#     response = client.post("/student_courses", json={
#         "student_id": test_student_id
#     })
#     assert response.status_code == 200
#     data = response.json()
#     assert "enrolled_courses" in data
#     assert len(data["enrolled_courses"]) > 0

#     global enrolled_course_id
#     enrolled_course_id = data["enrolled_courses"][0]["enrolled_course_id"]

# def test_delete_enrollment():
#     response = client.post("/del_std_course", json={
#         "enrolled_course_id": enrolled_course_id
#     })
#     assert response.status_code == 200
#     assert response.json()["message"] == "Course has been deleted"
