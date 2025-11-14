import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import styled from "styled-components";
import HOC from "../../hoc/HigherOrderComponent";
import axios from "axios";

const languages = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Hinglish", label: "Hinglish" },
];

const tones = [
  { value: "Formal", label: "Formal" },
  { value: "Informal", label: "Informal" },
];

// Styled container for responsive layout
const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  background: linear-gradient(135deg, #f9f9f9 0%, #ffe8b5 100%);
  padding: 2rem;
`;

// Form box styling
const FormBox = styled(Box)`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

function HomeComponent() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const apiVersion = import.meta.env.VITE_APP_API_VERSION;
  const [formData, setFormData] = useState({
    name: "",
    language: "English",
    tone: "Formal",
  });
  const [response, setResponse] = useState("");

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/${apiVersion}/gemini/generate`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.Message === "Fetched") {
        setResponse(response.data.data);
      } else if (response.data.status === 503) {
        alert("service is not available go with dummy data");
        setResponse(
          `Generated Greeting for ${formData.name} in ${formData.language} with a ${formData.tone} tone 🎉`
        );
      }
    } catch (error) {
      console.error("Card Generation failed:", error);
      alert("Card Generation failed. Please try again.");
    }
  };

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([response], { type: "text/plain" });
    const fileUrl= URL.createObjectURL(file);
    element.href = fileUrl
    element.download = `${formData.name}_Diwali_Greeting.text`;
    document.body.appendChild(element);
    element.click();

    // remove anchor tag and clean the 
    document.body.removeChild(element);
    URL.revokeObjectURL(fileUrl);
  }

  function handleShareEmail() {
    const subject = encodeURIComponent("Diwali Greeting");
    const body = encodeURIComponent(response);
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
      "_blank"
    );
  }

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${response}`, "_blank");
  };

  return (
    <Wrapper>
      <Container maxWidth="sm">
        <FormBox component="form" onSubmit={handleGenerate}>
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            color="primary"
          >
            🎇 Generate Diwali Greeting
          </Typography>

          <TextField
            label="Recipient Name"
            variant="outlined"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange("name")}
          />

          <TextField
            select
            label="Language"
            fullWidth
            value={formData.language}
            onChange={handleChange("language")}
            helperText="Select your preferred language"
          >
            {languages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Tone"
            fullWidth
            value={formData.tone}
            onChange={handleChange("tone")}
            helperText="Select your message tone"
          >
            {tones.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Generate Greeting
          </Button>
        </FormBox>

        {response && (
          <Box mt={4} textAlign="center">
            <Typography
              variant="h6"
              sx={{
                color: "#444",
                backgroundColor: "#fff",
                borderRadius: "12px",
                p: 2,
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              {response}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              mt={3}
            >
              <Button
                variant="contained"
                color="success"
                onClick={handleShareWhatsApp}
              >
                Share via WhatsApp
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleShareEmail}
              >
                Share via Email
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleDownload}
              >
                Download Greeting
              </Button>
            </Stack>
          </Box>
        )}
      </Container>
    </Wrapper>
  );
}

export default HOC(HomeComponent);
