from locust import HttpUser, task, between
class MyUser(HttpUser):
    wait_time = between(1, 5)
    host = "http://localhost:8000"  
    @task
    def get_all_students(self):
        self.client.get("/students")
    @task
    def login_student(self):
        self.client.post("/loginstudent", json={
            "name": "John",
            "email": "john@example.com"
        })
    @task
    def get_books(self):
        self.client.get("/book")
