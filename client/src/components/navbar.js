import { AppBar, Button, Toolbar, Stack, Link, Container } from "@mui/material";
import {
  AddCircle,
  AppRegistration,
  DashboardCustomizeOutlined,
  Login,
  LoginOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/auth/authSlice";

export const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle logout func
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            to="/"
            component={RouterLink}
            sx={{ textDecoration: "none", color: "#eaeaea", fontSize: 32 }}
          >
            Goal~Setter
          </Link>
          <Stack direction="row" spacing={2}>
            {user ? (
              <>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/goal/add"
                  sx={{ color: "#ddd" }}
                  startIcon={<AddCircle />}
                >
                  new goal
                </Button>
                <Button
                  component={RouterLink}
                  to="/dashboard"
                  variant="contained"
                  startIcon={<DashboardCustomizeOutlined />}
                >
                  Dashboard
                </Button>
                <Button
                  color="warning"
                  onClick={handleLogout}
                  variant="contained"
                  startIcon={<LogoutOutlined />}
                >
                  logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  // variant="outlined"
                  sx={{ color: "orange" }}
                  component={RouterLink}
                  to="/login"
                  startIcon={<Login />}
                >
                  login
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "lightgreen" }}
                  component={RouterLink}
                  to="/register"
                  startIcon={<AppRegistration />}
                >
                  Register
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
