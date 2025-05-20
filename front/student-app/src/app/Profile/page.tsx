'use client'
import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface ProfileData {
  name?: string;
  student_id?: string;
  email?: string;
  age?: number;
  department?: string;
}

interface ProfileDetailItemProps {
  label: string;
  value?: string | number;
  icon: React.ReactNode;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedStudent = localStorage.getItem('student');
    const student = storedStudent ? JSON.parse(storedStudent) : null;

    if (student?.id) {
      setIsLoading(true);
      axios.get(`http://127.0.0.1:8000/profile?student_id=${student.id}`)
        .then(response => {
          setProfile(response.data);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.response?.data?.detail || 'Error fetching profile');
          setIsLoading(false);
        });
    } else {
      setError('Student not logged in');
      setIsLoading(false);
    }
  }, []);
  if (error) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4"
    >
      <div className="bg-white border border-red-100 shadow-xl rounded-2xl p-8 max-w-md w-full" role="alert">
        <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Profile Error</h3>
        <p className="text-red-600 text-center mb-6">{error}</p>
        <div className="flex justify-center">
          <button onClick={() => window.location.href = '/Login'} 
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium">
            Go to Login
          </button>
        </div>
      </div>
    </motion.div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-4 sm:px-6 lg:px-8 pt-8 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent inline-block mb-3">
              Student Profile
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-4"></div>
            <p className="mt-3 text-xl text-gray-600">
              {profile ? "Your academic information and details" : "Loading your details..."}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
              <p className="text-blue-600 text-lg font-medium">Loading your profile...</p>
            </div>
          ) : profile ? (            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-10 -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full opacity-10 -ml-10 -mb-10"></div>
                
                <div className="flex items-center space-x-6 relative">
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 rounded-full bg-white shadow-lg flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-blue-100">
                      {profile.name?.charAt(0) || '?'}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-1">{profile.name || 'N/A'}</h3>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <p className="text-blue-100 font-medium">{profile.department || 'Department not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-1">
                    <ProfileDetailItem 
                      label="Student ID" 
                      value={profile.student_id} 
                      icon={
                        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                      }
                    />
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-1">
                    <ProfileDetailItem 
                      label="Email" 
                      value={profile.email} 
                      icon={
                        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      }
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-1">
                    <ProfileDetailItem 
                      label="Age" 
                      value={profile.age} 
                      icon={
                        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      }
                    />
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-1">                    <ProfileDetailItem 
                      label="Department" 
                      value={profile.department} 
                      icon={
                        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No profile data available</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const ProfileDetailItem: React.FC<ProfileDetailItemProps> = ({ label, value, icon }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 mt-1">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">
        {value ?? <span className="text-gray-400">N/A</span>}
      </p>
    </div>
  </div>
);

export default Profile;