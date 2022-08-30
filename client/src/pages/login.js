import {
  Typography,
  Box,
  Paper,
  TextField,
  Container,
  Button,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { login, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  AlternateEmail,
  Login,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const { email, password } = formData;

  //store
  const { isSuccess } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [dispatch, isSuccess, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = { email, password };
    dispatch(login(loginData));
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
                <Login fontSize="large" sx={{ color: "#666", mb: 4 }} />

                <Typography
                  variant="h5"
                  sx={{
                    color: "#666",
                    textAlign: "center",
                    mb: 1,
                    fontSize: 27,
                  }}
                >
                  Login
                </Typography>
              </Stack>
              <Typography
                variant="h5"
                sx={{ color: "#666", fontSize: 18, textAlign: "center", mb: 4 }}
              >
                Login to start creating your goals
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
                noValidate
              >
                <TextField
                  name="email"
                  value={email}
                  placeholder="Enter email"
                  label="Email"
                  type="text"
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton sx={{ color: "#a4a4a4" }}>
                        <AlternateEmail />
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
                        {isVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  type="submit"
                  fullWidth
                >
                  Submit
                </Button>
              </Box>
              <Stack direction="row" sx={{ alignItems: "center", mt: 2 }}>
                <Typography variant="body2">Don't have acc.? </Typography>
                <Button
                  sx={{ textTransform: "capitalize" }}
                  component={RouterLink}
                  to="/register"
                >
                  register
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
