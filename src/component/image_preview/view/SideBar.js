import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import React from "react";

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  marginRight: 0,
  width: 'calc(100vw - 240px)',
  height: '100vh',
  overflow: 'hidden'
}));

function SideBar({ children, drawerChildren }) {
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="right"
        open={true}
      >
        {drawerChildren}
      </Drawer>
      <Main>
        {children}
      </Main>
    </>
  );
}

export default SideBar;
