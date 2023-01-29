import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration'
import {
  makeUser,
  signInUser,
  signOutUser,
  getUserId,
  userLoggedIn,
} from "./firebase/account"
import { getOwnProfile, getOtherProfile, setProfile, initializeConversation, sendMessage, loadConversation, markRead, listDoctors } from './firebase/database.js';



function App() {
  return (
    <div className="App">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
