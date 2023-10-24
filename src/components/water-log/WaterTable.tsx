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

type Water = {
  water_id: number;
  water_glasses: number;
  water_date: Date;
  created_at: Date;
  updated_at: Date;
};
export default function WaterTable() {
  const [table, setTable] = useState<Water[]>([]);
  const fetchWater = () => {
    axios
      .get('http://localhost/hd_monitoring/water.php', {
        params: {
          user_id: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setTable(res.data);
      });
  };

  useEffect(() => {
    fetchWater();
  }, []);

  return (
    <div className="w-[50%]">
      <Table className="w-full">
        <TableCaption>A list of your water intake.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Glsses</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.map((water, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {moment(water.created_at).format('LLLL')}
              </TableCell>
              <TableCell className="text-right">
                {water.water_glasses} glasses of water
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
