import { NextPage } from "next";
import { useRouter } from "next/router";
import LayoutCurrentUser from "../../../../components/LayoutCurrentUser";
import PrivateHeader from "../../../../components/PrivateHeader";
import CurrentUserContext from "../../../../contexts/currentUserContext";
import TitleSeparation from "../../../../components/TitleSeparation";
import React, { useContext, useEffect, useState } from "react";
import style from "../../../../styles/EditEvent.module.css";
import axios from "axios";
import { IEvent } from "../../../../models/event";
import { IUser } from "../../../../models/user";
import defaultAvatar from "../../../../public/img/avatar.png";
import InvitationsCard from "../../../../components/InvitationsCard";
import deleteIcon from "../../../../public/icons/deleteIcon.png";
import addIcon from "../../../../public/icons/plus.png";
import addAll from "../../../../public/icons/addAll.png";
import Image from "next/image";
import { IInvitation } from "../../../../models/invitations";

const EditInvitations: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUserProfile } = useContext(CurrentUserContext);
  const [guests, setGuests] = useState<IUser[]>([]);
  const [event, setEvent] = useState<IEvent>();
  const [invitableUsers, setInvitableUsers] = useState<IUser[]>([]);
  const [invites, setInvites] = useState<IInvitation[]>([]);

  const fetchUsersAndData = async () => {
    const resInvites = await axios
      .get<IInvitation[]>(`/api/events/${id}/invitations`)
      .catch(console.error);

    const resUsers = await axios
      .get<IUser[]>(`/api/users`)
      .catch(console.error);

    if (resInvites && resUsers) {
      const allUsers = resUsers.data.filter(
        (u: IUser) => u.id !== currentUserProfile?.id
      );
      setGuests(
        allUsers.filter((u: IUser) =>
          resInvites.data.some((i) => i.guestId === u.id)
        )
      );
      setInvitableUsers(
        allUsers.filter(
          (u: IUser) => !resInvites.data.some((i) => i.guestId === u.id)
        )
      );
      setInvites(resInvites.data);
    }
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
    if (id) {
      fetchEvent();
    }
    fetchUsersAndData();
  }, [currentUserProfile, id]);

  const handleDelete = (u: IUser) => {
    console.log("delete :", u);
    setInvitableUsers([...invitableUsers, u]);
    const idTodelete = invites.find((item) => item.guestId === u.id)?.id;
    axios.delete(`/api/invitations/${idTodelete}`).catch(console.error);
  };

  const handleCreate = async (u: IUser) => {
    const fetchId = await axios.get(`/api/users/${u.id}`);
    console.log("create :", u);
    console.log("fetchIf :", fetchId);
    setGuests([...guests, u]);
    axios
      .post(`/api/invitations/`, {
        eventId: event?.id,
        guestId: u.id,
        status: "PENDING",
        guest: u,
      })
      .catch(console.error);
  };

  return (
    <LayoutCurrentUser
      pageTitle={`invitations : ${event ? event.title : "de l'évènement"} `}
    >
      <div className={style.editEventPageContainer}>
        <PrivateHeader
          firstname={currentUserProfile?.firstname}
          lastname={currentUserProfile?.lastname}
          title={`${event ? event.title : "Détails de l’évènement"}`}
          router={() => {
            router.back();
          }}
        />

        <TitleSeparation
          title={
            guests?.length !== 0
              ? `nombre d'invités : ${guests.length} `
              : "aucun invité pour votre évènement"
          }
          content={
            guests?.length !== 0 ? "vous pouvez supprimer des invitations" : ""
          }
        />

        {guests?.length !== 0 ? (
          <div className={style.invitationsContainer}>
            {guests?.map((u: IUser, index: number) => {
              return (
                <div key={u.id} className={style.listGuestsContainer}>
                  <InvitationsCard
                    firstname={u.firstname}
                    lastname={u.lastname}
                    id={u.id}
                    avatarUrl={u.avatarUrl || defaultAvatar.src}
                  />
                  {event?.authorId === currentUserProfile?.id && (
                    <button
                      className={style.deleteBtn}
                      onClick={() => {
                        handleDelete(u);
                        setGuests(guests.filter((g) => g.id !== u.id));
                      }}
                      data-cy={`deleteBtn${index}`}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Image
                        src={deleteIcon}
                        width={35}
                        height={35}
                        alt="logo-delete"
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={style.invitationTitle}>
            vous pouvez ajouter des invités à votre évènement{" "}
            <span
              style={{
                color: "var(--redColor)",
                fontSize: "1.2em",
                fontWeight: "bolder",
              }}
            >
              {event?.title}
            </span>
          </div>
        )}

        {invitableUsers?.length !== 0 ? (
          <>
            <div className={style.addAllContainer}>
              <div className={style.titleSeparationAddAll}>
                Gestion des invités
              </div>
              <button
                className={style.btnHandleList}
                style={{ visibility: "hidden" }}
              >
                <Image
                  src={addAll}
                  width={35}
                  height={35}
                  alt="logo-ajout-membre"
                />
              </button>
            </div>
            <div className={style.invitationTextContent}>
              ajouter des invités pour votre évènement. Seul les membres invités
              auront accès aux informations sur votre évènement.
            </div>
            <div className={style.invitationsContainer}>
              {invitableUsers?.map((u: IUser, index: any) => {
                return (
                  <div key={index} className={style.listGuestsContainer}>
                    <InvitationsCard
                      firstname={u.firstname}
                      lastname={u.lastname}
                      avatarUrl={u.avatarUrl || defaultAvatar.src}
                      id={u.id}
                    />
                    {event?.authorId === currentUserProfile?.id && (
                      <button
                        className={style.deleteBtn}
                        onClick={() => {
                          handleCreate(u);
                          setInvitableUsers(
                            invitableUsers.filter((g) => u.id !== g.id)
                          );
                        }}
                        data-cy={`addBtn${index}`}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Image
                          src={addIcon}
                          width={35}
                          height={35}
                          alt="logo-ajout-membre"
                        />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className={style.invitationTextContent}>
            Tous vos amis sont déjà invités à cet évènement.
          </div>
        )}
      </div>
    </LayoutCurrentUser>
  );
};

export default EditInvitations;
