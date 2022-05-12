import style from "./styleComponents/ProfileCard.module.css";
import avatar from "../public/img/avatar.jpeg";
import mark from "../public/icons/mark.png";
import CurrentUserContext from "../contexts/currentUserContext";
import { useContext } from "react";
import Link from "next/link";

const ProfileCard = () => {
  const { currentUserProfile } = useContext(CurrentUserContext);
  return (
    <Link href="/profile/me">
      <div className={style.profilCardContainer}>
        <div className={style.infoContainer}>
          <div className={style.infoTitle}>Voir son profil</div>
          <div className={style.cityContainer}>
            {currentUserProfile?.city && (
              <>
                <img src={mark.src} alt="mark-icon" className={style.icon} />
                <div className={style.textCity}>{currentUserProfile?.city}</div>
              </>
            )}
          </div>
        </div>
        <div className={style.imageContainer}>
          <img src={avatar.src} alt="avatar" className={style.avatar} />
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;
