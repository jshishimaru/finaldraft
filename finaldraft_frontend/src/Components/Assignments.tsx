import React , {useEffect, useState} from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem , Box} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAssignments } from '../apiservice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { getSelfProfile } from '../apiservice';

interface AssignmentCardProps {
  title: string;
  creator: string;
  deadline: string;
  id: number;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ id , title, creator, deadline }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

   const handleDetailsClick = () => {
    navigate(`/homepage/assignments/${id}`);
    handleMenuClose();
  };

  const handleMembersClick = () => {
	navigate(`/homepage/assignments/members/${id}`);
	handleMenuClose();
  }

  const handleSubmissionsClick = () => {
	navigate(`/homepage/assignments/submissions/${id}`);
	handleMenuClose();
  }

  return (
    <Card sx={{width:"800px" , height:"130px" , borderRadius:5 , bgcolor:"#31363F"}}>
      <CardContent sx={{display:"flex", height:"100%" , flexDirection:"column" , justifyContent:"space-between" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{color:"#6FB7EE"}}>{title}</Typography>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon sx={{color:"#EEEEEE"}}/>
          </IconButton>
        </div>

		<Box sx={{display:"flex" , flexDirection:"row" , justifyContent:"space-between"}}>
        <Typography variant="body2" color="#EEEEEE">
          Created by: {creator}
        </Typography>
        <Typography variant="body2" color="#EEEEEE">
          Due: {deadline}
        </Typography>
		</Box>

      </CardContent>
      <Menu
	  	sx={{color:"#EEEEEE"}}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMembersClick}>Members</MenuItem>
        <MenuItem onClick={handleDetailsClick}>Details</MenuItem>
		<MenuItem onClick={handleSubmissionsClick}>Submissions</MenuItem>
      </Menu>
    </Card>
  );
};

function Assignments(){

	const [assignments, setAssignments] = React.useState<AssignmentCardProps[]>([]);
	const [isReviewer, setIsReviewer] = useState<boolean>(false);
	const navigate = useNavigate();

	React.useEffect(() => {
    const fetchAssignments = async () => {
      const data = await getAssignments();
      setAssignments(data);
    };
	fetchAssignments();
    }, []);

	const fetchUserProfile = async () => {
      try {
        const profile = await getSelfProfile();
        setIsReviewer(profile.is_reviewer);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

	useEffect(() => {
		fetchUserProfile();
	}, []);

	const handleAddNewClick = () => {
    	navigate("/homepage/assignments/create");
 	};


	return(
		<Box sx={{
			display:"flex",
			flexDirection:"row",
			flexWrap:"wrap",
			gap:"20px",
			// border:"5px solid blue"
			}}>
				{assignments.map((assignment) => (
					<AssignmentCard
						key={assignment.id}
						title={assignment.title}
						creator={assignment.creator}
						deadline={assignment.deadline}
						id={assignment.id}
					/>
				))}
			
			{ isReviewer && (<Button onClick = {handleAddNewClick} variant="contained" sx={{bgcolor:"#61A1D1", position:"fixed" , mx:"73%" , my:"38%" , color:"black" , fontSize:24 , borderRadius:3 , width:"200px" , height:"60px"}}>
				Add New
			</Button>
			)}

		</Box>
	)
}



export default Assignments;