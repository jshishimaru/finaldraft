import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../apiservice';
import Button from '@mui/material/Button';
import { Container , Box , TextField , Typography, Divider } from '@mui/material';

function LoginForm() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Submitting')
		try{

			const data = await login(username, password);
			console.log(data);

		}
		catch(error){
			console.error('Error logging in:', error);
		}
	
	}
	const navigate = useNavigate();
	
    const handleSignUpClick = () => {
        navigate('/signup');
    };

	return (
	
	<Container sx={{height:"100vh", p:4 , my:-10 , color:"secondary.main" , display:"flex" , alignItems:"center" , justifyContent:"center"}} >
	<Box sx = {{display:"flex", flexDirection:"column" , width:"500px" , height:"550px" , gap:"21px" , alignItems:"center"}}>
	
	<Typography
	sx={{
		fontSize:"76px",
		fontWeight:"fontWeightExtraLight",
		color:"primary.main",
		py:3,
	}}
	variant="h1">
	FINALDRAFT
	</Typography>

	<form className='login-form'  onSubmit={handleSubmit}>
			<Box sx={{display:"flex" , flexDirection:"column" , gap:"21px" , alignItems:"center" }}>
			
			<TextField
			sx={{
				backgroundColor: '#31363F',
                '& .MuiInputLabel-root': { // label text
                    color: '#929292',
					fontSize:"28px",
                },
	            '& .MuiOutlinedInput-root': {
	                '& fieldset': {
	                    border: 'none', // Disable the outline
	            	},
				},
				'& input':{ //input text
					color: "#EEEEEE",
					fontSize:20, 
				},
				borderRadius:'10px',
				width:'448px',
				height:'81px',
				py:2,
			}}
			variant='outlined' 
			name="username" 
			label="Username" 
			value={username}
			onChange={(e)=>setUsername(e.target.value)}
			/>

			<TextField
			sx={{
				backgroundColor: '#31363F',
                '& .MuiInputLabel-root': {
                    color: '#929292',
					fontSize:"28px", // Label text color
                },
	            '& .MuiOutlinedInput-root': {
	                '& fieldset': {
	                    border: 'none', // Disable the outline
	            	},
				},
				'& input':{
					color: "#EEEEEE",
					fontSize:"28px", // Input text
				},
				borderRadius:'10px',
				width:'448px',
				height:'81px',
				py:2,
			}} 
			variant='outlined' 
			type="password" 
			name="password" 
			label="Password" 
			value={password} 
			onChange={(e)=>setPassword(e.target.value)}
			/>

		<Button 
		variant="outlined" 
		sx={{
			borderRadius:"50px",
			width:"448px",
			height:"77px",
			fontSize:32,
			color:"#EEEEEE",
			bgcolor:"#31363F",
			border:"3px solid #6FB7EE",
		}} 
		name="submit" 
		type="submit">
		Sign In
		</Button> 

		<Divider
			style={{width:"100%"}} 
			sx={{
			color:"#8D8D8D",
		    "&::before, &::after": {
		      borderColor: "#8D8D8D",
		    }, 
			fontSize:24,
		}}>
		Sign in with
		</Divider>

		</Box>
	</form>
	<Box sx={{display:'flex',justifyContent:'space-between' , width:'425px' , height:'80px'}}>

	<Button 
	sx={{
		width:"200px",
		height:"80px",
		borderRadius:"50px",
		fontSize:32,
		color:"#EEEEEE",
		bgcolor:"#2285D0",
	}}
	variant="contained"
	name='Channeli'>
	Channel-i
	</Button>
	<Button 
	sx={{
		width:"200px",
		height:"80px",
		borderRadius:"50px",
		fontSize:32,
		bgcolor:"#EEEEEE",
		fontWeight:600,
	}}
	variant="contained" 
	name='Google'>
	Google
	</Button>

	</Box>
	<Typography onClick={handleSignUpClick} sx={{textDecoration:'underline', p:2 , color:"#EEEEEE" , alignSelf:"flex-end" , fontSize:28}}>Create a new account</Typography>
	</Box>
	</Container>
);
}

export default LoginForm;