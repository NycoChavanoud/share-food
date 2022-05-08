import { NextPage } from "next";
import { useRouter } from "next/router";
import style from "../../styles/Dashboard.module.css";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import PrivateHeader from "../../components/PrivateHeader";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";
import HomeBtns from "../../components/HomeBtns";
import ProfileCard from "../../components/ProfileCard";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { currentUserProfile } = useContext(CurrentUserContext);

  console.log(currentUserProfile);
  return (
    <LayoutCurrentUser pageTitle="tableau de bord">
      <div className={style.dashboardPageContainer}>
        <PrivateHeader
          title={
            currentUserProfile
              ? currentUserProfile?.nickName
              : "votre dashboard"
          }
          router={() => {
            router.push("/");
          }}
        />
        <h2 className={style.titlesOnDashboard}>Infos profil</h2>
        <ProfileCard />
        <h2 className={style.titlesOnDashboard}>Mes activités</h2>
        <HomeBtns />
      </div>
    </LayoutCurrentUser>
  );
};

export default Dashboard;
