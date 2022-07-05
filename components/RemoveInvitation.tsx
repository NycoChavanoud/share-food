import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/currentUserContext";
import { IInvitation } from "../models/invitations";
import { IUser } from "../models/user";
import style from "./styleComponents/RemoveInvitation.module.css";
import ValidateDelete from "./ValidateDelete";

const RemoveInvitation = () => {
  const { currentUserProfile } = useContext(CurrentUserContext);
  const [deleteContainer, setDeleteContainer] = useState<Boolean>(false);
  const [guests, setGuests] = useState<IUser[]>([]);
  const [inviteId, setInviteId] = useState<string>();
  const router = useRouter();
  const eventId = router.query.id;

  const fetchInvitOfCurrentUser = () => {
    axios
      .get(`/api/events/${eventId}/invitations`)
      .then((res) => setGuests(res.data))
      .catch((err) => console.error(err.response.status));
  };

  useEffect(() => {
    fetchInvitOfCurrentUser();
  }, []);

  useEffect(() => {
    const currentUserInviteId = guests.filter(
      (g) => g.id !== currentUserProfile?.id
    )[0]?.id;
    setInviteId(currentUserInviteId);
  }, [guests]);

  console.log(inviteId, guests);

  const handleConfirm = async () => {
    axios
      .patch(`/api/invitations/`, {
        id: inviteId,
        guestId: currentUserProfile?.id,
        eventId: parseInt(eventId, 10),
        status: "REFUSED",
      })
      .then(() => setDeleteContainer(!deleteContainer))
      .then(() => router.push("/events"))
      .catch((err) => console.error(err.response.status));
  };

  return (
    <>
      <button
        className={style.removeBtn}
        onClick={() => {
          setDeleteContainer(!deleteContainer);
        }}
      >
        Annuler sa participation
      </button>
      {deleteContainer ? (
        <ValidateDelete
          deleteContainer={deleteContainer}
          setDeleteContainer={setDeleteContainer}
          type={"votre présence à l'évènement"}
          message={
            "vous pourez modifier votre choix dans la gestion des invitations"
          }
          handleDelete={handleConfirm}
        />
      ) : null}
    </>
  );
};

export default RemoveInvitation;
