import {
  Box,
  Grid,
  Container,
  TextField,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createGoal } from "../features/goals/goalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export const AddGoal = () => {
  const [goalData, setGoalData] = useState("");

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitGoal = (e) => {
    //prevent default
    e.preventDefault();
    const isGoalData = { goal: goalData };
    //do something
    dispatch(createGoal(isGoalData));

    //reset internal state
    setGoalData("");
  };

  useEffect(() => {
    if (!user || !localStorage.getItem("token")) {
      navigate("/login");
      dispatch(logout());
    }
  }, [navigate, user, dispatch]);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography
              variant="h5"
              sx={{ color: "#666", fontSize: 29, textAlign: "center", mb: 2 }}
            >
              Start writing your goals
            </Typography>
            <Box
              component="form"
              autoComplete="off"
              noValidate
              onSubmit={handleSubmitGoal}
            >
              <TextField
                onChange={(e) => setGoalData(e.target.value)}
                name="goal"
                value={goalData}
                placeholder="Write your goal"
                label="Write Goal"
                rows={6}
                fullWidth
                multiline
              />
              <Button
                variant="contained"
                type="sumbit"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
