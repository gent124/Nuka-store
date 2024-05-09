import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const defaultTheme = createTheme();

// eslint-disable-next-line react/prop-types
export default function SignInSide({ onSignIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
  
    if (!email) {
      setError("Please enter correct username.");
      return;
    }
  
    if (!password || password.length < 6) {
      setError("Please enter a valid password.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3000/auth", {
        email,
        password,
      });
  
      if (response.status === 201) {
        localStorage.setItem("accessToken", response.data.accessToken);
        onSignIn(); 
        navigate("/inventory");
      } else {
        setError("Wrong username or password");
      }
    } catch (error) {
      setError("Wrong username or password");
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" style={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            backgroundImage: "url(/assets/171468038277884545608818.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            style={{
              margin: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20vh", // Adjust marginTop to move the box lower
            }}
          >
            <Avatar
              style={{ margin: "8px", backgroundColor: "secondary.main" }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              style={{ marginTop: "8px" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ marginTop: "24px", marginBottom: "16px" }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item></Grid>
              </Grid>
              <Typography variant="body2" color="textSecondary" align="center">
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
