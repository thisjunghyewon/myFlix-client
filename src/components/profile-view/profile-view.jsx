import { useState } from "react";
import { useParams } from "react-router";

export const ProfileView = ({ user, token, onLoggedOut, movies }) => {
  const { movieId } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );
};
