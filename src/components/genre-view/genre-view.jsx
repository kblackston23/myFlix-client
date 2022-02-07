import React from 'react';
import PropTypes from 'prop-types';
import './genre-view.scss';
import {Container, Card, Button, Row} from 'react-bootstrap';

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick, movies } = this.props;

        return (
            <Container>
                <Card className="genre-card">
                    <Card.Body>
                        <Card.Title>Genre</Card.Title>
                        <Card.Text>
                            <span className="genre-info">Name: </span>
                            <span className="value">{genre.Name}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="genre-info">Description: </span>
                            <span className="value">{genre.Description}</span>
                        </Card.Text>

                        <Button id="back-button" variant="outline-light" onClick={() => { onBackClick(); }}>Back</Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

GenreView.proptypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
};