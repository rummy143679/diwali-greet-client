import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 83vh;
  background: linear-gradient(135deg, #f9d423, #ff4e50);
  padding: 20px;
`;

const FormWrapper = styled(Paper)`
  width: 100%;
  max-width: 420px;
  padding: 2rem;
  border-radius: 1.5rem !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
  background-color: #ffffffee !important;
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 1.2rem;
  }
`;

const SubmitButton = styled(Button)`
  && {
    width: 100%;
    padding: 0.75rem;
    font-weight: bold;
    background-color: #f57c00;
    color: white;
    border-radius: 8px;
    &:hover {
      background-color: #ef6c00;
    }
  }
`;

function LoginComponent() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const apiVersion = import.meta.env.VITE_APP_API_VERSION;

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/${apiVersion}/user/login`,
        {
          email: value.email,
          password: value.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Login successful....!");
      if(response.data.success){
        setTimeout(() => navigate("/"), 500);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password!");
    }
  };

  return (
    <Container>
      <FormWrapper elevation={4}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Diwali Greeting Login
        </Typography>

        <form onSubmit={handleOnSubmit}>
          <StyledTextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            value={value.email}
            onChange={handleChange("email")}
          />
          <StyledTextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={value.password}
            onChange={handleChange("password")}
          />

          <SubmitButton type="submit" variant="contained">
            Login
          </SubmitButton>
        </form>

        <Typography variant="body2" align="center" marginTop="1rem">
          Don’t have an account? <a href="/signup">Register</a>
        </Typography>
      </FormWrapper>
    </Container>
  );
}

export default LoginComponent;
