import style from "../../../styles/EditProfile.module.css";
import "dayjs/locale/fr";
import EditProfileForm from "../../../components/EditProfileForm";
import { useContext, useRef, useState } from "react";
import CurrentUserContext from "../../../contexts/currentUserContext";
import ValidateDelete from "../../../components/ValidateDelete";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { signOut } from "next-auth/react";
import LayoutCurrentUser from "../../../components/LayoutCurrentUser";
import { NextPage } from "next";

const index: NextPage = (props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteContainer, setDeleteContainer] = useState(false);
  const { addToast } = useToasts();
  const topPage = useRef<any>();
  const { currentUserProfile } = useContext(CurrentUserContext);
  const id = currentUserProfile?.id;

  const notifySuccess = () => {
    addToast("😢 Ton compte est supprimé", {
      appearance: "success",
    });
  };

  const handleConfirm = () => {
    return axios
      .delete(`/api/profile/${id}`)
      .then(() =>
        signOut({
          callbackUrl: `/login`,
        })
      )
      .then(() => notifySuccess())
      .then(() => setDeleteContainer(!deleteContainer))
      .catch((err) => console.error(err.response.status));
  };

  return (
    <LayoutCurrentUser pageTitle="Edition de profil">
      {openDelete && (
        <button
          className={style.deleteAccountBtn}
          data-cy="btnDelete"
          onClick={() => {
            setDeleteContainer(!deleteContainer);
          }}
        >
          Supprimer son compte
        </button>
      )}
      {deleteContainer ? (
        <ValidateDelete
          deleteContainer={deleteContainer}
          setDeleteContainer={setDeleteContainer}
          type={"votre compte"}
          message={
            "cette action est irréversible et supprimera votre compte utilisateur de manière définitive"
          }
          handleDelete={handleConfirm}
        />
      ) : null}
      <div ref={topPage} className={style.editProfileContainer}>
        <EditProfileForm />

        <div
          onClick={() => {
            setOpenDelete(!openDelete);
            topPage.current.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className={style.deleteOpenMessage}
        >
          {openDelete ? (
            <span style={{ fontSize: "1.4em", fontWeight: "bolder" }}>
              {" "}
              Ne pas supprimer mon compte
            </span>
          ) : (
            <span data-cy="deleteQuestion">
              {" "}
              Vous souhaitez supprimer définitivement votre compte?
            </span>
          )}
        </div>
      </div>
    </LayoutCurrentUser>
  );
};

export default index;
