import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileOverview from './ProfileOverview';
import Sidebar from './Sidebar';

export default function Main() {
  const [userDetails, setUserDetails] = useState([]);

  const handleFetchUserData = () => {
    axios
      .get('http://localhost/hd-monitoring/get-user-data.php', {
        params: {
          id: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        // console.log(res.data);
        // console.log(res.status);

        if (res.status === 200) {
          setUserDetails(res.data);
        }
      });
  };

  useEffect(() => {
    handleFetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="flex bg-[#fafbfd]">
      <Sidebar handleLogout={handleLogout} userDetails={userDetails} />
      <ProfileOverview userDetails={userDetails} />
    </div>
  );
}
