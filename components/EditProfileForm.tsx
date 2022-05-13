import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import style from "./styleComponents/EditProfileForm.module.css";

const EditProfileForm = () => {
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

  console.log(userProfile);

  return (
    <form className={style.editFormContainer} data-cy="formEditProfile">
      <div className={style.userInfoContainer}>
        <label htmlFor="lastname" className={style.labelForm}>
          nom :
        </label>
        <input
          type="text"
          id="lastname"
          data-cy="lastname"
          className={style.largeInputForm}
          required
          value={userProfile.lastname}
          onChange={(e) => {
            setUserProfile({
              ...userProfile,
              userprofil: userProfile.lastname,
            });
          }}
          maxLength={40}
        />
      </div>
    </form>
  );
};

export default EditProfileForm;
