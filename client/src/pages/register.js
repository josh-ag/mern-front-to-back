import {
  Typography,
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { register, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  AppRegistration,
  MailOutlineOutlined,
  PersonOutlineOutlined,
  PersonRounded,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const { firstname, lastname, username, email, password } = formData;

  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handle form submition
  const handleSubmit = (e) => {
    e.preventDefault();

    const registerData = { firstname, lastname, username, email, password };

    dispatch(register(registerData));
  };

  const handleShowPasswd = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Box
      sx={{
        mt: 4,
      }}
    >
      <Container>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "center" }}
              >
                <AppRegistration
                  fontSize="large"
                  sx={{ color: "#666", mb: 4 }}
                />

                <Typography
                  variant="h5"
                  sx={{
                    color: "#666",
                    textAlign: "center",
                    mb: 1,
                    fontSize: 27,
                  }}
                >
                  Register
                </Typography>
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  color: "#666",
                  textAlign: "center",
                  mb: 1,
                  fontSize: 27,
                }}
              >
                Create an account
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
              >
                <TextField
                  name="firstname"
                  placeholder="firstname"
                  label="Firstname"
                  type="text"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={firstname}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <PersonRounded />
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  name="lastname"
                  placeholder="lastname"
                  label="Lastname"
                  type="text"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={lastname}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <PersonRounded />
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  name="username"
                  placeholder="username"
                  label="Username"
                  type="text"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={username}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <PersonOutlineOutlined />
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="text"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={email}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <MailOutlineOutlined />
                      </IconButton>
                    ),
                  }}
                />

                <TextField
                  name="password"
                  placeholder="Enter password"
                  label="Password"
                  type={isVisible ? "text" : "password"}
                  fullWidth
                  value={password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPasswd}
                        sx={{ color: "#a4a4a4" }}
                      >
                        {isVisible ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Submit
                </Button>
              </Box>
              <Stack direction="row" sx={{ alignItems: "center", mt: 2 }}>
                <Typography variant="body2">Already have acc.? </Typography>
                <Button
                  sx={{ textTransform: "capitalize" }}
                  component={RouterLink}
                  to="/login"
                >
                  Login
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
