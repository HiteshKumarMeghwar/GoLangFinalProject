import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'
// import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalBlog from './pages/PersonalBlog';
import AllUsers from './pages/AllUsers';
import CreateBlog from './pages/CreateBlog';
import BlogDetail from './pages/BlogDetail';
import UserDetail from './pages/UserDetail';
import EditPost from './pages/EditPost';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import EditUser from './pages/EditUser';
import ContactUs from './pages/ContactUs';

function App() {
  const [userData, setUserData] = useState();
  // const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem("user");
    /* if(!User){
      navigate("/login");
    } */
    const parseUser = JSON.parse(User);
    setUserData(parseUser);
  }, [setUserData]);

  return (
    <div className="App">
      <BrowserRouter >
        <Nav/>
        <main className="form-signin">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/profile' element={<UserProfile />} />
            <Route exact path='/edit_profile/:id' element={<EditProfile />} />
            <Route exact path='/edit_user/:id' element={<EditUser />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/contact_form' element={<ContactUs />} />
            <Route exact path='/personal_posts' element={<PersonalBlog />} />
            <Route exact path='/all_users' element={<AllUsers />} />
            <Route exact path='/all_users/:id' element={<UserDetail />} />
            <Route exact path='/allpost/:id' element={<BlogDetail />} />
            <Route exact path='/create_post' element={<CreateBlog />} />
            <Route exact path='/edit_post/:id' element={<EditPost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
