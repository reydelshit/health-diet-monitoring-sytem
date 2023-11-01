import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function CalculateBmi({
  weight,
  height,
  gender,
}: {
  weight: number;
  height: string;
  gender: string;
}) {
  const maleBMICategories = [
    {
      category: 'Underweight',
      suggestion:
        'You are underweight. Consider talking to a healthcare professional to assess your nutritional needs.',
      minBMI: 0,
      maxBMI: 18.4,
    },
    {
      category: 'Normal Weight',
      suggestion:
        'Your weight is within a healthy range. Maintain a balanced diet and regular exercise. Pay attention to protein intake to support muscle maintenance.',
      minBMI: 18.5,
      maxBMI: 24.9,
    },
    {
      category: 'Overweight',
      suggestion:
        'You are overweight. Focus on a balanced diet and exercise routine to achieve a healthier weight.',
      minBMI: 25,
      maxBMI: 29.9,
    },
    {
      category: 'Obesity (Class I)',
      suggestion:
        "You are in the obese category. It's essential to work with a healthcare professional to address your weight.",
      minBMI: 30,
      maxBMI: 34.9,
    },
    {
      category: 'Obesity (Class II)',
      suggestion:
        'You are in the severely obese category. Seek immediate medical guidance to manage your weight.',
      minBMI: 35,
      maxBMI: 39.9,
    },
    {
      category: 'Obesity (Class III)',
      suggestion:
        "You are in the morbidly obese category. It's crucial to consult a healthcare professional for a comprehensive weight management plan.",
      minBMI: 40,
      maxBMI: Infinity,
    },
  ];

  const femaleBMICategories = [
    {
      category: 'Underweight',
      suggestion:
        'You are underweight. Consider talking to a healthcare professional to assess your nutritional needs.',
      minBMI: 0,
      maxBMI: 18.4,
    },
    {
      category: 'Normal Weight',
      suggestion:
        'Your weight is within a healthy range. Maintain a balanced diet and regular exercise. Pay attention to calcium and iron intake for overall health.',
      minBMI: 18.5,
      maxBMI: 24.9,
    },
    {
      category: 'Overweight',
      suggestion:
        'You are overweight. Focus on a balanced diet and exercise routine to achieve a healthier weight.',
      minBMI: 25,
      maxBMI: 29.9,
    },
    {
      category: 'Obesity (Class I)',
      suggestion:
        "You are in the obese category. It's essential to work with a healthcare professional to address your weight.",
      minBMI: 30,
      maxBMI: 34.9,
    },
    {
      category: 'Obesity (Class II)',
      suggestion:
        'You are in the severely obese category. Seek immediate medical guidance to manage your weight.',
      minBMI: 35,
      maxBMI: 39.9,
    },
    {
      category: 'Obesity (Class III)',
      suggestion:
        "You are in the morbidly obese category. It's crucial to consult a healthcare professional for a comprehensive weight management plan.",
      minBMI: 40,
      maxBMI: Infinity,
    },
  ];

  const getBmiCategory = (bmi: number) => {
    if (gender === 'female' || gender === 'Female') {
      const bmiCategory = maleBMICategories.find(
        (category) => category.minBMI <= bmi && category.maxBMI >= bmi,
      );

      return (
        <div>
          <h1 className="font-bold">{bmiCategory?.category}</h1>
          <p className="text-sm">{bmiCategory?.suggestion}</p>
        </div>
      );
    } else {
      const bmiCategory = femaleBMICategories.find(
        (category) => category.minBMI <= bmi && category.maxBMI >= bmi,
      );

      return (
        <div>
          <h1 className="font-bold">{bmiCategory?.category}</h1>
          <p className="text-sm">{bmiCategory?.suggestion}</p>
        </div>
      );
    }
  };

  const [feet, inches] = height.split("'");

  const feetToMeters = parseInt(feet) * 0.3048;
  const inchesToMeters = parseInt(inches) * 0.0254;
  const totalHeightInMeters = feetToMeters + inchesToMeters;
  const bmi = weight / (totalHeightInMeters * totalHeightInMeters);

  const toFixed = bmi.toFixed(2) as unknown as number;
  // setBmi(toFixed);
  getBmiCategory(toFixed);

  return (
    <div>
      <h1>BMI</h1>
      <p className="text-2xl font-bold">{toFixed}</p>
      {getBmiCategory(toFixed)}

      <div className="mt-[1rem]">
        {/* <h1 className="font-bold mb-[1rem]">Health Suggestion</h1> */}
        <Link to={`/suggestions/${toFixed}`}>
          <Button className="mb-1 w-[15rem]  mr-2">Health Suggestion</Button>
        </Link>
      </div>
    </div>
  );
}
