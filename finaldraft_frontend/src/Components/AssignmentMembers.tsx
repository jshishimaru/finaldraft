import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMemberStatus } from '../apiservice';
import { Box, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import pending from '../assets/icons/pending.png'
import in_iteration from '../assets/icons/in_iteration.png'
import completed from "../assets/icons/completed.png"

interface Member {
  username: string;
  status: string;
}

function Icon ({ status }: { status: string }) {

	return(
    <img src = {status === 'completed' 
      ? completed 
      : status === 'in_iteration' 
      ? in_iteration 
      : pending
        } 
      alt = {status}
      style={{width: '40px', height: '40px'}}
    ></img>
	)

}

const AssignmentMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const { assignment_id } = useParams<{ assignment_id: string }>();

  useEffect(() => {
	if (assignment_id) {
    getMemberStatus(Number(assignment_id)).then((data) => setMembers(data));
	} else {
	  console.error("Assignment ID is undefined");
	}
  }, [assignment_id]);

    return (
    <Box sx={{ p: 2  , color:"#EEEEEE" , display:"flex"  , flexDirection:"column" , alignItems:"center" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{color:"#6FB7EE" , fontWeight:"bold" }}>
        Assignment Members 
      </Typography>
      <List sx={{display:"flex" , flexWrap:"wrap" , gap:"20px" , pt:6 , justifyContent:"center" }}>
        {members.map((member, index) => (
          <ListItem key={index} sx={{borderRadius:10 , bgcolor:"#31363F" , width:"400px" , height:"100px"}}>
            <ListItemText primary={member.username} 
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: 24, // font size for primary text
                  color: '#EEEEEE',
                },
				p:2,
                // '& .MuiListItemText-secondary': {
                //   fontSize: '0.9rem', // font size for secondary text
                //   color: '#B1B1B1',
                // },
              }}
			/>
			<ListItemIcon>
              <Icon status={member.status} />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );

};

export default AssignmentMembers;