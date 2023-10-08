import { Link, useParams } from 'react-router-dom';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');

  const { id } = useParams();

  const fetchUser = async () => {
    axios
      .get(`http://localhost/hd-monitoring/register.php/${id}`)
      .then((res) => {
        console.log(res.data, 'reyudel');
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setHeight(res.data.height);
        setWeight(res.data.weight);
        setBirthday(res.data.birthday);
        setGender(res.data.gender);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setUser((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(user);

    axios
      .put('http://localhost/hd-monitoring/register.php', {
        ...user,
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 'success') {
          window.location.reload();
          navigate('/');
        }
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col text-center">
      <div className="w-[40%]">
        <h1 className="text-2xl font-bold mb-2">Update Details</h1>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <Input
            placeholder="Name"
            name="name"
            className="mb-2"
            onChange={handleChange}
            defaultValue={name}
          />
          <Input
            placeholder="Email"
            name="email"
            className="mb-2"
            onChange={handleChange}
            defaultValue={email}
          />

          <Input
            placeholder="Height in ft eg 5'9"
            name="height"
            className="mb-2"
            onChange={handleChange}
            defaultValue={height}
          />

          <Input
            placeholder="Weight in kg eg. 60"
            name="weight"
            className="mb-2"
            onChange={handleChange}
            defaultValue={weight}
          />

          <Label className="text-start ml-2 text-sm">Birthday:</Label>
          <Input
            type="date"
            className="mb-2"
            name="birthday"
            onChange={handleChange}
            defaultValue={birthday}
          />

          <div className="flex justify-start mb-4">
            <div className="flex">
              <Input
                type="radio"
                name="gender"
                value="male"
                className="w-[2rem] h-[1.2rem] cursor-pointer"
                onChange={handleChange}
                checked={gender === 'male'}
              />
              <Label className="text-start mr-2 text-sm">Male</Label>
            </div>
            <div className="flex">
              <Input
                type="radio"
                name="gender"
                value="female"
                className="w-[2rem] h-[1.2rem] cursor-pointer"
                onChange={handleChange}
                checked={gender === 'female'}
              />
              <Label className="text-start mr-2 text-sm">Female</Label>
            </div>
          </div>

          <Button className="w-[80%] self-center" type="submit">
            Save and Update
          </Button>
        </form>
      </div>
    </div>
  );
}
