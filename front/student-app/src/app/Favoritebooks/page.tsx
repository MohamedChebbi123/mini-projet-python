'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

interface FavoriteCourse {
  course_duration: string;
  course_field: string;
  course_id: number;
  course_name: string;
  course_price: string;
}

const Favoritebooks: React.FC = () => {
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
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Favorite Courses</h1>

        {favoriteCourses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favoriteCourses.map((course) => (
              <div
                key={course.course_id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg">{course.course_name}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{course.course_price}</p>
                <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Field: {course.course_field}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">
            You haven't saved any favorite courses yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoritebooks;
