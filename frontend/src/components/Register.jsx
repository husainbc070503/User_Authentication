import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  RadioGroup,
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
  name: "",
  email: "",
  password: "",
  cpassword: "",
  phone: "",
  address: "",
  avatar: "",
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [details, setDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error(`Please upload profile pic`, {
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
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only JPEG or PNG images are accepted", {
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
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "user-auth");
      data.append("cloud", "dm7x7knbb");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const finalRes = await res.json();
      if (finalRes) {
        toast.success("Image Uploaded!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setDetails({ ...details, avatar: finalRes.url });
      } else {
        toast.error("Failed to upload image! Try again later!", {
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
      return;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const skills = [];
    const tempSkills = document.querySelectorAll(".skills");
    tempSkills.forEach((item) => {
      if (item.classList.contains("Mui-checked"))
        skills.push(item.children[0].value);
    });

    if (details.password !== details.cpassword) {
      toast.error(`Mismatch Password`, {
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
      return;
    }

    try {
      const res = await fetch(`${api}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, skills }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Registeration Successful!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        navigate('login')
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

  const RadioLabel = ({ value, label }) => (
    <FormControlLabel
      value={value}
      control={<Checkbox className="skills" />}
      label={label}
    />
  );

  return (
    <Box>
      <div className="register-card">
        <Typography
          color="secondary"
          fontSize={27}
          textAlign="center"
          fontWeight="bold"
          marginBottom={4}
          textTransform="uppercase"
        >
          Register
        </Typography>
        <div className="register-form auth">
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid item md={2}>
              <FormLabel className="FormLabel label">Name</FormLabel>
            </Grid>
            <Grid item md={10}>
              <FormControl fullWidth>
                <TextField
                  type="name"
                  name="name"
                  placeholder="Your Name.."
                  required
                  value={details.name}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid item md={2}>
              <FormLabel className="FormLabel label">Email</FormLabel>
            </Grid>
            <Grid item md={10}>
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
            <Grid item md={2}>
              <FormLabel className="FormLabel label">Password</FormLabel>
            </Grid>
            <Grid item md={10}>
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
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid item md={2}>
              <FormLabel className="FormLabel label">
                Confirm Password
              </FormLabel>
            </Grid>
            <Grid item md={10}>
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
                name="cpassword"
                value={details.cpassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid item md={2}>
              <FormLabel className="FormLabel label">Phone</FormLabel>
            </Grid>
            <Grid item md={10}>
              <FormControl fullWidth>
                <TextField
                  type="tel"
                  name="phone"
                  placeholder="Contact No.."
                  required
                  value={details.phone}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid item md={2}>
              <FormLabel className="FormLabel label">Address</FormLabel>
            </Grid>
            <Grid item md={10}>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  name="address"
                  placeholder="Your address.."
                  required
                  multiline
                  rows={4}
                  value={details.address}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid item md={2}>
              <FormLabel className="FormLabel label">Profile</FormLabel>
            </Grid>
            <Grid item md={10}>
              <FormControl fullWidth>
                <TextField
                  type="file"
                  name="profile"
                  required
                  onChange={(e) => handleUpload(e.target.files[0])}
                  accept="image/*"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid item md={2}>
              <FormLabel className="FormLabel label">Skills</FormLabel>
            </Grid>
            <Grid item md={10}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
              >
                <RadioLabel value="C++" label="C++" />
                <RadioLabel value="Java" label="Java" />
                <RadioLabel value="Python" label="Python" />
                <RadioLabel value="HTML" label="HTMl" />
                <RadioLabel value="CSS" label="CSS" />
                <RadioLabel value="JS" label="JS" />
                <RadioLabel value="MERN" label="MERN" />
              </RadioGroup>
            </Grid>
          </Grid>
        </div>
        <Button
          color="primary"
          variant="contained"
          className="Button auth"
          disabled={loading}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </div>
    </Box>
  );
};

export default Register;
