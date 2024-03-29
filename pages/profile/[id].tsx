import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "../../styles/Profile.module.css";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import PrivateHeader from "../../components/PrivateHeader";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import avatar from "../../public/img/avatar.png";
import bol from "../../public/icons/bol.png";
import mark from "../../public/icons/mark.png";
import balloon from "../../public/icons/ballon.png";
import editIcon from "../../public/icons/edit.png";
import editDarkIcon from "../../public/icons/editDark.png";
import Link from "next/link";
import axios from "axios";

import { IUser } from "../../models/user";
import { Loading } from "../../components/Loading";

const Profile: NextPage = (props) => {
  const [userProfile, setUserProfile] = useState<Partial<IUser | null>>();

  const router = useRouter();
  const { id } = router.query;

  const birthday =
    dayjs(userProfile?.birthday).locale("fr").format(" DD MMMM YYYY") || null;

  useEffect(() => {
    if (id === "me" || !id) {
      axios
        .get(`/api/profile/me`)
        .then((res) => setUserProfile(res.data))
        .catch(console.error);
    } else {
      axios
        .get(`/api/profile/${id}`)
        .then((res) => setUserProfile(res.data))
        .catch(console.error);
    }
  }, [id]);

  if (!userProfile) return <Loading />;

  const {
    firstname,
    lastname,
    nickName,
    avatarUrl,
    city,
    favoritePlate,
    description,
  } = userProfile;

  return (
    <LayoutCurrentUser pageTitle="Votre profil">
      <div className={style.profilPageContainer}>
        <PrivateHeader
          firstname={firstname}
          lastname={lastname}
          router={() => router.back()}
          title={nickName}
          rightElement={
            id === "me" && (
              <Link href="/profile/edit/">
                <img
                  src={editIcon.src}
                  alt="edit-icon"
                  className={style.editIcon}
                  style={{ cursor: "pointer" }}
                  data-cy="editLink"
                />
              </Link>
            )
          }
        />

        <div className={style.userInfoContainer}>
          <div className={style.imageContainer}>
            <img
              src={userProfile?.avatarUrl ? avatarUrl : avatar.src}
              alt="avatar"
              className={style.avatar}
            />
          </div>
          <div className={style.userInfoCard}>
            <div className={style.titleInfoCard}>
              <div className={style.textTitle}>A propos</div>
            </div>
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
              <span className={style.textDetail}>{city}</span>
            </div>
            <div className={style.detailInfoCard}>
              <img src={bol.src} alt="bol-icon" className={style.icon} />{" "}
              <span className={style.textDetail}>{favoritePlate}</span>
            </div>
          </div>
        </div>

        <div className={style.descriptionContainer}>
          <div className={style.titleDescription}>
            <span className={style.textTitleDescription}> Qui suis-je ?</span>
            {id === "me" && (
              <Link href="/profile/edit/">
                <img
                  src={editDarkIcon.src}
                  alt="edit-icon"
                  className={style.editDarkIcon}
                  style={{ cursor: "pointer" }}
                />
              </Link>
            )}
          </div>
          <div className={style.contentDescription}>{description}</div>
        </div>

        <div className={style.shareContainer} style={{ visibility: "hidden" }}>
          <div className={style.titleDescription}>
            {" "}
            <span className={style.textTitleDescription}>Mes partages...</span>
          </div>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            comming soon
          </div>
        </div>
      </div>
    </LayoutCurrentUser>
  );
};

export default Profile;
