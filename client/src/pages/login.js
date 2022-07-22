import {
  Typography,
  Box,
  Paper,
  TextField,
  Container,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { login, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AlternateEmail, Visibility, VisibilityOff } from "@mui/icons-material";

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
              <Typography
                variant="h4"
                sx={{ color: "#444", fontSize: 29, textAlign: "center", mb: 1 }}
              >
                Login
              </Typography>
              <Typography
                variant="h4"
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
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
