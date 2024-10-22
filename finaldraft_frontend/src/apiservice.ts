import axios from 'axios';
import qs from 'qs';

const API_URL = 'http://127.0.0.1:8000/';

export const login = async (username:string, password:string) => {
  try {
	const data = qs.stringify({username, password});
    const response = await axios.post(`${API_URL}auth/`, data , {
	  headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	  },
	});
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signup = async (username:string, password:string, email:string, first_name:string, last_name:string) => {

	try {
	const data = qs.stringify({username, password, email, first_name, last_name});
	const response = await axios.post(`${API_URL}auth/signup/`, data , {
			  headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	  },
	});
	const return_data = {
		'username': response.data.username,
		'email':  response.data.email,
		'first_name':  response.data.first_name,
		'last_name':  response.data.last_name,
	}
	return return_data;
    }
	catch (error) {
		console.error('Error signing up:', error);
		throw error;
	}	
};

