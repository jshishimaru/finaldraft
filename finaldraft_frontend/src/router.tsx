import { createBrowserRouter } from 'react-router-dom'
import LoginForm from './pages/LoginPage'
import SignUpForm from './pages/SignUpPage'
import Assignments from './Components/Assignments';
import Dashboard from './Components/Dashboard';
import Groups from './Components/Groups';
import Notifications from './Components/Notifications';
import AssignmentDetails from './Components/AssignmentDetails';
import CreateAssignment from './Components/CreateAssignment';
import AssignmentMembers from './Components/AssignmentMembers';
import Submissions from './Components/Submissions';
import SubmitAssignment from './Components/SubmitAssignment';
// import Assignments from './Components/Assignments'

const router = createBrowserRouter([
	
	{
		path: '/',
		element: <LoginForm />
	},
	{
		path: '/signup',
		element: <SignUpForm />
	},
	{
		path: '/homepage',
		element: <Dashboard />
	},
   {
	    path: '/homepage',
	    element: <Dashboard />,
	    children: [
	      { index: true, element: <Assignments /> }, // Default to Home on /homepage
	      { path: 'assignments', element: <Assignments /> },
	      { path: 'groups', element: <Groups /> },
		  { path : 'notifications', element: <Notifications /> },
		  { path : 'assignments/:assignment_id', element: <AssignmentDetails /> },
		  { path : 'assignments/create', element: <CreateAssignment /> },
		  { path : 'assignments/members/:assignment_id/', element: <AssignmentMembers /> },
		  { path : 'assignments/submissions/:assignment_id', element: <Submissions /> },
		  { path : 'assignments/submit/:assignment_id', element: <SubmitAssignment /> },
	    ]
 	},

]);

export default router;
