import { NextPage } from "next";
import { useRouter } from "next/router";
import style from "../../styles/Dashboard.module.css";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import PrivateHeader from "../../components/PrivateHeader";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";
import HomeBtns from "../../components/HomeBtns";
import ProfileCard from "../../components/ProfileCard";
import DashboardBtns from "../../components/DashboardBtns";

const Dashboard: NextPage = (props) => {
  const router = useRouter();
  const { currentUserProfile } = useContext(CurrentUserContext);

  return (
    <LayoutCurrentUser pageTitle="tableau de bord">
      <div className={style.dashboardPageContainer}>
        <PrivateHeader
          firstname={currentUserProfile ? currentUserProfile?.firstname : ""}
          lastname={currentUserProfile ? currentUserProfile?.lastname : ""}
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
        <DashboardBtns />
      </div>
    </LayoutCurrentUser>
  );
};

export default Dashboard;
