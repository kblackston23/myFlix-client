import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import './movie-card.scss'

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card id="movie-card">
        <Card.Img id="movie-image" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title id="movie-title">{movie.Title}</Card.Title>
          <Card.Text id="movie-genre">{movie.Genre.name}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button id="open-button" variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};