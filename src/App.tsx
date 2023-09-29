import { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import Login from './components/Login';

import Main from './components/Main';
import Register from './components/Register';

function App() {
  const [isLogged, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <>
      {isLogged ? (
        <Main />
      ) : (
        <div>
          <Routes>
            <Route index element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
