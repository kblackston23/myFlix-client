import React from 'react';
import axios from 'axios';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';

import './profile-view.scss';

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: '',
            Password: '',
            Email: '',
            Birthday: '',
            FavoriteMovies: [],
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null,
        });
        window.open('/', '_self');
    }

    getUser = (token) => {
        const Username = localStorage.getItem('user');
        axios.get(`https://movies-api23.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
 
    editUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://movies-api23.herokuapp.com/users/${Username}`,
                {
                    Username: this.state.Username,
                    Password: this.state.Password,
                    Email: this.state.Email,
                    Birthday: this.state.Birthday,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                });

                localStorage.setItem('user', this.state.Username);
                alert("Profile updated");
                window.open('/profile', '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    onRemoveFavorite = (e, movie) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(
                `https://movies-api23.herokuapp.com/users/${Username}/movies/${movie._id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                console.log(response);
                alert("Removed from favorites");
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    onDeleteUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://movies-api23.herokuapp.com/users/delete${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response);
                alert("Profile deleted");
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setUsername(value) {
        this.setState({
            Username: value,
        });
    }

    setPassword(value) {
        this.setState({
            Password: value,
        });
    }

    setEmail(value) {
        this.setState({
            Email: value,
        });
    }

    setBirthday(value) {
        this.setState({
            Birthday: value,
        });
    }

    render() {
        const { movies, onBackClick } = this.props;
        const { FavoriteMovies, Username, Email, Birthdate } = this.state;

        if (!Username) {
            return null;
        }

        return (
            <Container>
                <Row>
                    <Col>
                        <Card className="profile-card">
                            <Card.Body>
                                <Card.Title>Profile</Card.Title>
                                <Form
                                    onSubmit={(e) =>
                                        this.editUser(
                                            e,
                                            this.Username,
                                            this.Password,
                                            this.Email,
                                            this.Birthdate
                                        )
                                    }
                                >
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Username"
                                            placeholder="New Username"
                                            value={Username}
                                            onChange={(e) => this.setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="Password"
                                            placeholder="New Password"
                                            value={""}
                                            onChange={(e) => this.setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="Email"
                                            placeholder="Enter Email"
                                            value={Email}
                                            onChange={(e) => this.setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="Birthday"
                                            value={Birthdate}
                                            onChange={(e) => this.setBirthday(e.target.value)}
                                        />
                                    </Form.Group>
                                    <div>
                                        <Button id='users-button' onClick={this.editUser}>Update User</Button>
                                        <Button id='users-button' onClick={() => this.onDeleteUser()}>Delete User</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 id='header4'>{Username}'s Favorite Movies</h4>
                    </Col>
                </Row><br />
                <Row>
                    <Col>
                        <Card.Body>
                            {FavoriteMovies.length === 0 && (
                                <div>No Favorite Movies</div>
                            )}
                            <Row>
                                {FavoriteMovies.length > 0 &&
                                    movies.map((movie) => {
                                        if (
                                            movie._id ===
                                            FavoriteMovies.find((fav) => fav === movie._id)
                                        ) {
                                            return (
                                                <Card key={movie._id} >
                                                    <Card.Img
                                                        variant="top"
                                                        src={movie.ImagePath}
                                                    />
                                                    <Card.Body>
                                                        <Card.Title>
                                                            {movie.Title}
                                                        </Card.Title>
                                                        <Button id='users-button' value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove favorite</Button>
                                                    </Card.Body>
                                                </Card>
                                            );
                                        }
                                    })}
                            </Row>
                        </Card.Body>
                    </Col>
                </Row>
                    <Button id='back-button' onClick={() => { onBackClick(); }}>Back</Button>
            </Container>
        );
    }
}