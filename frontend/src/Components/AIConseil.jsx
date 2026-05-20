import React, { Component } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:9090';

export default class AIConseil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      marque: '', modele: '',
      prix: '', annee: '',
      conseil: '', loading: false, error: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleReset = () => {
    this.setState({
      marque: '', modele: '', prix: '',
      annee: '', conseil: '', error: ''
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true, conseil: '', error: '' });

    const token = localStorage.getItem('token');
    const { marque, modele, prix, annee } = this.state;

      axios.post(`${API_URL}/ai/voiture-conseil`,
      {
        question: `Je veux acheter une ${marque} ${modele} ` +
                  `de l'année ${annee} au prix de ${prix} MAD. ` +
                  `Est-ce un bon achat ? Quels sont les avantages ` +
                  `et inconvénients ?`
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => {
      this.setState({ conseil: res.data.reponse, loading: false });
    })
    .catch(() => {
      this.setState({
        error: "Erreur lors de la communication avec l'IA.",
        loading: false
      });
    });
  };

  render() {
    const { marque, modele, prix, annee,
            conseil, loading, error } = this.state;

    return (
      <div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            Conseil IA — Expert Automobile
          </Card.Header>

          <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
            <Card.Body>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Marque</Form.Label>
                  <Form.Control
                    name="marque" type="text"
                    className="bg-dark text-white"
                    placeholder="Ex: Toyota"
                    value={marque}
                    onChange={this.handleChange}
                    required autoComplete="off"
                  />
                </Col>
                <Col>
                  <Form.Label>Modele</Form.Label>
                  <Form.Control
                    name="modele" type="text"
                    className="bg-dark text-white"
                    placeholder="Ex: Corolla"
                    value={modele}
                    onChange={this.handleChange}
                    required autoComplete="off"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Prix (MAD)</Form.Label>
                  <Form.Control
                    name="prix" type="number"
                    className="bg-dark text-white"
                    placeholder="Ex: 95000"
                    value={prix}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Annee</Form.Label>
                  <Form.Control
                    name="annee" type="number"
                    className="bg-dark text-white"
                    placeholder="Ex: 2020"
                    value={annee}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Row>

              {loading && (
                <div className="text-center text-white mt-3">
                  <div className="spinner-border spinner-border-sm text-light"
                       role="status">
                    <span className="sr-only">Chargement...</span>
                  </div>
                  {' '}Analyse en cours...
                </div>
              )}

              {conseil && !loading && (
                <div className="alert alert-info mt-3">
                  <strong>Conseil IA :</strong><br/>
                  {conseil}
                </div>
              )}

              {error && (
                <div className="alert alert-danger mt-3">
                  {error}
                </div>
              )}

            </Card.Body>

            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success"
                      type="submit" disabled={loading}>
                {loading ? 'Chargement...' : 'Obtenir Conseil'}
              </Button>{' '}
              <Button size="sm" variant="info" type="reset">
                Reset
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}