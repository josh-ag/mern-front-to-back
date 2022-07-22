import {
  Typography,
  Grid,
  Container,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  CardActions,
  CircularProgress,
  Box,
  Stack,
  IconButton,
  OutlinedInput,
  InputLabel,
  Avatar,
  Button,
} from "@mui/material";
import { getGoals, deleteGoal, resetGoal } from "../features/goals/goalSlice";
import { getProfile, logout } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddCircle,
  DeleteRounded,
  DriveFileRenameOutline,
  EditRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  //accessing store
  const { user, profile } = useSelector((state) => state.auth);
  const { goals, isLoading: goalsLoading } = useSelector(
    (state) => state.goals
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle goal del.
  const handleDeleteGoal = (id) => {
    dispatch(deleteGoal(id));
  };

  useEffect(() => {
    if (!localStorage.getItem("token") || !user) {
      dispatch(logout());
      return navigate("/login");
    }

    dispatch(getGoals());
    dispatch(getProfile());
    dispatch(resetGoal());
  }, [navigate, user, dispatch]);

  const formatText = (txt) => {
    return txt.substr(0, 1).toUpperCase() + txt.substr(1);
  };
  const capitalize = (arg) => {
    return arg
      .split(" ")
      .map((each) => each.substr(0, 1).toUpperCase() + each.substr(1))
      .join(" ");
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography
        variant="h5"
        sx={{
          textTransform: "capitalize",
          color: "#666",
          mb: 4,
        }}
      >
        Welcome Back, {profile?.username}!
      </Typography>

      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={10} md={6} sx={{ justifyContent: "center" }}>
          <Card>
            <CardHeader title="Goals" sx={{ color: "#555", fontSize: 18 }} />
            <CardContent>
              <List>
                {goals && goals.length ? (
                  goals.map((goal) => (
                    <ListItem
                      key={goal._id}
                      secondaryAction={
                        <Stack direction={"row"}>
                          <IconButton
                            component={Link}
                            to={`/goal/edit/${goal._id}`}
                          >
                            <EditRounded color="primary" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteGoal(goal._id)}
                          >
                            <DeleteRounded color="warning" />
                          </IconButton>
                        </Stack>
                      }
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#555",
                            fontSize: 18,
                            mb: 2,
                          }}
                          noWrap
                        >
                          {capitalize(goal.goal)}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            textAlign: "right",
                            alignSelf: "flex-end",
                            fontSize: 10,
                            color: "#555",
                          }}
                          noWrap
                        >
                          {new Date(goal.createdAt).toLocaleString("en-us")}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))
                ) : goalsLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ mb: 2, fontSize: 16, color: "#777" }}
                    >
                      Please wait...
                    </Typography>
                    <CircularProgress color="primary" size={20} />
                  </Box>
                ) : (
                  <ListItem
                    sx={{
                      color: "#7777",
                      fontSize: 16,
                      textTransform: "capitalize",
                      mr: 2,
                    }}
                  >
                    You have no goal yet!
                    <IconButton
                      color="primary"
                      sx={{ ml: 4 }}
                      component={Link}
                      to="/goal/add"
                    >
                      <AddCircle />
                    </IconButton>
                  </ListItem>
                )}
              </List>
            </CardContent>
            {goals && goals.length > 0 && (
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button sx={{ mr: 4 }} component={Link} to="/goal/add">
                  Add more
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} sm={10} md={6} sx={{ justifyContent: "center" }}>
          <Card>
            <CardHeader title="Profile" sx={{ color: "#666", fontSize: 24 }} />
            <CardContent>
              {profile && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 75,
                        height: 75,
                        mb: 4,
                        color: "lightpink",
                        bgcolor: "purple",
                        alignSelf: "center",
                      }}
                    >
                      {profile.username.substr(0, 1).toUpperCase()}
                    </Avatar>
                    <IconButton component={Link} to="/profile/edit">
                      <DriveFileRenameOutline color="primary" />
                    </IconButton>
                  </Box>
                  <InputLabel sx={{ color: "#666", fontSize: 18, mb: 1 }}>
                    Firstname
                  </InputLabel>
                  <OutlinedInput
                    sx={{ fontSize: 24, textTransform: "capitalize", mb: 2 }}
                    value={formatText(profile.firstname)}
                    fullWidth
                    disabled
                  />
                  <InputLabel sx={{ color: "#666", fontSize: 18, mb: 1 }}>
                    Lastname
                  </InputLabel>
                  <OutlinedInput
                    sx={{ fontSize: 24, textTransform: "capitalize", mb: 2 }}
                    value={formatText(profile.lastname)}
                    fullWidth
                    disabled
                  />
                  <InputLabel sx={{ color: "#666", fontSize: 18, mb: 1 }}>
                    Username
                  </InputLabel>
                  <OutlinedInput
                    sx={{ fontSize: 24, textTransform: "capitalize", mb: 2 }}
                    value={formatText(profile.username)}
                    fullWidth
                    disabled
                  />
                  <InputLabel sx={{ color: "#666", fontSize: 18, mb: 1 }}>
                    Email
                  </InputLabel>
                  <OutlinedInput
                    sx={{ fontSize: 24, textTransform: "capitalize", mb: 2 }}
                    value={profile.email}
                    fullWidth
                    disabled
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
