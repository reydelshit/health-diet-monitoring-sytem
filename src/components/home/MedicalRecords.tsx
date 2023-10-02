import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MedicalRecords() {
  return (
    <div className="w-full border-2 h-full flex flex-col justify-between rounded-md p-4 bg-white">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Medical History</h1>
        <span className="cursor-pointer">see all</span>
      </div>

      <div>
        <div className="flex items-center justify-between w-full border-2 p-2 mb-2 rounded-md">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://www.mercyrelief.org/site/wp-content/uploads/medical-icon.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="font-bold">Dialisys</h1>
              <p>December, 25, 2023</p>
            </div>
          </div>

          <div>
            <p>{'>'}</p>
          </div>
        </div>

        <div className="flex items-center justify-between w-full border-2 p-2 mb-2 rounded-md">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://www.mercyrelief.org/site/wp-content/uploads/medical-icon.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="font-bold">Check up</h1>
              <p>December, 21, 2023</p>
            </div>
          </div>

          <div>
            <p>{'>'}</p>
          </div>
        </div>

        <div className="flex items-center justify-between w-full border-2 p-2 mb-2 rounded-md">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://www.mercyrelief.org/site/wp-content/uploads/medical-icon.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="font-bold">Tete Operation</h1>
              <p>December 26, 2023</p>
            </div>
          </div>

          <div>
            <p>{'>'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
