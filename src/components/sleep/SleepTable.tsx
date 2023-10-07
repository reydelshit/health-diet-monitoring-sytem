import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';

type Sleep = {
  sleep_id: number;
  sleep_hours: number;
  sleep_time: string;
  created_at: Date;
  updated_at: Date;
};
export default function SleepTable() {
  const [table, setTable] = useState<Sleep[]>([]);
  const fetchSleep = () => {
    axios
      .get('http://localhost/hd-monitoring/sleep.php', {
        params: {
          user_id: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setTable(res.data);
      });
  };

  useEffect(() => {
    fetchSleep();
  }, []);

  return (
    <div className="w-[50%]">
      <Table className="w-full">
        <TableCaption>A list of your sleep hours.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead className="text-center">Day</TableHead>

            <TableHead className="text-right">Hours</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.map((sleep, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {/*  */}
                {sleep.sleep_time.slice(0, 1).toUpperCase() +
                  sleep.sleep_time.slice(1)}
              </TableCell>
              <TableCell className="text-right">
                {moment(sleep.created_at).format('LLLL')} hours of sleep
              </TableCell>
              <TableCell className="text-right">
                {sleep.sleep_hours} hours of sleep
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
