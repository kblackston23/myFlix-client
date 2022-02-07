import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {
 
  keypressCallback(event) {
    console.log(event.key);
  }
  
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback
    );
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
        <div className="movie-view">
        <div className="movie-poster">
          <img id="movie__img" src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="movie__title">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="movie__header">Description: </span>
          <span className="movie__text">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="movie__header">Genre: </span>
          <span className="movie__text">{movie.Genre.Name}</span>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">View Genre Info</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="movie__header">Director: </span>
          <span className="movie__text">{movie.Director.Name}</span>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">View Director Info</Button>
          </Link>
        </div>
      <button id="back-button" onClick={() => { onBackClick(null); } }>Back</button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};