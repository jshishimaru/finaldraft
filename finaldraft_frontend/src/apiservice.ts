import axios from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000/';
const APP_API_URL = 'http://127.0.0.1:8000/finaldraft/';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
export const login = async (username:string, password:string) => {
  try {
	const data = qs.stringify({username, password});
    const response = await axios.post(`${API_URL}auth/login/`, data , {
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

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
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


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export const getAssignments = async () => {
	const csrfCookie = Cookies.get('csrftoken');

	try {
	const response = await axios.get(`${APP_API_URL}users/assignments/`, {
		withCredentials: true,
	    headers: {
			'X-CSRFToken': csrfCookie,
	        'Content-Type': 'application/json',
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Referrer-Policy': 'same-origin',
			'ALLOW':'GET , HEAD ,OPTIONS',
	    }	
	}) ;
	return response.data;
  } catch (error) {
	console.error('Error getting assignments:', error);
	throw error;
  }
}

export const getAssignmentDetails = async (assignmentId: string) => {
  const csrfCookie = Cookies.get('csrftoken');

  try {
    const response = await axios.get(`${APP_API_URL}assignment/` ,{
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrfCookie,
        'Content-Type': 'application/json',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Referrer-Policy': 'same-origin',
        'ALLOW': 'GET , HEAD ,OPTIONS',
      },
	  params: {
		 assignment_id: assignmentId,
	  }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting assignment details:', error);
    throw error;
  }
};

export const getSubtasks = async (assignmentId: string) => {
  const csrfCookie = Cookies.get('csrftoken');

  try {
	const response = await axios.get(`${APP_API_URL}assignment/subtasks/`, {
	  withCredentials: true,
	  headers: {
		'X-CSRFToken': csrfCookie,
		'Content-Type': 'application/json',
		'Cross-Origin-Opener-Policy': 'same-origin',
		'Referrer-Policy': 'same-origin',
		'ALLOW': 'GET , HEAD ,OPTIONS',
	  },
	  params: {
		assignment_id: assignmentId,
	  }
	});
	return response.data;
  } catch (error) {
	console.error('Error getting subtasks:', error);
	throw error;
  }
}

export const getAttachments = async (assignmentId: string) => {

	  const csrfCookie = Cookies.get('csrftoken');

	  try {
		const response = await axios.get(`${APP_API_URL}assignment/attachments/`, {
		  withCredentials: true,
		  headers: {
			'X-CSRFToken': csrfCookie,
			'Content-Type': 'application/json',
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Referrer-Policy': 'same-origin',
			'ALLOW': 'GET , HEAD ,OPTIONS',
		  },
		  params: {
			assignment_id: assignmentId,
		  }
		});
		return response.data;
	  } catch (error) {
		console.error('Error getting attachments:', error);
		throw error;
	  }

}

export const getGroups = async () => {
	const csrfCookie = Cookies.get('csrftoken');

	try {
	const response = await axios.get(`${APP_API_URL}users/groups/`, {
		withCredentials: true,
	    headers: {
			'X-CSRFToken': csrfCookie,
	        'Content-Type': 'application/json',
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Referrer-Policy': 'same-origin',
			'ALLOW':'GET , HEAD ,OPTIONS',
	    }	
	}) ;
	return response.data;
  } catch (error) {
	console.error('Error getting groups:', error);
	throw error;
  }
}

export const getGroupMembers = async (groupId: number) => {
	const csrfCookie = Cookies.get('csrftoken');

	try {
	const response = await axios.get(`${APP_API_URL}group/members/`, {
		withCredentials: true,
	    headers: {
			'X-CSRFToken': csrfCookie,
	        'Content-Type': 'application/json',
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Referrer-Policy': 'same-origin',
			'ALLOW':'GET , HEAD ,OPTIONS',
	    },
		params: {
			group_id: groupId,
		}	
	}) ;
	return response.data;
  } catch (error) {
	console.error('Error getting group members:', error);
	throw error;
  }
}

export const getSelfProfile = async () => {
	const csrfCookie = Cookies.get('csrftoken');

	try {
	const response = await axios.get(`${APP_API_URL}user/profile/self/`, {
		withCredentials: true,
	    headers: {
			'X-CSRFToken': csrfCookie,
	        'Content-Type': 'application/json',
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Referrer-Policy': 'same-origin',
			'ALLOW':'GET , HEAD ,OPTIONS',
	    }	
	}) ;
	return response.data;
  } catch (error) {
	console.error('Error getting self profile:', error);
	throw error;
  }
}

export const getAllReviewees = async () => {
	const csrfCookie = Cookies.get('csrftoken');

	try {
		const response = await axios.get(`${APP_API_URL}users/reviewees/`, {
			withCredentials: true,
			headers: {
				'X-CSRFToken': csrfCookie,
				'Content-Type': 'application/json',
				'Cross-Origin-Opener-Policy': 'same-origin',
				'Referrer-Policy': 'same-origin',
				'ALLOW':'GET , HEAD ,OPTIONS',
			}
		}) ;
		return response.data;
	} catch (error) {
		console.error('Error getting reviewees:', error);
		throw error;
	}
}

export const getAllReviewers = async () => {
	const csrfCookie = Cookies.get('csrftoken');

	try {
		const response = await axios.get(`${APP_API_URL}users/reviewers/`, {
			withCredentials: true,
			headers: {
				'X-CSRFToken': csrfCookie,
				'Content-Type': 'application/json',
				'Cross-Origin-Opener-Policy': 'same-origin',
				'Referrer-Policy': 'same-origin',
				'ALLOW':'GET , HEAD ,OPTIONS',
			}
		}) ;
		return response.data;
	} catch (error) {
		console.error('Error getting reviewers:', error);
		throw error;
	}
}

export const createAssignment = async (title: string, description: string, unformatted_deadline: string, reviewee_users: number[], reviewee_groups: number[], reviewer_users: number[]) => {

	const csrfCookie = Cookies.get('csrftoken');

	try {
		const date = new Date().toISOString().split('T')[0];
		const deadline = new Date(unformatted_deadline).toISOString().split('T')[0];
	    const data = new FormData();
	    data.append('title', title);
	    data.append('description', description);
	    data.append('deadline', deadline);
	    data.append('date', date);
	    data.append('reviewee_users', JSON.stringify(reviewee_users));
	    data.append('reviewee_groups', JSON.stringify(reviewee_groups));
	    data.append('reviewer_users', JSON.stringify(reviewer_users));

		console.log(data);

		const response = await axios.post(`${APP_API_URL}assignment/` , data ,{
				withCredentials: true,
				headers: {
					'X-CSRFToken': csrfCookie,
					'Content-Type': 'application/x-www-form-urlencoded',
					'Cross-Origin-Opener-Policy': 'same-origin',
					'Referrer-Policy': 'same-origin',
					'ALLOW': 'POST , OPTIONS',
				},
		});
		return response.data;
	}
	catch (error) {
    console.error('Error creating assignment:', error);
    throw error;
    }
}

export const addSubtask = async (assignmentId: number, title: string, unformatted_deadline: string) => {

	const csrfCookie = Cookies.get('csrftoken');

	try {
		const deadline = new Date(unformatted_deadline).toISOString().split('T')[0];
		const date = new Date().toISOString().split('T')[0];
		const data = {
			assignment_id: assignmentId,
			title:title,
			deadline:deadline,
			date:date,
		}

		const response = await axios.post(`${APP_API_URL}assignment/subtasks/`, data ,{
			withCredentials: true,
			headers: {
				'X-CSRFToken': csrfCookie,
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	}
	catch (error) {
	console.error('Error creating subtask:', error);
	throw error;
	}
}

export const addAttachment = async (assignmentId: number, image: File|null , file: File|null ) => {

	const csrfCookie = Cookies.get('csrftoken');

	try {
		const data = new FormData();
		data.append('assignment_id', assignmentId.toString());
		if (image) {
			data.append('image', image);
		}
		if (file) {
			data.append('file', file);
		}

		const response = await axios.post(`${APP_API_URL}assignment/attachments/` , data ,{
			withCredentials: true,
			headers: {
				'X-CSRFToken': csrfCookie,
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	}
	catch (error) {
	console.error('Error adding attachment:', error);
	throw error;
	}
}

export const getMemberStatus = async (assignmentId: number) => {

	const csrfCookie = Cookies.get('csrftoken');

	try {
		const response = await axios.get(`${APP_API_URL}assignment/users/status/`, {
			withCredentials: true,
			headers: {
				'X-CSRFToken': csrfCookie,
				'Content-Type': 'application/json',
				'Cross-Origin-Opener-Policy': 'same-origin',
				'Referrer-Policy': 'same-origin',
				'ALLOW':'GET , HEAD ,OPTIONS',
			},
			params: {
				assignment_id: assignmentId,
			}
		});
		return response.data;
	}
	catch (error) {
		console.error('Error getting member status:', error);
		throw error;
	}
}

export const getSubmissions = async ( assignmentId : number) => {

	const csrfCookike = Cookies.get('csrftoken');
	
	try{

		const response = await axios.get(`${APP_API_URL}assignment/submissions/`, {
			withCredentials: true,
			headers: {
				'X-CSRFToken': csrfCookike,
				'Content-Type': 'application/json',
				'Cross-Origin-Opener-Policy': 'same-origin',
				'Referrer-Policy': 'same-origin',
				'ALLOW':'GET , HEAD ,OPTIONS',
			},
			params: {
				assignment_id: assignmentId,
			}
		});
		return response.data;

	}
	catch(error){
		console.error('Error getting submissions:', error);
		throw error;
	}

}

export const getUsernames = async (user_ids: number[]) => {
	const csrfCookie = Cookies.get('csrftoken');

	try {
		const response = await axios.get(`${APP_API_URL}users/usernames/`, {
			withCredentials: true,
			headers: {
				'X-CSRFToken': csrfCookie,
				'Content-Type': 'application/json',
				'Cross-Origin-Opener-Policy': 'same-origin',
				'Referrer-Policy': 'same-origin',
				'ALLOW':'GET , HEAD ,OPTIONS',
			},
			params: {
				user_ids: JSON.stringify(user_ids),
			}
		});
		console.log(JSON.stringify(user_ids))
		return response.data;
	}
	catch (error) {
		console.error('Error getting usernames:', error);
		throw error;
	}
}

export const submitAssignment = async (assignmentId: number, repoLink: string, subtask_ids: number[], remark: string, reviewee_ids: number[], reviewer_ids: number[]) => {

	const csrfCookie = Cookies.get('csrftoken');

	try {
		const data = {
			assignment_id: assignmentId,
			repo_link: repoLink,
			subtask_ids: subtask_ids,
			remark: remark,
			reviewee_ids: reviewee_ids,
			reviewer_ids: reviewer_ids,
		}

		const response = await axios.post(`${APP_API_URL}assignment/users/submissions/`, data ,{
			withCredentials: true,
			headers: {
				'X-CSRFToken': csrfCookie,
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	}
	catch (error) {
	console.error('Error submitting assignment:', error);
	throw error;
	}

}

export const addSubmissionAttachment = async (subtask_id: number, image: File|null , file: File|null ) => {

	const csrfCookie = Cookies.get('csrftoken');

	try {
		const data = new FormData();
		data.append('submission_id', subtask_id.toString());
		if (image) {
			data.append('image', image);
		}
		if (file) {
			data.append('file', file);
		}

		const response = await axios.post(`${APP_API_URL}assignment/submissions/attachments/` , data ,{
			withCredentials: true,
			headers: {
				'X-CSRFToken': csrfCookie,
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	}
	catch (error) {
	console.error('Error adding attachment:', error);
	throw error;
	}

}
