import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
`;

const LogoText = styled(Typography)`
  flex-grow: 1;
  font-weight: 700;
  letter-spacing: 1px;
  color: white;
  cursor: pointer;
`;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token"); // Assuming JWT token is stored in cookies

  const handleAuth = () => {
    if (token) {
      Cookies.remove("token");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {/* Mobile menu icon (can expand for future) */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo / App Name */}
        <LogoText variant="h6" onClick={() => navigate("/")}>
          Diwali Greetings
        </LogoText>

        {/* Auth Button */}
        <Box>
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
            onClick={handleAuth}
          >
            {token ? "Sign Out" : "Sign In"}
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default HeaderComponent;
