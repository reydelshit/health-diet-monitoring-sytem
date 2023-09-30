import moment from 'moment';

import Meal from './home/Meal';
import FoodLogTable from './home/FoodLogTable';

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
    <div className="h-screen w-full flex flex-col py-10 px-[6.5rem]">
      {userDetails &&
        userDetails.map((user) => {
          const { id, name, email, birthday, gender } = user;

          return (
            <div key={user.id}>
              <h1 className="text-3xl font-bold">
                Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}
              </h1>
              <p className="text-sm ml-1">Stay Healthy, Stay Happy.</p>
            </div>
          );
        })}

      {/* <div className="w-full text-center">
        <h1 className="font-bold text-4xl">{moment().format('LLLL')}</h1>
      </div> */}

      <div className="flex w-full justify-between items-center mt-[3rem]">
        <div>
          <h1 className="font-bold text-2xl py-2">Meals</h1>
          <Meal />
        </div>

        <div>
          <h1 className="font-bold text-2xl py-2">Meals</h1>
          <Meal />
        </div>
      </div>

      <FoodLogTable />
    </div>
  );
}
