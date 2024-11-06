import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSubmissions, getUsernames, getAssignmentDetails } from '../apiservice';
import dayjs from 'dayjs';
import { Box, Typography, Card, CardContent } from '@mui/material';

interface SubmissionCard{

	reviewee: number[];
	date: string;
	id: string;

}

export default function Submissions(){

	const [submissions, setSubmissions] = useState<SubmissionCard[]>([]);
	const [deadline, setDeadline] = useState<string>('');
	const { assignment_id } = useParams<{ assignment_id: string }>();
    const [usernames, setUsernames] = useState<{ [key: number]: string }>({});
  
  useEffect(() => {
    const fetchData = async () => {
      if (assignment_id) {
        const assignment = await getAssignmentDetails(assignment_id);
        setDeadline(assignment.deadline);

        const submissionsData = await getSubmissions(Number(assignment_id));
        setSubmissions(submissionsData);

		const userIds: number[] = submissionsData.flatMap((submission: { reviewee: number[] }) => submission.reviewee);
		const usernamesData = await getUsernames(userIds);
        const usernamesMap = usernamesData.reduce((acc: { [key: number]: string }, user: { id: number, username: string }) => {
          acc[user.id] = user.username;
          return acc;
        }, {});
        setUsernames(usernamesMap);
      } else {
        console.error('Assignment ID is undefined');
      }
    };

    fetchData();
  }, [assignment_id]);

	const calculateLateStatus = (submissionDate: string) => {
    const submissionDayjs = dayjs(submissionDate);
    const deadlineDayjs = dayjs(deadline);
    const diff = submissionDayjs.diff(deadlineDayjs, 'hour');
    if (diff <= 0) {
      return 'On time';
    } else {
      const daysLate = Math.floor(diff / 24);
      const hoursLate = diff % 24;
      return `Late by ${daysLate} days and ${hoursLate} hours`;
    }
  };

  const formatReviewees = (revieweeIds: number[]) => {
    const revieweeNames = revieweeIds.map(id => usernames[id] || 'Unknown');
    const formatted = revieweeNames.join(', ');
    return formatted.length > 25 ? `${formatted.substring(0, 25)}...` : formatted;
  };

    return (
    <Box sx={{ p: 2 , display:"flex" , flexDirection:"column" , alignItems:"center" , flexWrap:"wrap" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{fontWeight:"bold" , color:"primary.main"}}>
        Submissions
      </Typography>
	  <Box sx={{display:"flex" , width:"1000px" , justifyContent:"center" , flexWrap:'wrap' , gap:"20px" , pt:5 }}>
      {submissions.map((submission) => (
        <Card key={submission.id} sx={{ mb: 2, bgcolor: '#31363F', color: '#EEEEEE' , width:"400px" , borderRadius:6, pt:1, }}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {formatReviewees(submission.reviewee)}
            </Typography>
            <Typography variant="body2" component="p" sx={{color:"primary.main" , pt:1,}}>
              Status: {calculateLateStatus(submission.date)}
            </Typography>
          </CardContent>
        </Card>
      ))}
	  </Box>
    </Box>
  );
};




