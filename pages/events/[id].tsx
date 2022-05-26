import style from "../../styles/Event.module.css";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import EventDetailHeader from "../../components/EventDetailHeader";
import ValidateDelete from "../../components/ValidateDelete";
import { useToasts } from "react-toast-notifications";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import CurrentUserContext from "../../contexts/currentUserContext";
import InvitationsCard from "../../components/InvitationsCard";

const EventDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<any>("");
  const [guests, setGuests] = useState<any[] | null>(null);
  const [deleteContainer, setDeleteContainer] = useState(false);
  const { addToast } = useToasts();
  const { currentUserProfile } = useContext(CurrentUserContext);

  const notifySuccess = () => {
    addToast("🦄 Ton évènement est supprimé", {
      appearance: "success",
    });
  };

  useEffect(() => {
    axios
      .get(`/api/events/${id} `)
      .then((res) => setEvent(res.data))
      .catch(console.error);
  }, [id]);

  const handleConfirm = () => {
    return axios
      .delete(`/api/events/${id}`)
      .then(() => router.push("/events"))
      .then(() => notifySuccess())
      .then(() => setDeleteContainer(!deleteContainer))
      .catch((err) => console.error(err.response.status));
  };

  const dateFormat = dayjs(event.date).locale("fr").format("dddd DD MMMM YYYY");

  const fetchGuestList = () => {
    axios
      .get(`/api/invitations`)
      .then((res) => setGuests(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchGuestList();
  }, []);

  console.log(guests);

  return (
    <LayoutCurrentUser pageTitle={`évènement : ${event.title}`}>
      {deleteContainer ? (
        <ValidateDelete
          deleteContainer={deleteContainer}
          setDeleteContainer={setDeleteContainer}
          type={"cet évènement"}
          message={"cette action est irréversible et supprimera l’évènement"}
          handleDelete={handleConfirm}
        />
      ) : null}

      <EventDetailHeader
        title={event.title}
        date={dateFormat}
        hour={event.hour}
        address={event.address}
        id={event.id}
        author={event.author}
      />
      <div className={style.descriptionDetailEventContainer}>
        <div className={style.titleDescription}>Description</div>
        <div className={style.detailDescription}>{event.description}</div>
        <div className={style.titleDescription}>Détails</div>
        <div className={style.detailTypeEvent}>
          Cela se passe &quot;{event.typeEvent}&quot;
        </div>

        <InvitationsCard />

        {event.authorId === currentUserProfile?.id && (
          <>
            <button
              onClick={() => {
                setDeleteContainer(!deleteContainer);
              }}
              className={style.btnDeleteEvent}
              data-cy="btnDelete"
            >
              SUPPRIMER
            </button>
          </>
        )}
      </div>
    </LayoutCurrentUser>
  );
};

export default EventDetail;
