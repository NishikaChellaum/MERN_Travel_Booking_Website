import React, { useState } from 'react';
import '../styles/stylelogin.css';
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from '@mui/material';

const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const toggleForm = () => setIsSignUp(!isSignUp);

  // Sign Up State
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [signupErrors, setSignupErrors] = useState({});

  // Sign In State
  const [signinData, setSigninData] = useState({ email: '', password: '' });
  const [signinErrors, setSigninErrors] = useState({});

  // Sign Up Handlers
  const handleSignUpChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const validateSignUp = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z ]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!nameRegex.test(signupData.name)) {
      newErrors.name = "Name should have at least 3 alphabetic characters";
    }
    if (!emailRegex.test(signupData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!passwordRegex.test(signupData.password)) {
      newErrors.password = "Password must be 6+ characters, 1 number & 1 special character";
    }

    setSignupErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUpSubmit = async (e) => {
  e.preventDefault();
  if (validateSignUp()) {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Account Created ✅");
        navigate("/holidays");
      } else {
        alert(data.msg || "Signup failed ❌");
      }
    } catch (err) {
      alert("Server error");
    }
  }
};


  // Sign In Handlers
  const handleSignInChange = (e) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
  };

  const validateSignIn = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(signinData.email)) {
      errors.email = "Enter a valid email";
    }
    if (signinData.password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setSigninErrors(errors);
    return Object.keys(errors).length === 0;
  };

 const handleSignInSubmit = async (e) => {
  e.preventDefault();
  if (validateSignIn()) {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token); // optional
        alert("Signed In ✅");
        navigate("/holidays");
      } else {
        alert(data.msg || "Login failed ❌");
      }
    } catch (err) {
      alert("Server error");
    }
  }
};


  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUpSubmit}>
          <Typography variant="h4" gutterBottom>Create Account</Typography>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <Typography variant="body2" gutterBottom>
            or use your email for registration
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={signupData.name}
              onChange={handleSignUpChange}
              error={!!signupErrors.name}
              helperText={signupErrors.name}
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              name="email"
              value={signupData.email}
              onChange={handleSignUpChange}
              error={!!signupErrors.email}
              helperText={signupErrors.email}
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              name="password"
              value={signupData.password}
              onChange={handleSignUpChange}
              error={!!signupErrors.password}
              helperText={signupErrors.password}
              margin="normal"
            />
          </Box>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Sign Up
          </Button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignInSubmit}>
          <Typography variant="h4" gutterBottom>Sign In</Typography>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <Typography variant="body2" gutterBottom>
            or use your account
          </Typography>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={signinData.email}
            onChange={handleSignInChange}
            error={!!signinErrors.email}
            helperText={signinErrors.email}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            value={signinData.password}
            onChange={handleSignInChange}
            error={!!signinErrors.password}
            helperText={signinErrors.password}
          />
          <Link to="/ForgotPassword">Forgot Password?</Link>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Sign In
          </Button>
        </form>
      </div>

      {/* Overlay */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <Typography variant="h5">Welcome Back!</Typography>
            <Typography variant="body2">To keep connected with us please login with your personal info</Typography>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "#1976d2",
                fontWeight: "bold",
                '&:hover': {
                  backgroundColor: "#f0f0f0"
                }
              }}
              onClick={toggleForm}
            >
              Sign In
            </Button>
          </div>
          <div className="overlay-panel overlay-right">
            <Typography variant="h5">Hello, Friend!</Typography>
            <Typography variant="body2">Enter your personal details and start journey with us</Typography>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "#1976d2",
                fontWeight: "bold",
                '&:hover': {
                  backgroundColor: "#f0f0f0"
                }
              }}
              onClick={toggleForm}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
