import React from 'react';
import { Navbar, Container, Col } from 'react-bootstrap';

class Footer extends React.Component {
  render() {
    let fullYear = new Date().getFullYear();
    return (
      <Navbar fixed="bottom" bg="dark" variant="dark"
              style={{ borderTop: '1px solid #444' }}>
        <Container>
          <Col lg={12} className="text-center">
            {/* ✅ text-white au lieu de text-muted */}
            <div style={{ color: '#aaa', fontSize: '14px' }}>
              {fullYear}-{fullYear + 1}, All Rights Reserved by Master MIOLA
            </div>
          </Col>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;