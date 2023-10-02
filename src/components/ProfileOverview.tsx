import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import moment from 'moment';

import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import WorkoutPlansComponent from './home/WorkoutPlansComponent';
import { useState } from 'react';
import { get } from 'http';
import CalculateBmi from './profile-overview/CalculateBmi';

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  birthday: string;
  isLogin: boolean;
  gender: string;
  height: string;
  weight: string;
};

export default function ProfileOverview({
  userDetails,
}: {
  userDetails: User[];
}) {
  const [bmi, setBmi] = useState<number>(0);

  return (
    <div className="w-[25rem] p-2 h-fit">
      {userDetails &&
        userDetails.map((user) => {
          const { id, name, email, weight, height, birthday, gender } = user;

          return (
            <div
              className="flex items-center flex-col mt-[2rem] w-full h-[90%] p-2 border-2 rounded-md bg-white"
              key={user.id}
            >
              <span className="self-end mb-5 cursor-pointer">
                <Link to={`/${id}/edit-profile`}>Edit details</Link>
              </span>
              <Avatar className="w-[10rem] h-[10rem]">
                <AvatarImage src="https://avatars.githubusercontent.com/u/40355669?v=4" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="text-3xl mt-2 font-bold">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </h1>

              <p>{moment().diff(birthday, 'years')}</p>

              <p>{moment(birthday).format('LL')}</p>

              <div className="space-y-1 text-center mt-10">
                <h4 className="text-sm font-medium leading-none">About</h4>
                <p className="text-sm text-muted-foreground">
                  Some of your details .
                </p>
              </div>
              <Separator className="my-4" />
              <div className="flex h-5 items-center space-x-4 text-sm">
                <div className="flex flex-col text-center">
                  Weight
                  <span className="font-bold">
                    {weight.length === 0 ? 'N/A' : weight + 'kg'}
                  </span>
                </div>
                <Separator orientation="vertical" />
                <div className="flex flex-col text-center">
                  Height
                  <span className="font-bold">
                    {height.length === 0 ? 'N/A' : height}
                  </span>
                </div>
                <Separator orientation="vertical" />
                <div className="flex flex-col text-center">
                  Gender
                  <span className="font-bold">
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              {weight.length > 0 && height.length > 0 ? (
                <CalculateBmi weight={parseInt(weight)} height={height} />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <h1 className="text-xl font-bold">BMI</h1>
                  <p className="text-sm text-muted-foreground">
                    If you cannot see your BMI here, please add your weight and
                    height to calculate your BMI in the edit details section
                  </p>
                </div>
              )}
            </div>
          );
        })}

      <WorkoutPlansComponent />
    </div>
  );
}
