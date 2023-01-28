import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import { useEffect, useCallback } from 'react';
=======
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> 9a3492271e79260806f17193f67c9fea29405d3f
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import {
  makeUser,
  signInUser,
  signOutUser,
  getUserId,
  userLoggedIn,
} from "./firebase/account"
import { getOwnProfile, getOtherProfile, setProfile } from './firebase/database.js';



function App() {
  return (
    <div className="App">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
