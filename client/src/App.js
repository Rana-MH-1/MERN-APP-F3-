import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import NavBarr from './Components/NavBarr';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './Pages/Posts';
import Spinner from './Components/Spinner';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <Router>
      <NavBarr/>
      <Spinner/>
      <Routes>
        <Route index element={<Register/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
        <Route path='/posts' element={<Posts/>} />


      </Routes>
    </Router>
    
  );
}

export default App;
