import { useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import AddSleepLog from './sleep/addSleep';
import { TotalSleep } from './sleep/TotalSleep';
import SleepLogChart from './sleep/SleepLogChart';
import SleepTable from './sleep/SleepTable';

export default function Sleep() {
  const [sleepDecider, setSleepDecider] = useState<boolean>(false);
  return (
    <div className="w-full">
      <div>
        <span className="block py-8">
          <h1 className="font-bold text-3xl">Record your sleep now!</h1>
          <p className="text-sm">
            Begin your sleep tracking adventure with us. Record your sleep
            patterns and gain valuable insights to improve your sleep quality.
          </p>
        </span>
        <Separator />
      </div>

      <div className="mt-[4rem] flex flex-col">
        <Button
          className="w-[15rem] self-end"
          onClick={() => setSleepDecider(!sleepDecider)}
        >
          Log sleep!
        </Button>

        {sleepDecider ? (
          <AddSleepLog setSleepDecider={setSleepDecider} />
        ) : (
          <div>
            <div className="w-[100%] mt-[5rem] flex gap-4 items-center">
              <SleepLogChart />
              <TotalSleep />
            </div>
            <div className="w-full flex justify-center items-center mt-5">
              <SleepTable />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
