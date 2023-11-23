import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { api } from "../constants/Api";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [details, setDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${api}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Successfully Signed In!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem("user-details", JSON.stringify(data.user));
        navigate("../user");
        setDetails(initialState);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
    }
  };

  return (
    <Box>
      <div className="login-card">
        <Typography
          color="secondary"
          fontSize={27}
          textAlign="center"
          fontWeight="bold"
          marginBottom={4}
          textTransform="uppercase"
        >
          Login
        </Typography>
        <div className="login-form auth">
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid item md={2} xs={12}>
              <FormLabel className="FormLabel label">Email</FormLabel>
            </Grid>
            <Grid item md={10} xs={12}>
              <FormControl fullWidth>
                <TextField
                  type="email"
                  name="email"
                  placeholder="Your Email addressess.."
                  required
                  value={details.email}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid item md={2} xs={12}>
              <FormLabel className="FormLabel label">Password</FormLabel>
            </Grid>
            <Grid item md={10} xs={12}>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                fullWidth
                name="password"
                value={details.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </div>
        <div className="buttons">
          <Button
            color="secondary"
            variant="contained"
            className="Button auth"
            disabled={loading}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/")}
          >
            Register Yourself?
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default Login;
