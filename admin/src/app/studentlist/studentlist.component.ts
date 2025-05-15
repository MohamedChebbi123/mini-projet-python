import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-studentlist',
  standalone: true,
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css'],
  imports: [CommonModule]
})
export class StudentlistComponent implements OnInit {

  students: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStudents();
  }
  loadStudents(): void {
    this.http.get<any[]>('http://localhost:8000/students').subscribe({
      next: (res) => {
        this.students = res; // API now returns array directly
        console.log(this.students); 
      },
      error: (err) => {
        console.error('Error fetching students:', err);
        this.errorMessage = 'Failed to load students';
      }
    });
  }

  deleteStudent(studentId: number): void {
    if (confirm('Are you sure you want to delete this student? This will also remove them from all courses.')) {
      this.http.post<any>('http://localhost:8000/delete_student', { student_id: studentId }).subscribe({
        next: (res) => {
          console.log('Student deleted:', res);
          this.successMessage = 'Student has been deleted successfully';
          // Refresh the students list
          this.loadStudents();
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (err) => {
          console.error('Error deleting student:', err);
          this.errorMessage = `Error deleting student: ${err.error?.detail || 'Unknown error'}`;
          
          // Clear error message after 3 seconds
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
    }
  }
}
