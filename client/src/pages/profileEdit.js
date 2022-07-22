import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  OutlinedInput,
  InputLabel,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AddAPhoto } from "@mui/icons-material";
import { useEffect } from "react";
import {
  getProfile,
  logout,
  reset,
  updateProfile,
} from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const ProfileEdit = () => {
  const { profile } = useSelector((state) => state.auth);
  //internal state
  const [updateForm, setUpdateForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
  });

  const { firstname, lastname, username } = updateForm;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdateForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handle form  submission
  const handleSubmit = (e) => {
    //prevent default form behavior
    e.preventDefault();

    const updateData = {
      firstname: firstname || profile.firstname,
      lastname: lastname || profile.lastname,
      username: username || profile.username,
    };

    dispatch(updateProfile(updateData));

    //reset
    setUpdateForm((prevState) => ({
      ...prevState,
      firstname: "",
      lastname: "",
      username: "",
    }));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!localStorage.getItem("token") || !user) {
      dispatch(logout());
      navigate("/login");
    }

    dispatch(getProfile());
    dispatch(reset());
  }, [dispatch, navigate]);

  return (
    <Container sx={{ my: 4 }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} sx={{ justifyContent: "center" }}>
          <Card>
            <CardHeader title="Profile" sx={{ color: "#666", fontSize: 24 }} />
            <CardContent>
              {profile && (
                <Box
                  component="form"
                  noValidate={true}
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {!profile?.photoURL ? (
                      <>
                        <Avatar
                          sx={{
                            width: 75,
                            height: 75,
                            mb: 4,
                            color: "#444",
                            bgcolor: "orange",
                            alignSelf: "center",
                          }}
                        >
                          {profile.username.substr(0, 1).toUpperCase()}
                        </Avatar>
                        <InputLabel htmlFor="profile">
                          <AddAPhoto color="primary" />
                        </InputLabel>
                        <OutlinedInput
                          id="profile"
                          type="file"
                          name="photoURL"
                          sx={{ display: "none" }}
                          onChange={handleChange}
                        />
                      </>
                    ) : null}
                  </Box>
                  <InputLabel sx={{ color: "#666", fontSize: 18, mb: 1 }}>
                    Firstname
                  </InputLabel>
                  <OutlinedInput
                    name="firstname"
                    sx={{ fontSize: 24, textTransform: "capitalize", mb: 2 }}
                    defaultValue={profile.firstname}
                    onChange={handleChange}
                    fullWidth
                  />
                  <InputLabel sx={{ color: "#666", fontSize: 18, mb: 1 }}>
                    Lastname
                  </InputLabel>
                  <OutlinedInput
                    name="lastname"
                    sx={{ fontSize: 24, textTransform: "capitalize", mb: 2 }}
                    defaultValue={profile.lastname}
                    onChange={handleChange}
                    fullWidth
                  />
                  <InputLabel sx={{ color: "#666", fontSize: 18, mb: 1 }}>
                    Username
                  </InputLabel>
                  <OutlinedInput
                    name="username"
                    sx={{ fontSize: 24, textTransform: "capitalize", mb: 2 }}
                    defaultValue={profile.username}
                    onChange={handleChange}
                    fullWidth
                  />
                  <InputLabel sx={{ color: "#666", fontSize: 18, mb: 1 }}>
                    Email
                  </InputLabel>
                  <OutlinedInput
                    name="email"
                    sx={{ fontSize: 24, textTransform: "capitalize", mb: 2 }}
                    defaultValue={profile.email}
                    fullWidth
                    disabled
                  />
                  <Button
                    type="sumbit"
                    variant="contained"
                    fullWidth
                    disabled={
                      updateForm.firstname ||
                      updateForm.lastname ||
                      updateForm.user
                        ? false
                        : true
                    }
                  >
                    update
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
