import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/actions';

import './movie-card.scss'

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    

    const onAddToFavorites = (e) => {
      e.preventDefault();
      axios.post(`https://movies-api23.herokuapp.com/users/${Username}/movies/${this.props.movie._id}`, {},
        {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          this.props.updateUser(response.data);
          alert("Added to favorites");
        
        })
        .catch(function (error) {
          console.log(error);
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

let mapStateToProps = state => {
  return { 
      user: state.user,
      movies: state.movies
 }
}

export default connect(mapStateToProps, { updateUser })(MovieCard);