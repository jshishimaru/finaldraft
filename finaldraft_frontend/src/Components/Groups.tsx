import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getGroups, getGroupMembers } from "../apiservice";

interface GroupProps {
  name: string;
  id: number;
  expanded: boolean;
  handleExpand: (id: number) => void;
}

interface MemberProps {
  username: string;
}

const GroupCard: React.FC<GroupProps> = ({ name, id, expanded, handleExpand }) => {
  const [members, setMembers] = useState<MemberProps[]>([]);

  useEffect(() => {
    if (expanded) {
      const fetchMembers = async () => {
        const fetchedMembers = await getGroupMembers(id);
        setMembers(fetchedMembers);
      };
      fetchMembers();
    }
  }, [expanded, id]);

  return (
    <Accordion expanded={expanded} onChange={()=>handleExpand(id)} square={true} sx={{bgcolor:"#31363F" ,color:"#EEEEEE",borderRadius:"30px" , width:"900px" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:"#EEEEEE"}}/>}>
        <Typography sx={{fontSize:24 , p:1 , fontWeight:"bold",color:"#6FB7EE"}}>
			{name}
		</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List >
          {members.map((member, index) => (
            <ListItem key={index}> 
              <Typography>{member.username}</Typography>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<GroupProps[]>([]);
  const [expandedGroupId, setExpandedGroupId] = useState<number | null>(null);

   const handleExpand = (id: number) => {
    setExpandedGroupId(expandedGroupId === id ? null : id);
   };

  useEffect(() => {
    const fetchGroups = async () => {
      const fetchedGroups = await getGroups();
      setGroups(fetchedGroups);
    };
    fetchGroups();
  }, []);

  return (
    <Box sx={{display:"flex" , flexWrap:"wrap" , justifyContent:"space-around" , gap:"30px" }}>
      {groups.map((group) => (
        <GroupCard key={group.id} name={group.name} id={group.id} expanded={expandedGroupId===group.id} handleExpand={handleExpand} />
      ))}
    </Box>
  );
};

export default Groups;