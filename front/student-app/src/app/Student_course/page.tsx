'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

interface Course {
  enrolled_course_id: number;
  course_id: number;
  enrollment_date: string;
  course_duration: string;
  course_field: string;
  course_name: string;
  course_price: string;
}

const EnrolledCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteStatus, setFavoriteStatus] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      const storedStudent = localStorage.getItem('student');
      const student = storedStudent ? JSON.parse(storedStudent) : null;

      if (!student?.id) {
        setError('Student not logged in');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/student_courses', {
          student_id: student.id,
        });
        setCourses(response.data.enrolled_courses);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to fetch enrolled courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const deleteCourse = async (enrolled_course_id: number) => {
    try {
      await axios.post('http://127.0.0.1:8000/del_std_course', { enrolled_course_id });
      setCourses((prev) => prev.filter((course) => course.enrolled_course_id !== enrolled_course_id));
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to delete course');
    }
  };

  const addFavorite = async (courseId: number) => {
    const storedStudent = localStorage.getItem('student');
    const student = storedStudent ? JSON.parse(storedStudent) : null;

    if (!student?.id) {
      alert('Please login to add favorites');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8081/api/favorite', {
        userId: student.id,
        courseId: courseId
      });

      setFavoriteStatus(prev => ({
        ...prev,
        [courseId]: true
      }));

      alert('Course added to favorites!');
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to add to favorites');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Courses</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Your Courses List</h1>
            <p className="text-gray-600">Track your learning progress</p>
          </div>

          {courses.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Enrolled Courses</h2>
              <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet.</p>
              <button
                onClick={() => router.push('/Courses')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.enrolled_course_id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <h6 className="font-bold text-xl truncate p-4">{course.enrolled_course_id}</h6>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                    <h3 className="font-bold text-xl truncate">{course.course_name}</h3>
                    <span className="inline-block bg-blue-700 text-xs px-2 py-1 rounded-full mt-1">{course.course_field}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{course.course_duration}</span>
                      </div>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">${course.course_price}</div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">Enrolled on</h4>
                      <p className="text-gray-700">{formatDate(course.enrollment_date)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteCourse(course.enrolled_course_id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete Course
                      </button>
                      <button
                        onClick={() => addFavorite(course.course_id)}
                        className="flex-1 px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Favorite
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrolledCourses;