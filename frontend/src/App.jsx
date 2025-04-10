import AddStudents from './Addsrudents'; 
import Courses from './Courses';
import Navbar from './Components/Navbar';
import Loginstudent from './Loginstudnet';
import Profile from './Profile';
import LandingPage from './Landingpage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes> 
        <Route path="/" element={<LandingPage />} />
        <Route path="/addstudents" element={<AddStudents />} /> 
        <Route path="/courses" element={<Courses />} />
        <Route path="/loginstudents" element={<Loginstudent />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
