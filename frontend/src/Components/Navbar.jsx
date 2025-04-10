import { Link, useLocation } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaUserCircle, FaSignInAlt } from 'react-icons/fa';
import { HiOutlineUserAdd } from 'react-icons/hi';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center text-2xl font-bold text-indigo-700 hover:text-indigo-800 transition-colors"
            >
              <FaGraduationCap className="mr-2" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EduPortal
              </span>
            </Link>
          </div>

          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/addstudents"
              className={`flex items-center px-1 pt-1 pb-2 border-b-2 font-medium transition-colors ${
                isActive('/addstudents') 
                  ? 'border-indigo-500 text-indigo-700' 
                  : 'border-transparent text-gray-600 hover:text-indigo-600 hover:border-indigo-300'
              }`}
            >
              <HiOutlineUserAdd className="mr-1.5" />
              Enroll
            </Link>
            
            <Link
              to="/courses"
              className={`flex items-center px-1 pt-1 pb-2 border-b-2 font-medium transition-colors ${
                isActive('/courses') 
                  ? 'border-indigo-500 text-indigo-700' 
                  : 'border-transparent text-gray-600 hover:text-indigo-600 hover:border-indigo-300'
              }`}
            >
              <FaBook className="mr-1.5" />
              Courses
            </Link>
            
            <Link
              to="/loginstudents"
              className={`flex items-center px-1 pt-1 pb-2 border-b-2 font-medium transition-colors ${
                isActive('/loginstudents') 
                  ? 'border-indigo-500 text-indigo-700' 
                  : 'border-transparent text-gray-600 hover:text-indigo-600 hover:border-indigo-300'
              }`}
            >
              <FaSignInAlt className="mr-1.5" />
              Student Login
            </Link>
            
            <Link
              to="/profile"
              className={`flex items-center px-1 pt-1 pb-2 border-b-2 font-medium transition-colors ${
                isActive('/profile') 
                  ? 'border-indigo-500 text-indigo-700' 
                  : 'border-transparent text-gray-600 hover:text-indigo-600 hover:border-indigo-300'
              }`}
            >
              <FaUserCircle className="mr-1.5" />
              Profile
            </Link>
          </div>

         
          <div className="md:hidden flex items-center">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
          <Link
            to="/addstudents"
            className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
              isActive('/addstudents') 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <HiOutlineUserAdd className="mr-2" />
            Enroll
          </Link>
          
          <Link
            to="/courses"
            className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
              isActive('/courses') 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <FaBook className="mr-2" />
            Courses
          </Link>
          
          <Link
            to="/loginstudents"
            className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
              isActive('/loginstudents') 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <FaSignInAlt className="mr-2" />
            Student Login
          </Link>
          
          <Link
            to="/profile"
            className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
              isActive('/profile') 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <FaUserCircle className="mr-2" />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;