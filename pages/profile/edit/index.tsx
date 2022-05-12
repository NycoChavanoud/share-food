import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";

const index = () => {
  const [userProfile, setUserProfile] = useState<any>(" ");

  useEffect(() => {
    axios
      .get(`/api/profile/me`)
      .then((res) => setUserProfile(res.data))
      .catch(console.error);
  }, []);

  const birthday = dayjs(userProfile.birthday)
    .locale("fr")
    .format(" DD MMMM YYYY");

  return <div>Enter</div>;
};

export default index;
