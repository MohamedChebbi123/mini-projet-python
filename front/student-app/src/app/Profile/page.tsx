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
      className="flex items-center justify-center min-h-screen"
    >
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md w-full" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Sticky Navbar - absolutely at the top */}
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-4 sm:px-6 lg:px-8 pt-4 pb-12"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Student Profile
            </h2>
            <p className="mt-3 text-xl text-gray-600">
              {profile ? "Your academic information" : "Loading your details..."}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : profile ? (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white shadow-xl rounded-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-blue-600 text-2xl font-bold">
                      {profile.name?.charAt(0) || '?'}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{profile.name || 'N/A'}</h3>
                    <p className="text-blue-100">{profile.department || 'Department not specified'}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ProfileDetailItem 
                    label="Student ID" 
                    value={profile.student_id} 
                    icon={
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    }
                  />
                  
                  <ProfileDetailItem 
                    label="Email" 
                    value={profile.email} 
                    icon={
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                  />
                </div>
                
                <div className="space-y-4">
                  <ProfileDetailItem 
                    label="Age" 
                    value={profile.age} 
                    icon={
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />
                  
                  <ProfileDetailItem 
                    label="Department" 
                    value={profile.department} 
                    icon={
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    }
                  />
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