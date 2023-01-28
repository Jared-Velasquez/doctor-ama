import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import NotFound from './pages/NotFound/NotFound';
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
          <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
