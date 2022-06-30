import style from "../../../styles/Event.module.css";
import LayoutCurrentUser from "../../../components/LayoutCurrentUser";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import editDarkIcon from "../../../public/icons/editDark.png";
import add from "../../../public/icons/plus.png";
import Link from "next/link";
import axios from "axios";
import EventDetailHeader from "../../../components/EventDetailHeader";
import ValidateDelete from "../../../components/ValidateDelete";
import { useToasts } from "react-toast-notifications";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import CurrentUserContext from "../../../contexts/currentUserContext";
import InvitationsCard from "../../../components/InvitationsCard";
import defaultAvatar from "../../../public/img/avatar.png";
import { NextPage } from "next";

const EventDetail: NextPage = (props) => {
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
      .get(`/api/events/${id}/invitations`)
      .then((res) => setGuests(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchGuestList();
  }, [event]);

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
        rightElement={
          event.authorId === currentUserProfile?.id && (
            <Link href={`/events/edit/${id}`}>
              <img
                src={editDarkIcon.src}
                alt="edit-icon"
                className={style.editIcon}
                data-cy="editLink"
              />
            </Link>
          )
        }
      />
      <div className={style.descriptionDetailEventContainer}>
        <div className={style.titleDescription}>Description</div>
        <div className={style.detailDescription}>{event.description}</div>
        <div className={style.titleDescription}>Détails</div>
        {event.typeEvent !== " " ? (
          <div className={style.detailTypeEvent}>
            Cela se passe &quot;{event.typeEvent}&quot;
          </div>
        ) : (
          <div className={style.detailTypeEvent}>
            {" "}
            auncun détail particulier pour cet évènement
          </div>
        )}

        {guests?.length !== 0 ? (
          <>
            <div className={style.titleDescription}>
              <div className={style.titleWithEditContainer}>
                <div className={style.titleMembers}>
                  {" "}
                  Membres invités : {guests?.length}
                </div>
                {event.authorId === currentUserProfile?.id && (
                  <Link href={`/events/${id}/invitations`}>
                    <img
                      src={editDarkIcon.src}
                      className={style.editDarkIcon}
                      alt="edit-icon"
                      data-cy="editLink"
                    />
                  </Link>
                )}
              </div>
            </div>
            <div className={style.invitationsContainer}>
              {guests?.map((guest, index) => {
                return (
                  <InvitationsCard
                    key={index}
                    firstname={guest.guest.firstname}
                    lastname={guest.guest.lastname}
                    id={guest.guest.id}
                    avatarUrl={
                      !guest.guest.avatarUrl
                        ? defaultAvatar.src
                        : guest.guest.avatarUrl
                    }
                  />
                );
              })}
            </div>
          </>
        ) : (
          event.authorId === currentUserProfile?.id && (
            <Link href={`/events/${id}/invitations`}>
              <div className={style.addInvite}>
                aucun invités :
                <img
                  src={add.src}
                  alt="edit-icon"
                  className={style.editIcon}
                  data-cy="addInvitLink"
                />
              </div>
            </Link>
          )
        )}

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
