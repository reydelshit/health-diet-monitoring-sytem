import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import moment from 'moment';

import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import WorkoutPlansComponent from './home/WorkoutPlansComponent';
import { useEffect, useState } from 'react';
import CalculateBmi from './profile-overview/CalculateBmi';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  birthday: string;
  isLogin: boolean;
  gender: string;
  image: string;
};

export default function ProfileOverview({
  userDetails,
}: {
  userDetails: User[];
}) {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [addPhysicalDecider, setAddPhysicalDecider] = useState<boolean>(false);

  const fetchWater = () => {
    axios
      .get('http://localhost/hd-monitoring/physical-measurements.php', {
        params: {
          user_id_latest: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log(res.data, 'provile overview');
        setWeight(res.data[0].weight_kg);
        setHeight(res.data[0].height_ft);
      });
  };

  useEffect(() => {
    fetchWater();
  }, []);

  const handleSubmitPhysicalMeasurements = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('http://localhost/hd-monitoring/physical-measurements.php', {
        user_id: localStorage.getItem('token'),
        weight_kg: weight,
        height_ft: height,
      })
      .then((res) => {
        console.log(res.data, 'res');
        setAddPhysicalDecider(false);
      });
  };

  return (
    <div className="w-[20rem] p-2 h-fit">
      {userDetails &&
        userDetails.map((user) => {
          const { id, name, birthday, gender, image } = user;

          return (
            <div
              className="flex items-center flex-col mt-[2rem] w-full border-2 h-fit p-2 rounded-md bg-white"
              key={user.id}
            >
              <span className="self-end mb-5 cursor-pointer text-sm">
                <Link to={`/${id}/edit-profile`}>Edit details</Link>
              </span>
              <img
                className="w-[12rem] h-[12rem] object-cover rounded-full"
                src={
                  image.length > 0
                    ? image
                    : 'https://avatars.githubusercontent.com/u/40355669?v=4'
                }
              />

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
              {weight.length !== 0 && height.length !== 0 ? (
                <div className="text-center">
                  <CalculateBmi weight={parseInt(weight)} height={height} />

                  <Button
                    onClick={() => setAddPhysicalDecider(!addPhysicalDecider)}
                    className="mt-5"
                  >
                    {addPhysicalDecider ? 'Close' : 'Add height and weight'}
                  </Button>
                  <span className="px-2 text-center w-full block text-sm mt-5">
                    {addPhysicalDecider && (
                      <div className="h-[8rem] mt-5">
                        <form onSubmit={handleSubmitPhysicalMeasurements}>
                          <Input
                            type="number"
                            defaultValue={weight}
                            placeholder="Weight"
                            className="mt-2"
                            onChange={(e) => setWeight(e.target.value)}
                          />
                          <Input
                            type="text"
                            defaultValue={height}
                            placeholder="Height"
                            className="mt-2"
                            onChange={(e) => setHeight(e.target.value)}
                          />
                          <Button type="submit" className="mt-2">
                            Submit
                          </Button>
                        </form>
                      </div>
                    )}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <div className=" h-[5rem]">
                    <h1 className="text-xl font-bold">BMI</h1>
                    <p className="text-sm text-muted-foreground">
                      If you cannot see your BMI here, please add your weight
                      and height to calculate your BMI
                    </p>
                  </div>

                  <Button
                    onClick={() => setAddPhysicalDecider(!addPhysicalDecider)}
                    className="mt-5"
                  >
                    Add height and weight
                  </Button>

                  {addPhysicalDecider && (
                    <div className="w-full">
                      <form>
                        <Input
                          type="number"
                          placeholder="Weight"
                          className="mt-2"
                          onChange={(e) => setWeight(e.target.value)}
                        />
                        <Input
                          type="text"
                          placeholder="Height"
                          className="mt-2"
                          onChange={(e) => setHeight(e.target.value)}
                        />
                        <Button type="submit" className="mt-2">
                          Submit
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

      <WorkoutPlansComponent />
    </div>
  );
}
