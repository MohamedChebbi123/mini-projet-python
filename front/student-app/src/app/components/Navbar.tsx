"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaGraduationCap, FaBook, FaUserCircle, FaSignInAlt, FaHeart, FaBars } from 'react-icons/fa';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check if student is logged in
    const storedStudent = localStorage.getItem('student');
    const student = storedStudent ? JSON.parse(storedStudent) : null;
    setIsLoggedIn(!!student?.id);
    setStudentName(student?.name || '');
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('student');
    router.push('/Login');
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="p-2 mr-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-700 group-hover:to-purple-700 transition-all">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EduPortal
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/Books" active={isActive('/Books')} icon={<FaBook className="text-lg" />} label="Books" />
            <NavLink href="/Courses" active={isActive('/Courses')} icon={<FaBook className="text-lg" />} label="Courses" />
            
            {isLoggedIn ? (
              <>
                <NavLink href="/Favoritebooks" active={isActive('/Favoritebooks')} icon={<FaHeart className="text-lg" />} label="Favorites" />
                <NavLink href="/Student_course" active={isActive('/Student_course')} icon={<FaGraduationCap className="text-lg" />} label="My Courses" />
                <NavLink href="/Profile" active={isActive('/Profile')} icon={<FaUserCircle className="text-lg" />} label="Profile" />
                
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-lg font-medium text-red-600 hover:text-white hover:bg-red-600 transition-all"
                >
                  <FaSignInAlt className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink href="/Login" active={isActive('/Login')} icon={<FaSignInAlt className="text-lg" />} label="Login" />
                <NavLink href="/Signup" active={isActive('/Signup')} icon={<HiOutlineUserAdd className="text-lg" />} label="Enroll" />
              </>
            )}
          </div>          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-50 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white border-t border-gray-100">
          <MobileNavLink href="/Books" active={isActive('/Books')} icon={<FaBook className="text-lg" />} label="Books" onClick={() => setMobileMenuOpen(false)} />
          <MobileNavLink href="/Courses" active={isActive('/Courses')} icon={<FaBook className="text-lg" />} label="Courses" onClick={() => setMobileMenuOpen(false)} />
          
          {isLoggedIn ? (
            <>
              <MobileNavLink href="/Favoritebooks" active={isActive('/Favoritebooks')} icon={<FaHeart className="text-lg" />} label="Favorites" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink href="/Student_course" active={isActive('/Student_course')} icon={<FaGraduationCap className="text-lg" />} label="My Courses" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink href="/Profile" active={isActive('/Profile')} icon={<FaUserCircle className="text-lg" />} label="Profile" onClick={() => setMobileMenuOpen(false)} />
              
              {studentName && (
                <div className="px-3 py-2 text-sm font-medium text-gray-500 border-t border-gray-100 mt-2">
                  Logged in as: <span className="font-semibold text-indigo-600">{studentName}</span>
                </div>
              )}

              <div
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:text-white hover:bg-red-600 transition-colors cursor-pointer"
              >
                <FaSignInAlt className="mr-3" />
                Logout
              </div>
            </>
          ) : (
            <>
              <MobileNavLink href="/Login" active={isActive('/Login')} icon={<FaSignInAlt className="text-lg" />} label="Login" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink href="/Signup" active={isActive('/Signup')} icon={<HiOutlineUserAdd className="text-lg" />} label="Enroll" onClick={() => setMobileMenuOpen(false)} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, active, icon, label }: { href: string, active: boolean, icon: React.ReactNode, label: string }) => (
  <Link href={href}>
    <div className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${active 
      ? 'bg-indigo-50 text-indigo-700' 
      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'}`}>
      <span className="mr-2">{icon}</span>
      {label}
    </div>
  </Link>
);

const MobileNavLink = ({ href, active, icon, label, onClick }: { 
  href: string, 
  active: boolean, 
  icon: React.ReactNode, 
  label: string,
  onClick: () => void 
}) => (
  <Link href={href} onClick={onClick}>
    <div className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors ${active 
      ? 'bg-indigo-50 text-indigo-700' 
      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'}`}>
      <span className="mr-3">{icon}</span>
      {label}
    </div>
  </Link>
);

export default Navbar;
