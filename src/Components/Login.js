import React, { useState } from "react";
import { useContext } from "react";
import notesContext from "../context/Notes/noteContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const context = useContext(notesContext);
const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
    const { handleLogin } = context;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(user.email, user.password);
    navigate("*")

  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={user.email}

          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={user.password}

          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
