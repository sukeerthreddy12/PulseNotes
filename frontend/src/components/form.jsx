import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants";
import "../styles/form.css";
import LoadingIndicator from "./loadingindicator";


function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await api.post(route, { username, password });
        if (method === "login") {
            localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
            localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
            navigate("/");
        } else {
            navigate("/login");
        }
    } catch (error) {
        const data = error.response?.data;
        if (data?.username) {
            alert(`Username: ${data.username.join(", ")}`);
        } else if (data?.password) {
            alert(`Password: ${data.password.join(", ")}`);
        } else if (data?.detail) {
            alert(data.detail);
        } else {
            alert("Something went wrong. Please try again.");
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
}

export default Form;

