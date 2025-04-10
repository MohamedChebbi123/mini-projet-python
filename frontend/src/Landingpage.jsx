import React from 'react';
import { FaGraduationCap, FaChalkboardTeacher, FaBook, FaUserFriends } from 'react-icons/fa';
import { MdComputer, MdScience, MdSports } from 'react-icons/md';

const LandingPage = () => {
  return (
    <div className="font-sans">
      
      <header className="bg-blue-700 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Bright Future Academy</h1>
          <p className="text-xl mb-8">Where excellence in education meets character development</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Apply Now
            </button>
            <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </header>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-700 mb-2">150+</div>
            <div className="text-gray-600">Qualified Teachers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-700 mb-2">2,500+</div>
            <div className="text-gray-600">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-700 mb-2">25+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-700 mb-2">15+</div>
            <div className="text-gray-600">Academic Programs</div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-blue-600 text-4xl mb-4">
              <FaGraduationCap className="inline" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Primary Education</h3>
            <p className="text-gray-600">Foundational learning for young minds with a focus on holistic development.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-blue-600 text-4xl mb-4">
              <MdComputer className="inline" />
            </div>
            <h3 className="text-xl font-semibold mb-3">STEM Program</h3>
            <p className="text-gray-600">Advanced curriculum in Science, Technology, Engineering and Mathematics.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-blue-600 text-4xl mb-4">
              <MdSports className="inline" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Athletics</h3>
            <p className="text-gray-600">Competitive sports programs to develop physical and team skills.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our School</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaChalkboardTeacher className="text-blue-700 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
                <p className="text-gray-600">Our teachers are highly qualified and passionate about student success.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaBook className="text-blue-700 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Curriculum</h3>
                <p className="text-gray-600">Balanced academic program with arts, sports, and character education.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <MdScience className="text-blue-700 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Modern Facilities</h3>
                <p className="text-gray-600">State-of-the-art labs, libraries, and sports facilities.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaUserFriends className="text-blue-700 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Inclusive Community</h3>
                <p className="text-gray-600">Diverse student body with a focus on respect and collaboration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Parents Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-700 font-semibold">JS</span>
              </div>
              <div>
                <h4 className="font-semibold">John Smith</h4>
                <p className="text-gray-500 text-sm">Parent of Grade 5 Student</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"The teachers go above and beyond to support each child's individual needs. My daughter has flourished academically and socially."</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-700 font-semibold">MA</span>
              </div>
              <div>
                <h4 className="font-semibold">Maria Alvarez</h4>
                <p className="text-gray-500 text-sm">Parent of Grade 8 Student</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"The STEM program is exceptional. My son has developed a real passion for robotics and coding thanks to the amazing facilities."</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-700 text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8">Applications for the next academic year are now open.</p>
          <button className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition">
            Schedule a Campus Tour
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Bright Future Academy</h3>
            <p className="text-gray-400">Providing quality education since 1995.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Admissions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Academics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Student Life</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <address className="text-gray-400 not-italic">
              123 Education Ave<br />
              Learning City, LC 12345<br />
              Phone: (123) 456-7890<br />
              Email: info@brightfuture.edu
            </address>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">FB</a>
              <a href="#" className="text-gray-400 hover:text-white transition">TW</a>
              <a href="#" className="text-gray-400 hover:text-white transition">IG</a>
              <a href="#" className="text-gray-400 hover:text-white transition">YT</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-gray-400">
          <p>© 2023 Bright Future Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;