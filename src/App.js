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
  useEffect(() => {
    //readMessageWrapper().catch(console.error);
    //listDoctorsWrapper().catch(console.error);
    initializeConversationWrapper().catch(console.error);
  }, []);

  /*const sendMessageWrapper = useCallback(async () => {
    const result = await sendMessage("AkmjawMPhromoxvrYotk", "This is a message that will put the doctor on read!", "AcSrklYLblMreR5HgwZOj66KJoz1");
    console.log(result);
  });

  const readMessageWrapper = useCallback(async () => {
    const result = await markRead("zcshUaxclcxWvd9XhlDE", "QzLltZTPMghitfupPlqXf8SXatY2");
    console.log(result);
  })

  const listDoctorsWrapper = useCallback(async () => {
    const result = await listDoctors();
    console.log(result);
  })*/

  const initializeConversationWrapper = useCallback(async () => {
    const signedIn = await signInUser('jaredvel25@gmail.com', 'password123');
    if (signedIn) {
      const result = await initializeConversation('hXKupLQTDndGIK917LW4NYfZJjT2');
      console.log(result);
    } else {
      console.log('User not signed in!');
    }
  })

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
