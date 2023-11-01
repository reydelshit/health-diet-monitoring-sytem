import { Link, Routes, Route } from 'react-router-dom';
import { Button } from './ui/button';
import { ExitIcon, HomeIcon, ReaderIcon } from '@radix-ui/react-icons';
import Home from './Home';
import MealDiary from './MealDiary';
import Goal from './Goal';
import Water from './Water';
import Sleep from './Sleep';
import EditProfile from './profile-overview/EditProfile';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MedicalHistory from './MedicalHistory';
import { IoWaterOutline } from 'react-icons/io5';
import { GiNightSleep } from 'react-icons/gi';
import { MdOutlineFastfood } from 'react-icons/md';
import { GoGoal } from 'react-icons/go';
import { GiMuscleUp } from 'react-icons/gi';
import WorkoutPlans from './WorkoutPlans';
import ViewWorkout from './workout-plans/ViewWorkout';
import NotFound from './NotFound';
import ViewMedicalHistory from './medical-history/ViewMedicalHistory';
import logo from '../assets/logo.png';
import WeightHeightChanges from './WeightHeightChanges';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';
import Suggestion from './Suggestion';

export default function Sidebar({
  handleLogout,
  userDetails,
}: {
  handleLogout: () => void;
  userDetails: any;
}) {
  const [width, setWidth] = useState<number>(5);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const handleMouseOver = () => {
    setWidth(18);
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setWidth(5);
    setIsMouseOver(false);
  };

  return (
    <>
      <div
        onMouseOver={() => handleMouseOver()}
        onMouseLeave={() => handleMouseLeave()}
        style={{ width: `${width}rem` }}
        className="w-[25rem] p-2 bg-white h-screen fixed z-10 top-0 left-0 items-center flex flex-col justify-center border-r-2 transition-all ease-in-out duration-350"
      >
        <header className="h-[8rem] flex items-center">
          {isMouseOver ? (
            <Avatar className="w-[20rem] h-[20rem] mt-[5rem] cursor-pointer">
              <AvatarImage src={logo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="w-[6rem] h-[6rem]">
              <AvatarImage src={logo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
        </header>

        <div className="flex flex-col items-start w-full p-2 h-full justify-center mt-[-5rem] transition-none">
          {isMouseOver ? (
            <Link
              to="/"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <HomeIcon className="w-5 h-[1.5rem] mr-2" /> Home
            </Link>
          ) : (
            <Link
              to="/"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <HomeIcon className="w-5 h-[1.5rem] mr-2" />
            </Link>
          )}

          {isMouseOver ? (
            <Link
              to="/set-goal"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <GoGoal className="w-5 h-[1.5rem] mr-2" /> Goal
            </Link>
          ) : (
            <Link
              to="/set-goal"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <GoGoal className="w-5 h-[1.5rem] mr-2" />
            </Link>
          )}

          {isMouseOver ? (
            <Link
              to="/food-diary"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <MdOutlineFastfood className="w-5 h-[1.5rem] mr-2" /> Meal Diary
            </Link>
          ) : (
            <Link
              to="/food-diary"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <MdOutlineFastfood className="w-5 h-[1.5rem] mr-2" />
            </Link>
          )}

          {isMouseOver ? (
            <Link
              to="/water-log"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <IoWaterOutline className="w-5 h-[1.5rem] mr-2" /> Water Log
            </Link>
          ) : (
            <Link
              to="/water-log"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <IoWaterOutline className="w-5 h-[1.5rem] mr-2" />
            </Link>
          )}

          {isMouseOver ? (
            <Link
              to="/sleep-log"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <GiNightSleep className="w-5 h-[1.5rem] mr-2" /> Sleep Log
            </Link>
          ) : (
            <Link
              to="/sleep-log"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <GiNightSleep className="w-5 h-[1.5rem] mr-2" />
            </Link>
          )}

          {isMouseOver ? (
            <Link
              to="/workout-plans"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <GiMuscleUp className="w-5 h-[1.5rem] mr-2" /> Workout plans
            </Link>
          ) : (
            <Link
              to="/workout-plans"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <GiMuscleUp className="w-5 h-[1.5rem] mr-2" />
            </Link>
          )}

          {isMouseOver ? (
            <Link
              to="/medical-history"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <ReaderIcon className="w-5 h-[1.5rem] mr-2" /> Medical History
            </Link>
          ) : (
            <Link
              to="/medical-history"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <ReaderIcon className="w-5 h-[1.5rem] mr-2" />
            </Link>
          )}

          {isMouseOver ? (
            <Link
              to="/height-weight-changes"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <MdOutlinePublishedWithChanges className="w-5 h-[1.5rem] mr-2" />{' '}
              H & W Timeline
            </Link>
          ) : (
            <Link
              to="/height-weight-changes"
              className="mb-2 w-full bg-inherit text-black flex hover:bg-green-50 p-2 rounded-sm "
            >
              <MdOutlinePublishedWithChanges className="w-5 h-[1.5rem] mr-2" />
            </Link>
          )}
        </div>

        <footer className="mt-auto">
          {isMouseOver ? (
            <Button
              onClick={handleLogout}
              className="w-full bg-inherit text-black border-none outline-none shadow-none"
            >
              <ExitIcon className="w-5 h-[1.5rem] mr-2" /> Logout
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              className="w-full bg-inherit text-black border-none outline-none shadow-none"
            >
              <ExitIcon className="w-5 h-[1.5rem] mr-2" />
            </Button>
          )}
        </footer>
      </div>

      <div className="w-full bg-[#fafbfd] p-2">
        <Routes>
          <Route index element={<Home userDetails={userDetails} />} />
          <Route path="/:id/edit-profile" element={<EditProfile />} />
          <Route path="/food-diary" element={<MealDiary />} />
          <Route path="/set-goal" element={<Goal />} />
          <Route path="/water-log" element={<Water />} />
          <Route path="/sleep-log" element={<Sleep />} />
          <Route path="/workout-plans" element={<WorkoutPlans />} />
          <Route path="/workout-plans/:id" element={<ViewWorkout />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="/medical-history/:id" element={<ViewMedicalHistory />} />
          <Route
            path="/height-weight-changes"
            element={<WeightHeightChanges />}
          />

          <Route path="/suggestions/:bmi" element={<Suggestion />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/*/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
