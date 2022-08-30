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
  Tooltip,
} from "@mui/material";
import { getGoals, deleteGoal, resetGoal } from "../features/goals/goalSlice";
import { getProfile, logout } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  AddCircle,
  AddOutlined,
  DeleteOutline,
  DriveFileRenameOutline,
  EditOutlined,
} from "@mui/icons-material";

import { blueGrey, grey } from "@mui/material/colors";

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
    dispatch(resetGoal());
    if (!localStorage.getItem("token") || !user) {
      dispatch(logout());
      return navigate("/login");
    }

    dispatch(getGoals());
    dispatch(getProfile());
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
        variant="h4"
        sx={{
          textTransform: "capitalize",
          color: grey[600],
          mb: 4,
        }}
      >
        Welcome Back, {profile?.username}!
      </Typography>

      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        <Grid item xs={12} sm={12} md={6}>
          <Card sx={{ height: "100%", bgcolor: blueGrey[100] }} elevation={0}>
            <CardHeader title="Goals" sx={{ color: grey[600], fontSize: 18 }} />
            <CardContent>
              <List>
                {goals && goals.length ? (
                  goals.map((goal) => (
                    <ListItem
                      button
                      key={goal._id}
                      sx={{ mb: 2 }}
                      component={RouterLink}
                      to={`/goal/${goal._id}`}
                    >
                      <Stack direction="column" spacing={1}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: grey[600],
                            fontSize: 18,
                            mb: 2,
                          }}
                        >
                          {capitalize(goal.goal)}
                        </Typography>

                        <Stack
                          direction="rows"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: "right",
                              alignSelf: "flex-start",
                              fontSize: 10,
                              fontWeight: 500,
                              color: "#555",
                            }}
                          >
                            {new Date(goal.createdAt).toLocaleString("en-us")}
                          </Typography>
                          <Stack direction={"row"}>
                            <Tooltip title="Edit" arrow>
                              <IconButton
                                component={RouterLink}
                                to={`/goal/edit/${goal._id}`}
                              >
                                <EditOutlined color="primary" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                              <IconButton
                                onClick={() => handleDeleteGoal(goal._id)}
                              >
                                <DeleteOutline color="warning" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Stack>
                      </Stack>
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
                    <Tooltip title="Add new goal" arrow>
                      <IconButton
                        color="primary"
                        sx={{ ml: 4 }}
                        component={RouterLink}
                        to="/goal/add"
                      >
                        <AddCircle />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                )}
              </List>
            </CardContent>
            {goals && goals.length > 0 && (
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  sx={{ mr: 4 }}
                  component={RouterLink}
                  to="/goal/add"
                  variant="outlined"
                  startIcon={<AddOutlined />}
                >
                  Add more
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} sx={{ justifyContent: "center" }}>
          <Card sx={{ bgcolor: grey[300] }} elevation={0}>
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
                    <Tooltip title="Edit profile" placement="right" arrow>
                      <IconButton component={RouterLink} to="/profile/edit">
                        <DriveFileRenameOutline color="primary" />
                      </IconButton>
                    </Tooltip>
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
