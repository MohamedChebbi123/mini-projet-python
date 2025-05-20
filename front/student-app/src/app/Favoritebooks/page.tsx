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
    fetchFavoriteCourses();
  }, []);

  const fetchFavoriteCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const storedStudent = localStorage.getItem('student');
      if (!storedStudent) throw new Error('No student found - please log in');

      const student = JSON.parse(storedStudent);
      if (!student?.id) throw new Error('Invalid student data');

      const favoritesResponse = await axios.get<{ id: string, courseId: number }[]>(
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
            .then(res => ({
              ...res.data.courses[0],
              favoriteId: fav.id 
            }))
            .catch(err => {
              console.error(`Failed to fetch course details for courseId: ${fav.courseId}`, err);
              return null;
            })
        )
      );

      const validCourses = coursesData.filter(course => course !== null) as (FavoriteCourse & { favoriteId: string })[];
      
      setFavoriteCourses(validCourses);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Failed to load favorites');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFavorite = async (favoriteId: string, courseId: number) => {
    try {
      if (!window.confirm('Are you sure you want to remove this course from your favorites?')) {
        return;
      }

      await axios.delete(`http://localhost:8081/api/favorite/${favoriteId}`);
      
      
      setFavoriteCourses(prev => prev.filter(course => 
        (course as any).favoriteId !== favoriteId
      ));
      
     
    } catch (err) {
      console.error('Failed to delete favorite:', err);
      alert('Failed to remove favorite. Please try again.');
    }
  };
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-blue-600 text-lg font-medium">Loading your favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-r shadow-md" role="alert">
          <div className="flex items-center mb-2">
            <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="font-bold text-lg">Error Loading Favorites</p>
          </div>
          <p className="text-base">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 relative">
            My Favorite Courses
            <span className="block h-1 w-20 bg-blue-500 mt-2"></span>
          </h1>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{favoriteCourses.length} Favorites</span>
          </div>
        </div>

        {favoriteCourses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favoriteCourses.map((course) => (
              <div
                key={(course as any).favoriteId}
                className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute -right-12 -top-12 bg-blue-500 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="p-6">
                  <button
                    onClick={() => handleDeleteFavorite((course as any).favoriteId, course.course_id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    title="Remove from favorites"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <h3 className="font-bold text-xl text-gray-800 pr-8 mb-3 group-hover:text-blue-600 transition-colors duration-200">{course.course_name}</h3>
                  
                  <div className="flex items-center mb-4">
                    <div className="text-lg font-bold text-blue-600">{course.course_price}</div>
                    <div className="ml-2 text-sm text-gray-500 line-through">$99.99</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      Field: <span className="font-medium text-gray-800 ml-1">{course.course_field}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">{course.course_duration}</span>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      View Course Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8 text-center max-w-lg mx-auto">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Favorite Courses Yet</h3>
            <p className="text-gray-600 mb-6">Browse courses and add some to your favorites to see them here.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
              Explore Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoritebooks;