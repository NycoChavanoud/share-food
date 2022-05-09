import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";

const Profile: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="Votre profil">
      <BackBtn />
    </LayoutCurrentUser>
  );
};

export default Profile;
