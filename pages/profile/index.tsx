import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import style from "../../styles/Profile.module.css";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import PrivateHeader from "../../components/PrivateHeader";
import CurrentUserContext from "../../contexts/currentUserContext";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import avatar from "../../public/img/avatar.jpeg";
import bol from "../../public/icons/bol.png";
import mark from "../../public/icons/mark.png";
import balloon from "../../public/icons/ballon.png";

const Profile: NextPage = (props) => {
  const router = useRouter();
  const { currentUserProfile } = useContext(CurrentUserContext);
  const birthday = dayjs(currentUserProfile?.birthday)
    .locale("fr")
    .format(" DD MMMM YYYY");

  return (
    <LayoutCurrentUser pageTitle="Votre profil">
      <div className={style.profilPageContainer}>
        <PrivateHeader
          router={() => router.push("/dashboard")}
          title={currentUserProfile ? currentUserProfile?.nickName : "profil"}
        />

        <div className={style.userInfoContainer}>
          <div className={style.imageContainer}>
            <img src={avatar.src} alt="avatar" className={style.avatar} />
          </div>
          <div className={style.userInfoCard}>
            <div className={style.titleInfoCard}> A propos</div>
            <div className={style.detailInfoCard}>
              <img
                src={balloon.src}
                alt="balloon-icon"
                className={style.icon}
              />
              <span className={style.textDetail}>{birthday}</span>
            </div>
            <div className={style.detailInfoCard}>
              <img src={mark.src} alt="mark-icon" className={style.icon} />
              <span className={style.textDetail}>
                {currentUserProfile?.city}
              </span>
            </div>
            <div className={style.detailInfoCard}>
              <img src={bol.src} alt="bol-icon" className={style.icon} />{" "}
              <span className={style.textDetail}>
                {currentUserProfile?.favoritePlate}
              </span>
            </div>
          </div>
        </div>

        <div className={style.descriptionContainer}>
          <div className={style.titleDescription}>Qui suis-je ?</div>
          <div className={style.contentDescription}>
            {currentUserProfile?.description}
          </div>
        </div>

        <div className={style.shareContainer}>
          <div className={style.titleDescription}>Mes partages...</div>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            coming soon
          </div>
        </div>
      </div>
    </LayoutCurrentUser>
  );
};

export default Profile;
