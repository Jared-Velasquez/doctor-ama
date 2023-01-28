import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';

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
