import { AppBar, Toolbar, Typography, List, ListItem, ListItemText, CssBaseline, Box } from '@mui/material';
import { Link,  } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

const Dashboard = () => {

  const drawer = (
    <div>
      <Toolbar />
      <List
	  	sx={{
		    '& .MuiListItem-root': {
		      color: '#EEEEEE',
			//   fontSize:32,
		    },
	    }}
	  >
        <ListItem  component={Link} to="/homepage/assignments">
          <ListItemText primary="Assignments" />
        </ListItem>
        <ListItem  component={Link} to="/homepage/groups">
          <ListItemText primary="Groups" />
        </ListItem>
		<ListItem  component={Link} to="/homepage/notifications">
		  <ListItemText primary="Notifications" />
		</ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display:"flex", 
			// border:"solid 1px yellow" 
		}}>
		<CssBaseline />

		<AppBar position="fixed" 
		sx={{ 
			color:"#EEEEEE",
			bgcolor: '#222831',
			borderBottom: "1px solid #676767",
			zIndex: (theme) => theme.zIndex.drawer + 1,
		}}>
		<Toolbar>
		  <Typography variant="h6" noWrap>
		    FinalDraft
		  </Typography>
		</Toolbar>
		</AppBar>

	    <Box 
	      sx={{
			// border:"solid 1px green",
	        width: drawerWidth,
			height:"100vh",
	        flexShrink: 0,
			borderRight: "1px solid #676767",
	        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' , boxShadow:"none",  },
	      }}
	    >
	      {drawer}
	    </Box>

		<Box
		    component="main"
		    sx={{
				flexGrow: 1,
				p:3,
				// border:"solid 1px red", 
				bgcolor: 'background.default', 
				// marginLeft: drawerWidth, 
				// marginTop:"64px" 
			}}>
		    <Toolbar />
			<Outlet />
		</Box>

    </Box>
  );
};

export default Dashboard;
