import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import {
  makeUser,
  signIn,
  signOutUser,
  getUserId,
  userLoggedIn,
} from "./firebase/account"

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
