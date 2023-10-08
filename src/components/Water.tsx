import { useState } from 'react';
import { Separator } from './ui/separator';
import AddWaterLog from './water-log/addWater';
import { Button } from './ui/button';
import WaterLogChart from './water-log/WaterLogChart';
import { TotalWater } from './water-log/TotalWater';
import WaterTable from './water-log/WaterTable';

export default function Water() {
  const [waterDecider, setWaterDecider] = useState<boolean>(false);
  return (
    <div className="w-full pl-[5rem]">
      <div>
        <span className="block py-8">
          <h1 className="font-bold text-3xl">Record Water!</h1>
          <p className="text-sm">
            Start your hydration journey right here. Track your daily water
            intake and stay on top of your hydration goals with our easy-to-use
            water logging form.
          </p>
        </span>
        <Separator />
      </div>

      <div className="mt-[4rem] flex flex-col">
        <Button
          className="w-[15rem] self-end"
          onClick={() => setWaterDecider(!waterDecider)}
        >
          Log water!
        </Button>

        {waterDecider ? (
          <AddWaterLog setWaterDecider={setWaterDecider} />
        ) : (
          <div className="flex flex-col">
            <div className="w-[100%] mt-[5rem] flex gap-4 items-center ">
              <WaterLogChart />
              <TotalWater />
            </div>
            <div className="w-[100%] flex justify-center items-center mt-5">
              <WaterTable />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
