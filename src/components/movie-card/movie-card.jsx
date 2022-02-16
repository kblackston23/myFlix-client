import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './movie-card.scss'

export class MovieCard extends React.Component {
  render() {
    const { movie, user, updateUser } = this.props;
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const onAddToFavorites = (e) => {
      e.preventDefault();
      axios.post(`https://movies-api23.herokuapp.com/users/${Username}/movies/${movie._id}`, {},
        {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          const data = response.data;
          console.log(date);
          alert("Added to favorites");
          updateUser(data);
        })
        .catch(e => {
          console.log('Error adding movie to favorites');
          alert('Movie not added to favorites');
        });
    };


    return (
      <Card id="movie-card">
        <Card.Img id="movie-image" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title id="movie-title">{movie.Title}</Card.Title>
          <Card.Text id="movie-genre">{movie.Genre.Name}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button id="open-button" variant="link">Open</Button>
            <Button id="open-button" onClick={onAddToFavorites}>Add to favorites</Button>
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
    _id: PropTypes.string.isRequired
  }).isRequired,
};