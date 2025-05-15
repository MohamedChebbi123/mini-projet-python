import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
   courses: any[] = [];
   successMessage: string = '';
   errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCourses();
  }
  
  loadCourses(): void {
    this.http.get<any>('http://localhost:8000/courses').subscribe({
      next: (res) => {
        this.courses = res.courses;
        console.log(this.courses); 
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.errorMessage = 'Failed to load courses';
      }
    });
  }

  deleteCourse(courseId: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.http.post<any>('http://localhost:8000/delete_courses', { course_id: courseId }).subscribe({
        next: (res) => {
          console.log('Course deleted:', res);
          this.successMessage = 'Course has been deleted successfully';
          // Refresh the courses list
          this.loadCourses();
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (err) => {
          console.error('Error deleting course:', err);
          this.errorMessage = `Error deleting course: ${err.error?.detail || 'Unknown error'}`;
          
          // Clear error message after 3 seconds
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
    }
  }
}
