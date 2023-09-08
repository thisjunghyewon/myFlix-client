import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, setUser, movies, onLoggedOut }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [showModal, setShowModal] = useState(false);
  const favoriteMovies = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie.id);
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(
      `https://mymovieflix-3d9c07cffa0d.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Update failed.");
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };

  const handleDeleteUser = () => {
    fetch(
      `https://mymovieflix-3d9c07cffa0d.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        onLoggedOut();
      } else {
        alert("something went wrong.");
      }
    });
  };

  return (
    <>
      <h1>My Profile</h1>
      <Row>
        <Col>
          <div>Username: {user.Username}</div>
          <div>Email: {user.Email}</div>
        </Col>
      </Row>
      <Row>
        <h2>Update My Information</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="5"
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Row>
      <Row>
        <h3>Favorite movies:</h3>
        {favoriteMovies.map((movie) => (
          <Col key={movie.id} md={4}>
            <MovieCard movie={movie}></MovieCard>
          </Col>
        ))}
      </Row>
      <Button variant="warning" onClick={handleShowModal}>
        Delete my account
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteUser}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
