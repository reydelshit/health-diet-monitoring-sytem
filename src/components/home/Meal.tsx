import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function Meal() {
  return (
    <div className="border-2 h-full w-[28rem] p-4 bg-white rounded-md">
      <Tabs defaultValue="add-meal" className="w-full flex flex-col h-fit ">
        <TabsList className="w-full h-[3rem] mb-5 bg-[#fafbfd]">
          <TabsTrigger value="add-meal">Add Meal</TabsTrigger>
          <TabsTrigger value="add-exercise">Add Exercise</TabsTrigger>
        </TabsList>
        <TabsContent value="add-meal" className="w-full">
          <div className="w-full flex justify-between items-center p-4 mb-2 rounded-sm bg-[#fafbfd]">
            <div>
              <h1 className="font-bold">Breakfast</h1>
              <p>goal here</p>
            </div>
            <Button>Add Breakfast</Button>
          </div>

          <div className="w-full flex justify-between items-center p-4 mb-2 rounded-sm bg-[#fafbfd]">
            <div>
              <h1 className="font-bold">Lunch</h1>
              <p>goal here</p>
            </div>
            <Button>Add Breakfast</Button>
          </div>

          <div className="w-full flex justify-between items-center p-4 mb-2 rounded-sm bg-[#fafbfd]">
            <div>
              <h1 className="font-bold">Dinner</h1>
              <p>goal here</p>
            </div>
            <Button>Add Breakfast</Button>
          </div>
        </TabsContent>
        <TabsContent value="add-exercise">excercise here.</TabsContent>
      </Tabs>
    </div>
  );
}
