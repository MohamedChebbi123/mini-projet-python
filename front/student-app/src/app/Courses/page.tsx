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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-200 rounded mt-6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && !courses.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Courses</h3>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Explore Our Courses</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expand your knowledge with our expertly designed courses across various fields
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r">
            <p className="text-sm text-green-700">{successMsg}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {course.course_field}
                  </span>
                  <span className="text-lg font-bold text-gray-900">${course.course_price}</span>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{course.course_name}</h3>
                </div>
                <div className="flex items-center text-gray-500 mb-5">
                  <span>{course.course_duration}</span>
                </div>
                <button
                  onClick={() => handleEnroll(course.course_id)}
                  disabled={enrollingId === course.course_id}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    enrollingId === course.course_id
                      ? 'bg-blue-400 cursor-not-allowed text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {enrollingId === course.course_id ? 'Enrolling...' : 'Enroll Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CoursesPage;
