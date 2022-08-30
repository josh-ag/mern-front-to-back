import {
  Grid,
  IconButton,
  Paper,
  Typography,
  Stack,
  Button,
  Tooltip,
  Container,
} from "@mui/material";
import { getGoal } from "../features/goals/goalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { grey } from "@mui/material/colors";
import {
  ArrowBackOutlined,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import { deleteGoal } from "../features/goals/goalSlice";

export const GoalDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { goal, isLoading, isError, error } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    dispatch(getGoal(id));
  }, [id, dispatch]);

  const handleDeleteGoal = () => {
    dispatch(deleteGoal(goal?._id));

    return navigate(-1);
  };

  if (isLoading) {
    return <Typography variant="h5">Loading...</Typography>;
  }
  if (isError || error) {
    return <Typography variant="h5">Oops! Something went wrong</Typography>;
  }
  return (
    <Container>
      <Grid container sx={{ mx: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Button
            startIcon={<ArrowBackOutlined />}
            sx={{ my: 2 }}
            onClick={() => navigate(-1)}
          >
            back
          </Button>

          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ color: grey[700] }}>
              {goal?.goal
                .split(" ")
                .map((it) => it.substr(0, 1).toUpperCase() + it.substr(1))
                .join(" ")}
            </Typography>

            <Typography variant="caption" sx={{ color: grey[600] }}>
              {new Date(goal?.updatedAt).toLocaleString("en-us")}
            </Typography>

            <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
              <Tooltip title="Edit" arrow>
                <IconButton
                  color="primary"
                  component={RouterLink}
                  to={`/goal/edit/${goal?._id}`}
                >
                  <EditOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <IconButton color="warning" onClick={handleDeleteGoal}>
                  <DeleteOutline />
                </IconButton>
              </Tooltip>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
