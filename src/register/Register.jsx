import React, { useState } from 'react';
import './register.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const BASE_URL = "https://mern-backend-api-lkcl.onrender.com/api"

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/auth/register", credentials);
      // Handle successful registration response
      navigate("/login");
      toast.success('Registration successful!');
    } catch (err) {
      // Handle registration failure
      toast.error('Registration failed. Please check your information.');
    }
  };

  return (
    <div className='logindiv'>
      <div className="form_main">
        <div className="firstdiv">
          <h1 className="heading">Register</h1>
          <div className="inputContainer">
            <span className="inputIcon"><i className="fa fa-user"></i></span>
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
              className="inputField"
            />
          </div>
          <div className="inputContainer">
            <span className="inputIcon"><i className="fa fa-user"></i></span>
            <input
              type="text"
              placeholder="Phone"
              id="phone"
              onChange={handleChange}
              className="inputField"
            />
          </div>
          <div className="inputContainer">
            <span className="inputIcon"><i className="fa fa-user"></i></span>
            <input
              type="text"
              placeholder="City"
              id="city"
              onChange={handleChange}
              className="inputField"
            />
          </div>
          <div className="inputContainer">
          <span className="inputIcon"><i className="fa fa-user"></i></span>
          <input
            type="text"
            placeholder="Country"
            id="country"
            onChange={handleChange}
            className="inputField"
          />
        </div>
          <div className="inputContainer">
            <span className="inputIcon"><i className="fa fa-envelope"></i></span>
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
              className="inputField"
            />
          </div>
          <div className="inputContainer">
            <span className="inputIcon"><i className="fa fa-lock"></i></span>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="inputField"
            />
          </div>
          <button onClick={handleClick} id="button">Register</button>
          <Link to="/login" >Do you have an account?</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
