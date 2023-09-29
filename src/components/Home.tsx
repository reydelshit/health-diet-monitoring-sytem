import { set } from 'date-fns';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import moment from 'moment';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
  const [userInformation, setUserInformation] = useState({});

  return (
    <div className="p-4 h-screen w-full justify-between flex">
      {userDetails &&
        userDetails.map((user) => {
          const { id, name, email, birthday, gender } = user;

          return (
            <div className="mt-[5rem]" key={user.id}>
              <h1 className="text-3xl font-bold">
                Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}
              </h1>
              <p className="text-sm ml-1">Stay Healthy, Stay Happy.</p>
            </div>
          );
        })}

      <div>
        {userDetails &&
          userDetails.map((user) => {
            const { id, name, email, birthday, gender } = user;

            return (
              <div
                className="flex items-center flex-col mt-[2rem] border-2 w-[20rem] h-[80%] p-2 rounded-md bg-white"
                key={user.id}
              >
                <span className="self-end mb-10 cursor-pointer">
                  Edit details
                </span>
                <Avatar className="w-[15rem] h-[15rem]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="text-3xl mt-2 font-bold">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </h1>

                <p>{moment().diff(birthday, 'years')}</p>

                <p>{moment(birthday).format('LL')}</p>

                <Card className="w-full mt-[5rem]">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card Content</p>
                  </CardContent>
                  <CardFooter>
                    <p>Card Footer</p>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}
