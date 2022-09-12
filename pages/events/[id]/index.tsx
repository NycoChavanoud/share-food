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
import InvitationsManager from "../../../components/InvitationsManager";
import RemoveInvitation from "../../../components/RemoveInvitation";
import { IEvent } from "../../../models/event";
import { Loading } from "../../../components/Loading";
import { IInvitation } from "../../../models/invitations";
import { IUser } from "../../../models/user";

const EventDetail: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<IEvent | null>(null);
  const [guests, setGuests] = useState<IInvitation[] | null>(null);
  const [deleteContainer, setDeleteContainer] = useState(false);
  const { addToast } = useToasts();
  const { currentUserProfile } = useContext(CurrentUserContext);
  const [inviteIdOfCurrentUser, setInviteIdOfCurrentUser] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`/api/events/${id} `)
      .then((res) => setEvent(res.data))
      .catch(console.error);
  }, [id]);

  const fetchGuestList = () => {
    axios
      .get(`/api/events/${id}/invitations`)
      .then((res) => setGuests(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchGuestList();
  }, [event]);

  useEffect(() => {
    if (currentUserIsNotAcceptedStatus) {
      const invitation = guests?.filter((i) =>
        i.guestId.includes(currentUserId)
      );
      if (invitation) setInviteIdOfCurrentUser(invitation[0].id);
    }
  }, [guests]);

  if (!currentUserProfile) return null;

  const notifySuccess = () => {
    addToast("🦄 Ton évènement est supprimé", {
      appearance: "success",
    });
  };

  const handleConfirm = () => {
    return axios
      .delete(`/api/events/${id}`)
      .then(() => router.push("/events"))
      .then(() => notifySuccess())
      .then(() => setDeleteContainer(!deleteContainer))
      .catch((err) => console.error(err.response.status));
  };

  const dateFormat = dayjs(event?.date)
    .locale("fr")
    .format("dddd DD MMMM YYYY");

  const invitationsAccepted = guests?.filter((g) => g.status === "ACCEPTED");

  const currentUserId = currentUserProfile?.id;
  const showInvitationManager = guests?.filter(
    (g) => g.status === "PENDING" || g.status === "REFUSED"
  );

  const currentUserIsNotAcceptedStatus = showInvitationManager?.some((i) =>
    i.guestId.includes(currentUserId)
  );

  if (!event) return <Loading />;

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
        id={event.id.toString()}
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

        {invitationsAccepted?.length !== 0 &&
        !currentUserIsNotAcceptedStatus ? (
          <>
            <div className={style.titleDescription}>
              <div className={style.titleWithEditContainer}>
                <div className={style.titleMembers}>
                  <div>
                    Membres déja présents : {invitationsAccepted?.length}
                  </div>
                  <div className={style.subtitle}>
                    {" "}
                    total d'invités possibles {guests?.length}{" "}
                  </div>
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
              {invitationsAccepted?.map((guest, index) => {
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

            {event.authorId !== currentUserProfile?.id && <RemoveInvitation />}
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

        {currentUserIsNotAcceptedStatus &&
          event.authorId !== currentUserProfile?.id && (
            <InvitationsManager id={inviteIdOfCurrentUser} />
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
