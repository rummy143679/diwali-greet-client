import React from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate } from "react-router-dom";

const FooterWrapper = styled(Box)`
  background: linear-gradient(90deg, #e52e71, #ff8a00);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
`;

const FooterLinks = styled(Stack)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
`;

const FooterBottom = styled(Box)`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 1.5rem;
  padding-top: 1rem;
  font-size: 0.9rem;
  opacity: 0.9;
`;

function FooterComponent() {
  // const navigate = useNavigate();

  return (
    <FooterWrapper>
      {/* App Logo / Name */}
      {/* <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        ✨ Diwali Greetings
      </Typography> */}

      {/* Navigation Links */}
      {/* <FooterLinks direction="row">
        <Typography
          variant="body1"
          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          onClick={() => navigate("/")}
        >
          Home
        </Typography>
        <Typography
          variant="body1"
          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          onClick={() => navigate("/about")}
        >
          About
        </Typography>
        <Typography
          variant="body1"
          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          onClick={() => navigate("/contact")}
        >
          Contact
        </Typography>
      </FooterLinks> */}

      {/* Social Media Icons */}
      <Stack direction="row" spacing={2} justifyContent="center">
        <IconButton
          color="inherit"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          color="inherit"
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          color="inherit"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon />
        </IconButton>
      </Stack>

      {/* Copyright */}
      <FooterBottom>
        <Typography variant="body2">
          © {new Date().getFullYear()} Diwali Greetings. All rights reserved.
        </Typography>
      </FooterBottom>
    </FooterWrapper>
  );
}

export default FooterComponent;
