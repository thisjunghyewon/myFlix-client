import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    //this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    //when the login request succeeds, they’re taken to the list of movies in MainView!
    fetch("https://mymovieflix-3d9c07cffa0d.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json()) //This transforms the response content into a JSON object that your code can use to extract the JWT sent by the myFlix API.
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token); //localStorage, which allows data storage across browser sessions.
          onLoggedIn(data.user, data.token); //pass the user and token back to MainView so they can be used in all the subsequent API requests.
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    //This callback tells the Login API to validate username and password
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
        />
      </Form.Group>
      <Button
        className="mt-1 d-grid gap-2 col-12 mx-auto"
        variant="primary"
        type="submit"
      >
        Log in
      </Button>
    </Form>
  );
};
