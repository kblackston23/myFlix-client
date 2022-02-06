import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss'

class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
        user: null
    });
}

getMovies(token) {
    axios.get(`https://movies-api23.herokuapp.com/movies`, {
        headers: { Authorization: `Bearer ${token}`}
    })
        .then(response => {
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;
  
    return (
      <>
      <div><h1 class="header-title">Welcome to myFlix!</h1>
      <h3 class="movie-list-title">Movie List:</h3>
      </div>
      <Router>
        <Row className="main-view justify-content-md-center"><Routes>
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
            </Col>
          }} /></Routes>

        </Row>
      </Router>< br />
      <div><button id="logout-button" onClick={() => { this.onLoggedOut(); } }>Logout</button></div></>
    );
  }
}

export default MainView;