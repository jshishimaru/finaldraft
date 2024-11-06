import Dashboard from '../Components/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Assignments from '../Components/Assignments';
import Groups from '../Components/Groups';
import Notifications from '../Components/Notifications';
import { BrowserRouter as Router } from 'react-router-dom';


function Homepage(){
	return(
	  <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Assignments />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="settings" element={<Groups />} />
		  <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
	  </Router>

	)
}

export default Homepage;