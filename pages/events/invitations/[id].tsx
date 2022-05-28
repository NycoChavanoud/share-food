import { NextPage } from "next";
import { useRouter } from "next/router";
import LayoutCurrentUser from "../../../components/LayoutCurrentUser";
import PrivateHeader from "../../../components/PrivateHeader";
import CurrentUserContext from "../../../contexts/currentUserContext";
import TitleSeparation from "../../../components/TitleSeparation";
import { useContext, useEffect, useState } from "react";
import style from "../../../styles/EditEvent.module.css";
import axios from "axios";
import { IEvent } from "../../../models/event";

const EditInvitations: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUserProfile } = useContext(CurrentUserContext);
  const [guestList, setGuestList] = useState();
  const [event, setEvent] = useState<IEvent | null>();

  const fetchGuestList = () => {
    axios
      .get(`/api/invitations/${id}`)
      .then((res) => {
        setGuestList(res.data);
      })
      .catch(console.error);
  };

  const fetchEvent = () => {
    axios
      .get(`/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchGuestList();
    fetchEvent();
  }, [id]);

  return (
    <LayoutCurrentUser
      pageTitle={`invitations : ${event ? event.title : "de l'évènement"} `}
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
          content={`Merci de préciser pour l’ensemble de vos hôtes pour ${
            event ? event.title : " votre évènement"
          } `}
        />
      </div>
    </LayoutCurrentUser>
  );
};

export default EditInvitations;
