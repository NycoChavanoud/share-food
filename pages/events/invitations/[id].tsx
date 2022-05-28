import { NextPage } from "next";
import { useRouter } from "next/router";
import LayoutCurrentUser from "../../../components/LayoutCurrentUser";
import PrivateHeader from "../../../components/PrivateHeader";
import CurrentUserContext from "../../../contexts/currentUserContext";
import TitleSeparation from "../../../components/TitleSeparation";
import { useContext, useEffect, useState } from "react";
import style from "../../../styles/EditEvent.module.css";
import axios from "axios";

const EditInvitations: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUserProfile } = useContext(CurrentUserContext);
  const [guestList, setGuestList] = useState();
  const [title, setTitle] = useState();

  const fetchGuestList = () => {
    axios
      .get(`/api/invitations/${id}`)
      .then((res) => {
        setGuestList(res.data);
        setTitle(res.data[0].event.title);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchGuestList();
  }, [id]);

  console.log(title, guestList);

  return (
    <LayoutCurrentUser
      pageTitle={`invitations : ${title ? title : "de l'évènement"} `}
    >
      <div className={style.editEventPageContainer}>
        <PrivateHeader
          firstname={currentUserProfile?.firstname}
          lastname={currentUserProfile?.lastname}
          title={`Gestion des invités `}
          router={() => {
            router.back();
          }}
        />
        <TitleSeparation
          title="Détails de l’évènement"
          content="Merci de préciser pour l’ensemble de vos hôtes les détails de votre évènement"
        />
      </div>
    </LayoutCurrentUser>
  );
};

export default EditInvitations;
