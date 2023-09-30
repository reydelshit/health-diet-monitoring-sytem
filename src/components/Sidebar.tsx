import { Link, Routes, Route } from 'react-router-dom';
import { Button } from './ui/button';
import {
  BookmarkIcon,
  ExitIcon,
  HomeIcon,
  TargetIcon,
} from '@radix-ui/react-icons';
import Home from './Home';
import FoodDiary from './MealDiary';
import MealDiary from './MealDiary';
import Goal from './Goal';
import Water from './Water';
import Sleep from './Sleep';

export default function Sidebar({
  handleLogout,
  userDetails,
}: {
  handleLogout: () => void;
  userDetails: any;
}) {
  return (
    <>
      <div className="w-[25rem] p-2 bg-white h-screen flex flex-col justify-around border-r-2">
        <header className="h-[8rem] flex items-center">
          <h1 className="font-bold text-3xl">Logo Diri</h1>
        </header>

        <div className="flex flex-col mt-5 justify-start items-start w-full p-2">
          <Link
            to="/"
            className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
          >
            <HomeIcon className="w-5 h-[1.5rem] mr-2" /> Home
          </Link>
          <Link
            to="/set-goal"
            className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
          >
            <TargetIcon className="w-5 h-[1.5rem] mr-2" /> Goal
          </Link>

          <Link
            to="/food-diary"
            className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
          >
            <BookmarkIcon className="w-5 h-[1.5rem] mr-2" /> Meal Diary
          </Link>

          <Link
            to="/water-log"
            className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
          >
            <BookmarkIcon className="w-5 h-[1.5rem] mr-2" /> Water Log
          </Link>

          <Link
            to="/sleep-log"
            className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
          >
            <BookmarkIcon className="w-5 h-[1.5rem] mr-2" /> Sleep Log
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

      <div className="w-full bg-[#fafbfd] p-2">
        <Routes>
          <Route index element={<Home userDetails={userDetails} />} />
          <Route
            path="/edit-profile"
            element={<Home userDetails={userDetails} />}
          />
          <Route path="/food-diary" element={<MealDiary />} />
          <Route path="/set-goal" element={<Goal />} />
          <Route path="/water-log" element={<Water />} />
          <Route path="/sleep-log" element={<Sleep />} />
        </Routes>
      </div>
    </>
  );
}
