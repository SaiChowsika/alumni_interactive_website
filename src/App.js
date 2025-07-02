import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext'; // ✅ Updated import
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import StudentSignUp from './pages/StudentSignUp';
import StudentProfile from './pages/StudentProfile';
import AlumniProfile from './pages/AlumniProfile';
import FacultyProfile from './pages/FacultyProfile';
import AdminDashboard from './pages/AdminDashboard';
import TermsAndConditions from './pages/TermsAndConditions';
import ProtectedRoute from './components/ProtectedRoute';
import TestSubmissions from './pages/TestSubmissions'; 

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="App min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup/student" element={<StudentSignUp />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/test-submissions" element={<TestSubmissions />} /> 
                {/* Protected Routes */}
                <Route path="/student/profile" element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentProfile />
                  </ProtectedRoute>
                } />
                <Route path="/alumni/profile" element={
                  <ProtectedRoute allowedRoles={['alumni']}>
                    <AlumniProfile />
                  </ProtectedRoute>
                } />
                <Route path="/faculty/profile" element={
                  <ProtectedRoute allowedRoles={['faculty']}>
                    <FacultyProfile />
                  </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;