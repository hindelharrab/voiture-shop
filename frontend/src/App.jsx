import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import NavigationBar from './Components/NavigationBar';
import Bienvenue     from './Components/Bienvenue';
import Footer        from './Components/Footer';
import Voiture       from './Components/Voiture';
import VoitureListe  from './Components/VoitureListe';
import Login         from './Components/Login';
import AIConseil     from './Components/AIConseil';

function PrivateRoute({ children }) {
  return localStorage.getItem('token')
    ? children
    : <Navigate to="/login" />;
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const marginTop = { marginTop: "20px" };

  return (
    <>
      {!isLoginPage && <NavigationBar />}

      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <PrivateRoute><Bienvenue /></PrivateRoute>
              }/>
              <Route path="/add" element={
                <PrivateRoute><Voiture /></PrivateRoute>
              }/>
              <Route path="/edit/:id" element={
                <PrivateRoute><Voiture /></PrivateRoute>
              }/>
              <Route path="/list" element={
                <PrivateRoute><VoitureListe /></PrivateRoute>
              }/>
              <Route path="/ai" element={
                <PrivateRoute><AIConseil /></PrivateRoute>
              }/>
            </Routes>
          </Col>
        </Row>
      </Container>

      {!isLoginPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;