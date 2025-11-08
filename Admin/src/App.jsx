import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import { Layout } from './components/layout/Layout';
import { ToastContainer } from './components/ui/Toast';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Homepage } from './pages/Homepage';
import { Courses } from './pages/Courses';
import { FAQ } from './pages/FAQ';
import { Certificates } from './pages/Certificates';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Settings } from './pages/Settings';
import { Message } from './pages/Message';


function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/homepage" element={
            <ProtectedRoute>
              <Layout>
                <Homepage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/courses" element={
            <ProtectedRoute>
              <Layout>
                <Courses />
              </Layout>
            </ProtectedRoute>
          } />
             <Route path="/message" element={
            <ProtectedRoute>
              <Layout>
               <Message/>
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/faq" element={
            <ProtectedRoute>
              <Layout>
                <FAQ />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/certificates" element={
            <ProtectedRoute>
              <Layout>
                <Certificates />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <Layout>
                <About />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute>
              <Layout>
                <Contact />
              </Layout>
            </ProtectedRoute>
          } />
 
          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
