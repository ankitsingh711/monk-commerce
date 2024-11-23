import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "green" }}>
      <Toolbar>
        <Typography variant="h5" sx={{ textAlign: "center", flexGrow: 1 }}>
          Monk Upsell & Cross-sell
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
