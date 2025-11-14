import { useState } from "react";
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
  background-color: #ffffffdd !important;
  backdrop-filter: blur(8px);

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
    background-color: #ff6f00;
    color: white;
    border-radius: 8px;
    &:hover {
      background-color: #e65100;
    }
  }
`;

const SignupComponent = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const apiVersion = import.meta.env.VITE_APP_API_VERSION;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // delete formData.confirmPassword;

    try {
      const response = await axios.post(
        `${apiUrl}/${apiVersion}/user/createUser`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(response.data.Status === "success"){
        alert(response.data.Message)
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Container>
      <FormWrapper elevation={4}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Diwali Greeting Registration
        </Typography>

        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <StyledTextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <StyledTextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <StyledTextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <StyledTextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <SubmitButton type="submit" variant="contained">
            Register
          </SubmitButton>
        </form>

        <Typography variant="body2" align="center" marginTop="1rem">
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </FormWrapper>
    </Container>
  );
};

export default SignupComponent;
