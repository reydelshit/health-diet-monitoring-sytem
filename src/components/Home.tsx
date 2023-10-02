import Meal from './home/Meal';
import FoodLogTable from './home/FoodLogTable';
import DailyLogs from './home/DailyLogs';
import CalendarComponent from './home/Calendar';
import Chart from './home/Chart';
import MedicalRecords from './home/MedicalRecords';

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
    <div className="h-screen w-full flex flex-col py-10 px-[4rem]">
      {userDetails &&
        userDetails.map((user) => {
          const { id, name, email, birthday, gender } = user;

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
        <div className="w-full flex gap-10">
          <Chart />
          <MedicalRecords />
        </div>

        <div className="flex justify-between w-full gap-10">
          <Meal />
          <FoodLogTable />
        </div>
      </div>
    </div>
  );
}
