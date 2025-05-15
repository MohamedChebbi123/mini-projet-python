'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FavoriteCourse {
  course_duration: string;
  course_field: string;
  course_id: number;
  course_name: string;
  course_price: string;
}

const UserFavoritesPage: React.FC = () => {
  const [favoriteCourses, setFavoriteCourses] = useState<FavoriteCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedStudent = localStorage.getItem('student');
        if (!storedStudent) throw new Error('No student found - please log in');

        const student = JSON.parse(storedStudent);
        if (!student?.id) throw new Error('Invalid student data');

        const favoritesResponse = await axios.get<{ courseId: number }[]>(
          'http://localhost:8081/api/favorite/getByUser',
          { params: { userId: student.id } }
        );

        if (!favoritesResponse.data || favoritesResponse.data.length === 0) {
          throw new Error('No favorite courses found');
        }

        const coursesData = await Promise.all(
          favoritesResponse.data.map(fav =>
            axios
              .post<{ courses: FavoriteCourse[] }>('http://localhost:8000/favourite_courses', {
                course_id: fav.courseId
              })
              .catch(err => {
                console.error(`Failed to fetch course details for courseId: ${fav.courseId}`, err);
                return { data: { courses: [] } };
              })
          )
        );

        const flattenedCourses = coursesData
          .flatMap(res => res.data.courses)
          .filter((course, index, self) =>
            index === self.findIndex(c => c.course_id === course.course_id)
          );

        setFavoriteCourses(flattenedCourses);
        console.log('Fetched favorite courses:', flattenedCourses);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message || 'Failed to load favorites');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Favorite Courses</h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      {favoriteCourses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoriteCourses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {course.course_field}
                </span>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">{course.course_name}</h3>
              <div className="flex items-center text-yellow-500 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-1 text-sm text-gray-600">{course.course_duration}</span>
              </div>
              <p className="text-gray-600 font-medium text-lg">{course.course_price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-xl text-center max-w-md mx-auto shadow-sm">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="font-medium text-lg">You haven't saved any favorite courses yet.</p>
        </div>
      )}
    </div>
  );
};

export default UserFavoritesPage;
