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
import { Link } from 'react-router-dom';

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
    <div className="h-screen w-full justify-between flex">
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
    </div>
  );
}
