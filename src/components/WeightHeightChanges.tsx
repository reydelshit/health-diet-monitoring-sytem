import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import CalculateBmi from './profile-overview/CalculateBmi';
import { Separator } from './ui/separator';

type WeightHeight = {
  physical_id: number;
  user_id: number;
  height_ft: string;
  weight_kg: number;
  created_at: Date;
};

export const metadata = {
  title: 'Weight and Height Changes',
  description: 'See the changes of your weight and height.',
};

export default function WeightHeightChanges() {
  const [heightWeight, setHeightWeight] = useState<WeightHeight[]>([]);

  const fetchHeightWeight = () => {
    axios
      .get('http://localhost/hd_monitoring/physical-measurements.php', {
        params: {
          user_id: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setHeightWeight(res.data);
        console.log(res.data, 'physical');
      });
  };

  useEffect(() => {
    fetchHeightWeight();
  }, []);

  return (
    <div className="w-full pl-[5rem]">
      <span className="block py-8">
        <h1 className="font-bold text-3xl">{metadata.title}</h1>
        <p className="text-sm">{metadata.description}</p>
      </span>
      <Separator />

      <ol className="relative border-l border-gray-200 dark:border-gray-700 mx-[10rem] mt-5">
        {heightWeight &&
          heightWeight.map((hw, index) => {
            return (
              <li key={index} className="mb-10 ml-4 bg-white p-4 rounded-md">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {moment(hw.created_at).format('LL')}
                </time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {hw.height_ft} ft
                </h3>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {hw.weight_kg} kg
                </h3>
                <div className="text-start">
                  <CalculateBmi
                    gender=""
                    height={hw.height_ft}
                    weight={hw.weight_kg}
                  />
                </div>
              </li>
            );
          })}
      </ol>
    </div>
  );
}
