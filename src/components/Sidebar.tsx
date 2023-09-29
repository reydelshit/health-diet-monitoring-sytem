import { Link, Routes, Route } from 'react-router-dom';
import { Button } from './ui/button';
import { ExitIcon, HomeIcon } from '@radix-ui/react-icons';
import Home from './Home';
import FoodDiary from './FoodDiary';

export default function Sidebar({
  handleLogout,
  userDetails,
}: {
  handleLogout: () => void;
  userDetails: any;
}) {
  return (
    <>
      <div className="w-[20rem] p-2 bg-white h-screen flex flex-col justify-around">
        <header className="h-[8rem] flex items-center">
          <h1 className="font-bold text-3xl">Logo Diri</h1>
        </header>

        <div className="flex flex-col mt-5">
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

      <div className="w-full bg-[#FAFBFD] p-2">
        <Routes>
          <Route index element={<Home userDetails={userDetails} />} />
          <Route
            path="/edit-profile"
            element={<Home userDetails={userDetails} />}
          />
          <Route path="/food-diary" element={<FoodDiary />} />
        </Routes>
      </div>
    </>
  );
}
