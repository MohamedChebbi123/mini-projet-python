'use client';
import Navbar from "./components/Navbar";
import { FaBookOpen, FaGraduationCap, FaRobot, FaChalkboardTeacher, FaSearch } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useRouter } from "next/navigation";
export default function Home() {
  const router=useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Learn Smarter with <span className="text-blue-600">Edu Portal</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your all-in-one platform for AI-powered book summaries, interactive courses, and personalized learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                Get Started - It's Free
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-300">
                Explore Courses
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1581726707445-75cbe4efc586?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Learning with Edu Portal" 
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Edu Portal?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition duration-300">
              <div className="text-blue-600 mb-4">
                <FaBookOpen size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Book Summaries</h3>
              <p className="text-gray-600">
                Get concise, AI-generated summaries of thousands of books to learn key insights in minutes.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition duration-300">
              <div className="text-blue-600 mb-4">
                <FaGraduationCap size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Courses</h3>
              <p className="text-gray-600">
                Learn from industry experts with our interactive courses and hands-on projects.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition duration-300">
              <div className="text-blue-600 mb-4">
                <FaRobot size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Learning</h3>
              <p className="text-gray-600">
                Our AI adapts to your learning style and recommends the best content for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-start mb-8">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 mr-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Sign Up for Free</h3>
                <p className="text-gray-600">
                  Create your account in seconds and get immediate access to free resources.
                </p>
              </div>
            </div>
            
            <div className="flex items-start mb-8">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 mr-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Explore Content</h3>
                <p className="text-gray-600">
                  Browse books, courses, or let our AI recommend the perfect learning path for you.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 mr-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
                <p className="text-gray-600">
                  Dive into interactive lessons, track your progress, and earn certificates.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Learning process" 
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Book Search Preview */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Discover Books with AI Summaries</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Get the key insights from any book in minutes with our powerful AI summarization technology.
          </p>
          
          <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 mb-6">
              <FaSearch className="text-gray-500 mr-3" />
              <input 
                type="text" 
                placeholder="Search for books..." 
                className="bg-transparent w-full focus:outline-none"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Sample Book 1 */}
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition duration-300">
                <div className="h-40 bg-blue-100"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">Sharp Objects</h3>
                  <p className="text-sm text-gray-600 mb-3">Gillian Flynn</p>
                  <button className="text-blue-600 text-sm flex items-center">
                    <button onClick={() => router.push("/Courses")}>View Summary</button>
                    <FiArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
              
              {/* Sample Book 2 */}
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition duration-300">
                <div className="h-40 bg-green-100"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">Soumission</h3>
                  <p className="text-sm text-gray-600 mb-3">Michel Houellebecq</p>
                  <button className="text-blue-600 text-sm flex items-center">
                    <button onClick={() => router.push("/Courses")}>View Summary</button>
                     <FiArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
              
              {/* Sample Book 3 */}
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition duration-300">
                <div className="h-40 bg-purple-100"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">A Light in the Attic</h3>
                  <p className="text-sm text-gray-600 mb-3">Shel Silverstein</p>
                  <button className="text-blue-600 text-sm flex items-center">
                    <button onClick={() => router.push("/Courses")}>View Summary</button>
                     <FiArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Popular Courses</h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Learn from industry experts with our interactive courses.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Course 1 */}
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
            <div className="h-48 bg-indigo-100"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Machine Learning Fundamentals</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Beginner</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">Learn the basics of ML with Python</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">Free</span>
                <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
                  <button onClick={() => router.push("/Courses")}>Enroll Now</button>
                </button>
              </div>
            </div>
          </div>
          
          {/* Course 2 */}
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
            <div className="h-48 bg-yellow-100"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Web Development Bootcamp</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Intermediate</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">Full stack development with React & Node</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">$99.99</span>
                <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
                  <button onClick={() => router.push("/Courses")}>Enroll Now</button>
                </button>
              </div>
            </div>
          </div>
          
          {/* Course 3 */}
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
            <div className="h-48 bg-red-100"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Data Science Essentials</h3>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Advanced</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">Master data analysis and visualization</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">$149.99</span>
                <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
                  <button onClick={() => router.push("/Courses")}>Enroll Now</button>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition duration-300">
            <button onClick={() => router.push("/Courses")}>View All Courses</button>
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Students Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">ousama ben ali</h4>
                  <p className="text-gray-600 text-sm">Computer Science Student</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The AI book summaries have saved me so much time. I can grasp key concepts from multiple books in the time it used to take me to read one!"
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">ahmed haddaji</h4>
                  <p className="text-gray-600 text-sm">game developer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The courses are incredibly well-structured. I went from beginner to getting a job in data analysis within 6 months thanks to Edu Portal."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who are learning smarter with Edu Portal.
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition duration-300">
            <button onClick={() => router.push("/Courses")}>Start Learning for Free</button>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Edu Portal</h3>
            <p className="text-gray-400">
              The modern platform for AI-powered learning and skill development.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Book Summaries</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Online Courses</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">AI Tutor</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Progress Tracking</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 Edu Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}