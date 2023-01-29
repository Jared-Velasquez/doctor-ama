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
import { getOwnProfile, getOtherProfile, setProfile, initializeConversation, sendMessage, loadConversation } from './firebase/database.js';



function App() {
  useEffect(() => {
    //initializeConversationWrapper().catch(console.error);
    //userSendMessageWrapper().catch(console.error);
    paginationWrapper().catch(console.error);
  }, [])

  const initializeConversationWrapper = useCallback(async () => {
    await signInUser('jaredvel25@gmail.com', 'password123');
    const result = await initializeConversation('QzLltZTPMghitfupPlqXf8SXatY2');
    console.log(result);
    //signOutUser();
  })

  const userSendMessageWrapper = useCallback(async () => {
    const sentMessage = await sendMessage("zcshUaxclcxWvd9XhlDE", "This is the doctor sending a third message!", "LltZTPMghitfupPlqXf8SXatY2");
    console.log(sentMessage);
  })

  const paginationWrapper = useCallback(async () => {
    //await loadConversation("zcshUaxclcxWvd9XhlDE", 5);
    const result = await loadConversation("zcshUaxclcxWvd9XhlDE", 5, "HLs98cqE1vdkuInS2xOK");
    console.log(result);
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
