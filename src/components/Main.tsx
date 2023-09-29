import { Link, Routes, Route } from 'react-router-dom';
import { Button } from './ui/button';
import { ExitIcon, HomeIcon } from '@radix-ui/react-icons';
import Home from './Home';
import FoodDiary from './FoodDiary';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Main() {
  const [userDetails, setUserDetails] = useState([]);

  const handleFetchUserData = () => {
    axios
      .get('http://localhost/hd-monitoring/get-user-data.php', {
        params: {
          email: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          setUserDetails(res.data);
        }
      });
  };

  useEffect(() => {
    handleFetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="flex gap-5">
      <div className="w-[15rem] p-2 bg-white h-screen flex flex-col justify-around">
        <header className="h-[10rem] flex items-center">
          <h1 className="font-bold text-3xl">Logo Diri</h1>
        </header>

        <div className="flex flex-col mt-10">
          <Link to="/" className="mb-2">
            <Button className="w-full bg-inherit text-black border-none outline-none shadow-none text-start">
              <HomeIcon className="w-5 h-[1.5rem] mr-2" /> Home
            </Button>
          </Link>

          <Link to="/food-diary" className="mb-2">
            <Button className="w-full bg-inherit text-black border-none outline-none shadow-none">
              Food Diary
            </Button>
          </Link>
        </div>

        <footer className="mt-auto">
          <Button
            onClick={handleLogout}
            className="w-full bg-inherit text-black border-none outline-none shadow-none"
          >
            <ExitIcon className="w-5 h-[1.5rem] mr-2" /> Logout
          </Button>
        </footer>
      </div>

      <div className="border-2 w-full bg-[#FAFBFD]">
        <Routes>
          <Route index element={<Home userDetails={userDetails} />} />
          <Route path="/food-diary" element={<FoodDiary />} />
        </Routes>
      </div>
    </div>
  );
}
