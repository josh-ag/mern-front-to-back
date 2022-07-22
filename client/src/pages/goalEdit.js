import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { logout } from "../features/auth/authSlice";
import { resetGoal, getGoal, updateGoal } from "../features/goals/goalSlice";
import { useNavigate, useParams } from "react-router-dom";

export const GoalEdit = () => {
  const { goal } = useSelector((state) => state.goals);
  //internal state
  const [newGoal, setNewGoal] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle form  submission
  const handleSubmit = (e) => {
    //prevent default form behavior
    e.preventDefault();

    if (!newGoal) {
      return;
    }

    const updateData = { goal: newGoal || goal.goal, id };
    dispatch(updateGoal(updateData));

    //reset
    setNewGoal(null);
  };

  useEffect(() => {
    dispatch(resetGoal());

    const user = JSON.parse(localStorage.getItem("user"));
    if (!localStorage.getItem("token") || !user) {
      dispatch(logout());
      navigate("/login");
    }

    dispatch(getGoal(id));
  }, [id, goal, dispatch, navigate]);

  return (
    <Container sx={{ my: 4 }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} sx={{ justifyContent: "center" }}>
          <Card>
            <CardHeader
              title="Edit Goal"
              sx={{ color: "#666", fontSize: 24 }}
            />
            <CardContent>
              {goal && (
                <Box
                  component="form"
                  noValidate={true}
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    name="goal"
                    defaultValue={goal.goal}
                    label="Write Goal"
                    placeholder="Write your goal"
                    rows={6}
                    onChange={(e) => setNewGoal(e.target.value)}
                    multiline
                    fullWidth
                  />

                  <Button
                    type="sumbit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={newGoal ? false : true}
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
