import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to={"/"} className="navbar-brand">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/17/Tata_Tamo_Racemo.jpg"
            width="25"
            height="25"
            alt="logo"
          />
          {' '}
        </Link>
        <Nav className="mr-auto">
          <Link to={"/add"}  className="nav-link">Ajouter une Voiture</Link>
          <Link to={"/list"} className="nav-link">Liste des Voitures</Link>
          <Link to={"/ai"}   className="nav-link">Conseil IA</Link>
        </Nav>
        <Nav className="ml-auto">
          {localStorage.getItem('token')
            ? <span
                className="nav-link"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
              >
                Déconnexion
              </span>
            : <Link to={"/login"} className="nav-link">Connexion</Link>
          }
        </Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;