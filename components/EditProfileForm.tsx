import axios from "axios";
import { useContext, useEffect, useState } from "react";
import style from "./styleComponents/EditProfileForm.module.css";
import avatar from "../public/img/avatar.png";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { Widget } from "@uploadcare/react-widget";
import CurrentUserContext from "../contexts/currentUserContext";
import { IUser } from "../models/user";
import { Loading } from "./Loading";

const EditProfileForm = () => {
  const [userProfile, setUserProfile] = useState<Partial<IUser>>();
  const router = useRouter();
  const { addToast } = useToasts();
  const { currentUserProfile, setCurrentUserProfile } =
    useContext(CurrentUserContext);

  const alterLocale = () => ({
    buttons: {
      choose: {
        files: {
          one: "Modifier votre avatar",
        },
      },
    },
  });

  const notify = () => {
    addToast("🦄 Super! tu as mis à jour ton profil", {
      appearance: "success",
    });
  };

  const faild = () => {
    addToast("bad news! ton profil n'a pas été mis à jour...", {
      appearance: "error",
    });
  };

  useEffect(() => {
    axios
      .get(`/api/profile/me`)
      .then((res) => setUserProfile(res.data))
      .catch(console.error);
  }, []);

  const handlePatchProfile = (e: any) => {
    e.preventDefault();
    if (userProfile)
      axios
        .patch(`/api/profile/me`, userProfile)
        .then(() =>
          setCurrentUserProfile({
            ...currentUserProfile,
            ...userProfile,
          } as IUser)
        )
        .then(() => notify())
        .then(() => router.push("/profile/me"))

        .catch((err) => {
          console.error(err);
          faild();
        });
  };

  if (!userProfile) return <Loading />;

  return (
    <>
      <form
        className={style.editFormContainer}
        onSubmit={handlePatchProfile}
        data-cy="formEditProfile"
      >
        <div className={style.userInfoContainer}>
          <label htmlFor="lastname" className={style.labelForm}>
            nom
          </label>
          <input
            type="text"
            id="lastname"
            data-cy="lastname"
            className={style.largeInputForm}
            required
            value={userProfile.lastname || " "}
            onChange={(e) => {
              setUserProfile({ ...userProfile, lastname: e.target.value });
            }}
            maxLength={40}
          />

          <label htmlFor="firstname" className={style.labelForm}>
            prénom
          </label>
          <input
            type="text"
            id="firstname"
            data-cy="firstname"
            className={style.largeInputForm}
            required
            value={userProfile.firstname || " "}
            onChange={(e) => {
              setUserProfile({ ...userProfile, firstname: e.target.value });
            }}
            maxLength={40}
          />
          <div className={style.inptuNickNameContainer}>
            <label htmlFor="nickName" className={style.labelLightForm}>
              pseudo
            </label>
            <input
              type="text"
              id="nickName"
              data-cy="nickName"
              className={style.lightInput}
              value={userProfile.nickName || " "}
              onChange={(e) => {
                setUserProfile({ ...userProfile, nickName: e.target.value });
              }}
              maxLength={40}
            />
          </div>
        </div>
        <div className={style.infoDetailsContainer}>
          <div>
            <div className={style.imageContainer}>
              <img
                src={userProfile.avatarUrl ? userProfile.avatarUrl : avatar.src}
                alt="avatar"
                className={style.avatar}
              />
            </div>

            <div className={style.widgetContainer}>
              <Widget
                publicKey={process.env.NEXT_PUBLIC_UPLOADCARE_KEY || ""}
                crop="150x150"
                multiple={false}
                localeTranslations={alterLocale()}
                value={userProfile.avatarUrl || ""}
                onChange={(file) => {
                  if (file.cdnUrl)
                    setUserProfile({ ...userProfile, avatarUrl: file.cdnUrl });
                }}
              />
            </div>
          </div>

          <div className={style.userInfoCard}>
            <div className={style.titleInfoCard}>
              <div className={style.textTitle}>A propos</div>
              <label htmlFor="birthday" className={style.labelInfoDetails}>
                anniversaire
              </label>
              <input
                type="date"
                id="birthday"
                data-cy="birthday"
                className={style.infoDetailsInput}
                value={userProfile.birthday || " "}
                onChange={(e) => {
                  setUserProfile({ ...userProfile, birthday: e.target.value });
                }}
              />
              <label htmlFor="city" className={style.labelInfoDetails}>
                localisation
              </label>
              <input
                type="text"
                id="city"
                data-cy="city"
                className={style.infoDetailsInput}
                value={userProfile.city || " "}
                onChange={(e) => {
                  setUserProfile({ ...userProfile, city: e.target.value });
                }}
              />
              <label htmlFor="favoritePlate" className={style.labelInfoDetails}>
                plat signature
              </label>
              <input
                type="text"
                id="favoritePlate"
                data-cy="favoritePlate"
                className={style.infoDetailsInput}
                value={userProfile.favoritePlate || " "}
                onChange={(e) => {
                  setUserProfile({
                    ...userProfile,
                    favoritePlate: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className={style.textDescriptionContainer}>
            <label htmlFor="description" className={style.labelDescriptionForm}>
              Description
            </label>
            <textarea
              id="description"
              data-cy="description"
              className={style.textareaForm}
              autoComplete="off"
              value={userProfile.description || " "}
              onChange={(e) => {
                setUserProfile({ ...userProfile, description: e.target.value });
              }}
              required
            />
          </div>
        </div>

        <button className={style.validationBtn}>Valider</button>
      </form>

      <button className={style.backBtn} onClick={() => router.back()}>
        retour
      </button>
    </>
  );
};

export default EditProfileForm;
