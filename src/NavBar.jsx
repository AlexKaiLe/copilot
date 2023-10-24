import React, {useState} from "react";
import {AppBar, Toolbar, Tab, Tabs, Typography} from '@mui/material';
  

const NavBar = () => {
    const [tabValue, setTabValue] = useState(0);

    const tabChange = (event, newTab) => {
      setTabValue(newTab);
    }

    return (
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" style={{ padding: '16px' }}>
              Copilot.Bio
            </Typography>
            <Tabs
              value={tabValue}
              onChange={tabChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth">
              <Tab label="Database" />
              <Tab label="Copilot" />
              <Tab label="News" />
              <Tab label="Network" />
            </Tabs>
          </Toolbar>
        </AppBar>
    )
}

export default NavBar;
