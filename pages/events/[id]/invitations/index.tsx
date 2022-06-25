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
import defaultAvatar from "../../../../public/img/avatar.png";
import InvitationsCard from "../../../../components/InvitationsCard";
import deleteIcon from "../../../../public/icons/deleteIcon.png";
import addIcon from "../../../../public/icons/plus.png";
import addAll from "../../../../public/icons/addAll.png";

import Image from "next/image";
import { IUser } from "../../../../models/user";

const EditInvitations: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUserProfile } = useContext(CurrentUserContext);
  const [guests, setGuests] = useState<IEvent[]>([]);
  const [event, setEvent] = useState<IEvent | null>();
  const [numberOfGuest, setNumberOfGuest] = useState<number>(0);
  const [allUsers, setAllUsers] = useState<IUser[] | null>([]);
  const [usersCanInvite, setUserCanInvite] = useState<IUser[]>([]);

  const idToFilter = guests?.map((g: IEvent) => g.guestId);
  const listTofilter: any | null = allUsers?.filter(
    (u: IUser) => u.id !== currentUserProfile?.id
  );

  const fetchGuestList = async () => {
    return await axios
      .get(`/api/invitations/${id}`)
      .then((res) => {
        setGuests(res.data);
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
  }, []);

  useEffect(() => {
    axios.get(`/api/users`).then((res) => setAllUsers(res.data));
  }, []);

  useEffect(() => {
    if (guests) {
      setNumberOfGuest(guests.length);
      setUserCanInvite(
        listTofilter.filter((i: any) => !idToFilter?.includes(i.id))
      );
    }
  }, [guests, allUsers]);

  const handleDelete = async (invitId: number) => {
    await axios.delete(`/api/invitations/${invitId}`).then(() => {
      const deletedUser = guests?.filter((g: any) => {
        return g.id !== invitId;
      });
      setGuests(deletedUser);
    });
  };

  const handleCreate = async (userId: string) => {
    await axios
      .post(`/api/invitations/`, {
        eventId: event?.id,
        guestId: userId,
        status: "PENDING",
      })
      .then(() => fetchGuestList());
  };
  console.log(
    "guests :, ",
    guests,
    "allusers :",
    allUsers,
    "userscznInvite :",
    usersCanInvite
  );

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
              ? `nombre d'invités : ${numberOfGuest} `
              : "aucun invité pour votre évènement"
          }
          content={
            guests?.length !== 0 ? "vous pouvez supprimer des invitations" : ""
          }
        />

        {guests?.length !== 0 ? (
          <>
            <div className={style.invitationsContainer}>
              {guests?.map((invit: any, index: number) => {
                return (
                  <div key={invit.id} className={style.listGuestsContainer}>
                    <InvitationsCard
                      firstname={invit.guest.firstname}
                      lastname={invit.guest.lastname}
                      id={invit.guest.id}
                      avatarUrl={
                        !invit.guest.avatarUrl
                          ? defaultAvatar.src
                          : invit.guest.avatarUrl
                      }
                    />
                    {event?.authorId === currentUserProfile?.id && (
                      <button
                        className={style.deleteBtn}
                        onClick={() => handleDelete(invit.id)}
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
          </>
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

        {usersCanInvite?.length !== 0 ? (
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
              {usersCanInvite?.map((inviting: IUser, index: any) => {
                return (
                  <div key={index} className={style.listGuestsContainer}>
                    <InvitationsCard
                      firstname={inviting.firstname}
                      lastname={inviting.lastname}
                      avatarUrl={
                        !inviting.avatarUrl
                          ? defaultAvatar.src
                          : inviting.avatarUrl
                      }
                      id={inviting.id}
                    />
                    {event?.authorId === currentUserProfile?.id && (
                      <button
                        className={style.deleteBtn}
                        onClick={() => handleCreate(inviting.id)}
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
