import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Bienvenue extends React.Component {
  render() {
    const marginTop = { marginTop: "20px" };
    return (
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <div
              className="bg-dark text-white p-5 rounded"
              style={{ marginBottom: '20px' }}
            >
              <h1>Bienvenue dans votre Magasin de Voitures</h1>
              <blockquote className="blockquote mb-0">
                <p>Le meilleur de nos voitures est exposé près de chez vous</p>
              
                <footer style={{ color: '#aaaaaa', fontSize: '14px' }}>
                  — Master MIOLA
                </footer>
              </blockquote>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bienvenue;