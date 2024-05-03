import NavBarComponent from "./NavBarComponent";
import { Box, Grid } from "@mui/material";
import SideBarComponent from "./SideBarComponent";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function RootComponent({onLogout}) {
  return (
    <>
      <NavBarComponent onLogout={onLogout} />
      <Box
        sx={
          {
            // bgcolor: "#DEE3E9",
            // height: 899,
          }
        }
      >
        <Grid container spacing={0}>
          <Grid item md={2} sm={0}>
            <SideBarComponent />
          </Grid>
          <Grid item md={10}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
