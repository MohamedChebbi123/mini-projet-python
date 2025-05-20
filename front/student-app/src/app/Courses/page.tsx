'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';

interface Course {
  course_id: number;
  course_field: string;
  course_duration: string;
  course_name: string;
  course_price: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [enrollingId, setEnrollingId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      const storedStudent = localStorage.getItem('student');
      const student = storedStudent ? JSON.parse(storedStudent) : null;

      if (!student?.id) {
        setError('Student not logged in');
        router.push('/Login');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/courses');
        setCourses(response.data.courses);
      } catch {
        setError('Failed to fetch courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [router]);

  const handleEnroll = async (courseId: number) => {
    const storedStudent = localStorage.getItem('student');
    const student = storedStudent ? JSON.parse(storedStudent) : null;

    if (!student?.id) {
      setError('Please login to enroll in courses');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setEnrollingId(courseId);
    setError(null);

    try {
      await axios.post('http://127.0.0.1:8000/add_course_std', {
        student_id: student.id,
        course_id: courseId,
      });

      setSuccessMsg('Successfully enrolled in course!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch {
      setError('Enrollment failed. Please try again.');
    } finally {
      setEnrollingId(null);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-10">
            <div className="flex flex-col items-center">
              <div className="h-12 bg-blue-200 rounded-lg w-1/3 mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-8"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                  <div className="flex justify-between mb-4">
                    <div className="h-8 bg-blue-100 rounded-full w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-20 bg-blue-100 rounded-lg w-full mb-4"></div>
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-12 bg-blue-200 rounded-lg mt-6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error && !courses.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
          <div className="bg-white border border-red-100 rounded-2xl p-10 max-w-2xl mx-auto shadow-xl text-center">
            <div className="bg-red-100 p-5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Error Loading Courses</h3>
            <p className="text-red-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 relative">
          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-100 rounded-full opacity-70 blur-xl"></span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">
            Explore Our Courses
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expand your knowledge with our expertly designed courses across various fields
          </p>
        </div>

        {error && (
          <div className="bg-white border border-red-200 shadow-sm p-5 mb-8 rounded-xl flex items-start">
            <div className="flex-shrink-0 mr-3">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 001-1v-4a1 1 0 10-2 0v4a1 1 0 001 1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {successMsg && (
          <div className="bg-white border border-green-200 shadow-sm p-5 mb-8 rounded-xl flex items-start">
            <div className="flex-shrink-0 mr-3">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-green-700 font-medium">{successMsg}</p>
          </div>
        )}        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-7 relative">
                <div className="absolute -right-12 -top-12 bg-blue-500 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 shadow-sm">
                    {course.course_field}
                  </span>
                  <span className="flex items-baseline">
                    <span className="text-xl font-bold text-blue-600">${course.course_price}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">$99.99</span>
                  </span>
                </div>
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white rounded-xl shadow-lg mb-6">
                  <h3 className="text-xl font-bold mb-2">{course.course_name}</h3>
                  <div className="flex items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-medium text-blue-100">{course.course_duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-600 ml-1">4.8/5 (120 reviews)</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleEnroll(course.course_id)}
                  disabled={enrollingId === course.course_id}
                  className={`w-full py-3.5 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${
                    enrollingId === course.course_id
                      ? 'bg-blue-400 cursor-not-allowed text-white opacity-80'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  {enrollingId === course.course_id ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enrolling...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Enroll Now
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>      </div>
    </div>
  );
};

export default CoursesPage;
