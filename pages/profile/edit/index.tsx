import style from "../../../styles/EditProfile.module.css";
import "dayjs/locale/fr";
import EditProfileForm from "../../../components/EditProfileForm";

const index = () => {
  return (
    <div className={style.editProfileContainer}>
      <EditProfileForm />
    </div>
  );
};

export default index;