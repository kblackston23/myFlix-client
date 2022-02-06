import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavbarView } from '../navbar/navbar';

import './main-view.scss'

class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
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
    const { movies, user } = this.state;
  
    return (
      <>
      <Router>
        <NavbarView user={user} />
        <Row className="main-view justify-content-md-center"><Routes>
          <Route exact path="/" render={() => {
            if (!user) {
            return <Redirect to="/login" />;
             }       
            return movies.map(movie => (
              <Col md={3} key={movie._id}>
                <MovieCard movie={movie} />
              </Col>
            ))
          }} />
          <Route path="/login" render={() => {
              if (user) {
              return <Redirect to="/" />;
               }

             return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
          }} />
         <Route path="/register" render={() => {
              if (user) {
              return <Redirect to="/" />;
              }

              return (
              <Col>
              <RegistrationView />
              </Col>
              );
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/directors/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.back()}
                movies={movies} />
              </Col>
            }} />
          <Route path="/genres/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.back()}
                movies={movies} />
              </Col>
            }} />
          </Routes>

        </Row>
      </Router>< br />
      <div><button id="logout-button" onClick={() => { this.onLoggedOut(); } }>Logout</button></div></>
    );
  }
}

export default MainView;