import React, { Component } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusSquare,
  faSave,
  faUndo
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:9090';

function VoitureWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <Voiture id={id} navigate={navigate} />;
}

class Voiture extends Component {

  initialState = {
    marque: '', modele: '', couleur: '',
    immatricule: '', prix: '', annee: '',
    show: false
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState };
  }

  componentDidMount() {
    if (this.props.id) {
      this.loadVoiture(this.props.id);
    }
  }

  loadVoiture = (id) => {
    const token = localStorage.getItem('token');
    axios.get(`${API_URL}/voitures/${id}`,
      { headers: { Authorization: `Bearer ${token}` } })
    .then(res => {
      const { marque, modele, couleur, immatricule, prix, annee } = res.data;
      this.setState({ marque, modele, couleur, immatricule, prix, annee });
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleReset = () => {
    this.setState({ ...this.initialState });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const voiture = {
      marque:      this.state.marque,
      modele:      this.state.modele,
      couleur:     this.state.couleur,
      immatricule: this.state.immatricule,
      annee:       parseInt(this.state.annee),
      prix:        parseInt(this.state.prix)
    };

    const request = this.props.id
      ? axios.put(`${API_URL}/voitures/${this.props.id}`, voiture, { headers })
      : axios.post(`${API_URL}/voitures`, voiture, { headers });

    request.then(() => {
      this.setState({ show: true });
      setTimeout(() => {
        this.setState({ show: false, ...this.initialState });
      }, 3000);
    });
  };

  render() {
  const { marque, modele, couleur,
          immatricule, prix, annee, show } = this.state;
  const isEdit = !!this.props.id;

  return (
    <div>
      <div style={{ display: show ? "block" : "none" }}>
        <MyToast children={{
          show: show,
          message: isEdit
            ? "Voiture modifiée avec succès."
            : "Voiture enregistrée avec succès.",
          type: "success"
        }}/>
      </div>

      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          <FontAwesomeIcon icon={faPlusSquare} />
          {isEdit ? " Modifier une Voiture" : " Ajouter une Voiture"}
        </Card.Header>

        <Form onReset={this.handleReset} onSubmit={this.handleSubmit}
              id="VoitureFormId">
          <Card.Body>

            {/* ✅ Tout sur UNE seule ligne comme le PDF */}
            <Row className="mb-3">
              <Col>
                <Form.Label>Marque</Form.Label>
                <Form.Control
                  required name="marque" type="text"
                  size="sm"
                  className="bg-dark text-white"
                  placeholder="Entrez Marque V"
                  value={marque}
                  autoComplete="off"
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Modele</Form.Label>
                <Form.Control
                  required name="modele" type="text"
                  size="sm"
                  className="bg-dark text-white"
                  placeholder="Entrez Modele V"
                  value={modele}
                  autoComplete="off"
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Couleur</Form.Label>
                <Form.Control
                  required name="couleur" type="text"
                  size="sm"
                  className="bg-dark text-white"
                  placeholder="Entrez Couleur V"
                  value={couleur}
                  autoComplete="off"
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Immatricule</Form.Label>
                <Form.Control
                  required name="immatricule" type="text"
                  size="sm"
                  className="bg-dark text-white"
                  placeholder="Entrez Immatricu"
                  value={immatricule}
                  autoComplete="off"
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  required name="prix" type="number"
                  size="sm"
                  className="bg-dark text-white"
                  placeholder="Entrez Prix V"
                  value={prix}
                  autoComplete="off"
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Annee</Form.Label>
                <Form.Control
                  required name="annee" type="number"
                  size="sm"
                  className="bg-dark text-white"
                  placeholder="Entrez Annee V"
                  value={annee}
                  autoComplete="off"
                  onChange={this.handleChange}
                />
              </Col>
            </Row>

          </Card.Body>

          <Card.Footer style={{ textAlign: "right" }}>
            <Button size="sm" variant="success" type="submit">
              <FontAwesomeIcon icon={faSave} /> Submit
            </Button>{' '}
           
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}
}

export default VoitureWrapper;