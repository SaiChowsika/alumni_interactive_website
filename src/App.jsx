import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { NavigationProvider } from './context/NavigationContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import StudentPage from './pages/StudentPage';
import AlumniPage from './pages/AlumniPage';
import FacultyPage from './pages/FacultyPage';
import Departments from './pages/Departments';
import AboutUs from './pages/AboutUs';
import PlacementsPage from './pages/PlacementsPage';
import Sessions from './pages/Sessions';
import AdminProfile from './pages/Adminprofile';
import FacultyProfile from './pages/FacultyProfile';
import StudentProfile from './pages/StudentProfile';
import AlumniProfile from './pages/AlumniProfile';
import Statistics from './pages/Statistics';
import SessionUpload from './components/SessionUpload';
import Notifications from './pages/Notifications';

// Components
import StudentSignUp from './components/StudentSignUp';
import AlumniSignUp from './components/AlumniSignUp';
import FacultySignUp from './components/FacultySignUp';
import AdminSignUp from './components/AdminSignUp';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import SessionForm from './components/SessionForm';
import AdminNotifications from './components/AdminNotifications';
function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <NavigationProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/studentsignup" element={<StudentSignUp />} />
                <Route path="/alumnisignup" element={<AlumniSignUp />} />
                <Route path="/facultysignup" element={<FacultySignUp />} />
                <Route path="/adminsignup" element={<AdminSignUp />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/placements" element={<PlacementsPage />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminPage />
                  </ProtectedRoute>
                } />
                <Route path="/adminprofile" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminProfile />
                  </ProtectedRoute>
                } />
                <Route path="/statistics" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Statistics />
                  </ProtectedRoute>
                } />
                <Route path="/sessionupload" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <SessionUpload />
                  </ProtectedRoute>
                } />
                <Route path="/adminnotifications" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminNotifications />
                  </ProtectedRoute>
                } />

                {/* Protected Student Routes */}
                <Route path="/student" element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentPage />
                  </ProtectedRoute>
                } />
                <Route path="/studentprofile" element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentProfile />
                  </ProtectedRoute>
                } />

                {/* Protected Alumni Routes */}
                <Route path="/alumni" element={
                  <ProtectedRoute allowedRoles={['alumni']}>
                    <AlumniPage />
                  </ProtectedRoute>
                } />
                <Route path="/alumniprofile" element={
                  <ProtectedRoute allowedRoles={['alumni']}>
                    <AlumniProfile />
                  </ProtectedRoute>
                } />

                {/* Protected Faculty Routes */}
                <Route path="/faculty" element={
                  <ProtectedRoute allowedRoles={['faculty']}>
                    <FacultyPage />
                  </ProtectedRoute>
                } />
                <Route path="/facultyprofile" element={
                  <ProtectedRoute allowedRoles={['faculty']}>
                    <FacultyProfile />
                  </ProtectedRoute>
                } />

                {/* Protected Multi-Role Routes */}
                <Route path="/sessions" element={
                  <ProtectedRoute allowedRoles={['admin', 'faculty', 'alumni', 'student']}>
                    <Sessions />
                  </ProtectedRoute>
                } />
                <Route path="/sessionform" element={
                  <ProtectedRoute allowedRoles={['admin', 'faculty', 'alumni']}>
                    <SessionForm />
                  </ProtectedRoute>
                } />
                <Route path="/changepassword" element={
                  <ProtectedRoute allowedRoles={['admin', 'student', 'alumni', 'faculty']}>
                    <ChangePassword />
                  </ProtectedRoute>
                } />
                
                {/* Notifications Route - Accessible to all authenticated users */}
                <Route path="/notifications" element={
                  <ProtectedRoute allowedRoles={['admin', 'student', 'alumni', 'faculty']}>
                    <Notifications />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </Router>
        </NavigationProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;