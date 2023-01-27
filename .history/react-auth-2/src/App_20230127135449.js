import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, loginWithRedirect} = useAuth0();
  return (
    <div className="App">
      <BrowserRouter >
        <Nav />
        <main className="form-signin">
          <Routes>
            {
              !isAuthenticated ? <Route exact path='/' element={<Home />} /> : loginWithRedirect()
            }
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/personal_posts' element={<PersonalBlog />} />
            <Route path='/all_users' element={<AllUsers />} />
            <Route path='/all_users/:id' element={<UserDetail />} />
            <Route path='/allpost/:id' element={<BlogDetail />} />
            <Route path='/create_post' element={<CreateBlog />} />
            <Route path='/edit_post/:id' element={<EditPost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
