import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:9090';

function LoginWrapper() {
  const navigate = useNavigate();
  return <Login navigate={navigate} />;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', error: '' };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/auth/login`, {
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);
      this.props.navigate('/');
      window.location.reload();
    })
    .catch(err => {
      this.setState({
        error: err.response?.status === 401
          ? 'Identifiants incorrects.'
          : 'Erreur de connexion.'
      });
    });
  };

  render() {
    return (
      <Col lg={4} className="mx-auto mt-5">
        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <h4>Connexion</h4>
          </Card.Header>
          <Card.Body>
            {this.state.error && (
              <div className="alert alert-danger">
                {this.state.error}
              </div>
            )}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nom d'utilisateur</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  className="bg-dark text-white"
                  placeholder="admin"
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  className="bg-dark text-white"
                  placeholder="admin123"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit" className="w-100">
                Se connecter
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default LoginWrapper;