import Meal from './home/Meal';
import FoodLogTable from './home/FoodLogTable';
import CalorieChart from './home/CalorieChart';
import MedicalRecords from './home/MedicalRecords';
import { CalorieGoal } from './goal/CalorieGoal';

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  birthday: string;
  isLogin: boolean;
  gender: string;
};

export default function Home({ userDetails }: { userDetails: User[] }) {
  return (
    <div className="h-screen w-full flex flex-col py-10 pl-[5rem]">
      {userDetails &&
        userDetails.map((user) => {
          const { name } = user;

          return (
            <div key={user.id}>
              <h1 className="text-3xl font-bold text-[#2b3e54]">
                Welcome, {name.charAt(0).toUpperCase() + name.slice(1)} 👋
              </h1>
              <p className="text-sm ml-1">Stay Healthy, Stay Happy.</p>
            </div>
          );
        })}

      <div className="flex flex-col w-full justify-around items-center mt-[3rem] h-full">
        <div className="w-full flex gap-5">
          <CalorieChart />
          <MedicalRecords />
          <CalorieGoal />
        </div>

        <div className="flex justify-between w-full gap-10">
          <Meal />
          <FoodLogTable />
        </div>
      </div>
    </div>
  );
}
