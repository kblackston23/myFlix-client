import React from 'react';
import './director-view.scss';
import {Container, Card, Button, Row} from 'react-bootstrap';

export class DirectorView extends React.Component {

  render() {
      const { director, onBackClick, movies } = this.props;

      return (
          <Container fluid>
              <Card className="director-card">
                  <Card.Body>
                      <Card.Title>Director</Card.Title>
                      <Card.Text>
                          <span className="director-info">Name: </span>
                          <span className="value">{director.Name}</span>
                      </Card.Text>
                      <Card.Text>
                          <span className="director-info">Bio: </span>
                          <span className="value">{director.Bio}</span>
                      </Card.Text>
                      <Card.Text>
                          <span className="director-info">Birth: </span>
                          <span className="value">{director.Birth}</span>
                      </Card.Text>
                      <Card.Text>
                          <span className="director-info">Death: </span>
                          <span className="value">{director.Death}</span>
                      </Card.Text>

                      <Button id="back-button" variant="outline-light" onClick={() => { onBackClick(); }}>Back</Button>
                  </Card.Body>
              </Card>
          </Container>
      );
  }
}