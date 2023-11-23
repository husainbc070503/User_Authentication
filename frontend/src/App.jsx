import React, { useEffect } from "react";
import {
  Box,
  Container,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import { indigo, orange } from "@mui/material/colors";
import Register from "./components/Register";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserCard from "./components/UserCard";

function App() {

  const theme = createTheme({
    palette: {
      primary: orange,
      secondary: indigo,
    },

    typography: {
      fontFamily: "Assistant",
    },
  });

  const Heading = styled(Typography)`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
  `;

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Container maxWidth="md" className="Container myContainer">
          <Heading color="primary">Task - User Authentication</Heading>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user" element={<UserCard />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </Box>
      <ToastContainer transition={Zoom} />
    </ThemeProvider>
  );
}

export default App;
