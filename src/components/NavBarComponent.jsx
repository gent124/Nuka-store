import {  Logout } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function NavBarComponent({  onLogout }) {
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  // handleNotificationClicked
  const open = Boolean(anchorEl);
  const notificationOpen = Boolean(notificationAnchorEl);
  const navigate = useNavigate();
  const handleAvatarClicked = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    console.log('po ih ituq')
    localStorage.removeItem("accessToken");
    navigate("/");

    onLogout();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const notificationHandleClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <Paper elevation={4}>
          <AppBar sx={{ padding: 2 }} position="static">
            <Container maxWidth="xxl">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="a"
                  sx={{
                    mx: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Nuka TEX
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                >
                  <IconButton color="inherit"></IconButton>
                  <Menu
                    open={notificationOpen}
                    anchorEl={notificationAnchorEl}
                    onClick={notificationHandleClose}
                    onClose={notificationHandleClose}
                  >
                    <MenuItem>Notification number 1 </MenuItem>
                    <Divider />
                    <MenuItem>Notification number 2</MenuItem>
                    <MenuItem>Notification number 3</MenuItem>
                  </Menu>
                  <IconButton
                    onClick={handleAvatarClicked}
                    size="small"
                    sx={{ mx: 2 }}
                    aria-haspopup="true"
                  >
                    <Tooltip title="account settings">
                      <Avatar sx={{ width: 32, height: 32 }}>N</Avatar>
                    </Tooltip>
                  </IconButton>
                  <Typography fontFamily={"Inter"}>Nuka Tex</Typography>
                </Box>

                <Menu
                  open={open}
                  anchorEl={anchorEl}
                  onClick={handleClose}
                  onClose={handleClose}
                >
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="medium"  />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Container>
          </AppBar>
        </Paper>
      </Grid>
    </Grid>
  );
}

{
  /* <Grid item md={7}>
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      width: "50%",
                      mx: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search "
                      inputProps={{ "aria-label": "search" }}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <Search />
                    </IconButton>
                  </Paper>
                </Grid> */
}


