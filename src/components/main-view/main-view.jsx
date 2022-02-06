import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

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
        <Router>
          <NavbarView user={user} />
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user)
                return <Col> <LoginView mvoies={movies} onLoggedIn={user => this.onLoggedIn(user)} /></Col>;

              if (movies.length === 0)
                return <div className="main-view" />;

              return movies.map(movie => (
                <Col md={3} key={movie._id}>
                  <MovieCard movie={movie} />
                </Col>
              ));
            } } />
            <Route path="/register" render={() => {
              if (user)
                return <Redirect to="/" />;
              return <Col>
                <RegistrationView />
              </Col>;
            } } />
            <Route path="/movies/:id" render={({ match, history }) => {
              if (!user)
                return <Col> <LoginView mvoies={movies} onLoggedIn={user => this.onLoggedIn(user)} /></Col>;
              return <Col md={8}>
                <MovieView movie={movies.find(movie => movie._id === match.params.id)} onBackClick={() => history.goBack()} />
              </Col>;
            } } />
            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user)
                return <Col> <LoginView mvoies={movies} onLoggedIn={user => this.onLoggedIn(user)} /></Col>;
              if (movies.length === 0)
                return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name).Director} onBackClick={() => history.back()}
                  movies={movies} />
              </Col>;
            } } />
            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user)
                return <Col> <LoginView mvoies={movies} onLoggedIn={user => this.onLoggedIn(user)} /></Col>;
              if (movies.length === 0)
                return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(movies => movies.Genre.Name === match.params.name).Genre} onBackClick={() => history.back()}
                  movies={movies} />
              </Col>;
            } } />
            <Route path={`/users/${user}`} render={({ match, history }) => {
              if (!user)
                return <Col> <LoginView mvoies={movies} onLoggedIn={user => this.onLoggedIn(user)} /></Col>;
              if (!user)
                return <Redirect to="/" />;
              return <Col>
                <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
              </Col>;
            } } />
        </Row></Router>
    );
  }
}


export default MainView;