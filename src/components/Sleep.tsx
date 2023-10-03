import { Separator } from './ui/separator';

export default function Sleep() {
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
    </div>
  );
}
