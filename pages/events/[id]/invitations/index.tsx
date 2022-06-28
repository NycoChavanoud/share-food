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
  const [guests, setGuests] = useState<IInvitation[]>([]);
  const [event, setEvent] = useState<IEvent>();
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [usersCanInvite, setUserCanInvite] = useState<IInvitation[]>([]);

  const fetchAllUsersWithourCurrentUser = () => {
    axios
      .get(`/api/users`)
      .then((res) =>
        setAllUsers(
          res.data.filter((u: IUser) => u.id !== currentUserProfile?.id)
        )
      )
      .catch(console.error);
  };

  const fetchGuestList = () => {
    axios
      .get(`/api/events/${id}/invitations`)
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
    fetchAllUsersWithourCurrentUser();
    fetchEvent();
  }, []);

  const handleAllUsersToShowListLikeGuests = allUsers?.map((u, index) => {
    return {
      id: index,
      guestId: u.id,
      eventId: event?.id,
      guests: { firstname: u.firstname, lastname: u.lastname },
    };
  });
  const filterList = handleAllUsersToShowListLikeGuests.filter((invit) => {
    console.log("EEEEEEE", invit);
    return invit.guestId !== guests.guestId;
  });

  useEffect(() => {
    setUserCanInvite(filterList);
  }, [guests]);
  // const handleDelete = (invitId: number) => {
  //   axios.delete(`/api/invitations/${invitId}`).catch(console.error);
  // };

  // const handleCreate = (userId: string) => {
  //   axios
  //     .post(`/api/invitations/`, {
  //       eventId: event?.id,
  //       guestId: userId,
  //       status: "PENDING",
  //     })
  //     .then((res) => setGuests([...guests, res.data]))
  //     .catch(console.error);
  // };
  console.log(event, guests, "&&", handleAllUsersToShowListLikeGuests);
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
          <>
            <div className={style.invitationsContainer}>
              {guests?.map((invit: any, index: number) => {
                return (
                  <div key={invit.id} className={style.listGuestsContainer}>
                    <InvitationsCard
                      firstname={invit.guest?.firstname}
                      lastname={invit.guest?.lastname}
                      id={invit.guest?.id}
                      avatarUrl={
                        !invit.guest?.avatarUrl
                          ? defaultAvatar.src
                          : invit.guest?.avatarUrl
                      }
                    />
                    {event?.authorId === currentUserProfile?.id && (
                      <button
                        className={style.deleteBtn}
                        // onClick={() => {
                        //   handleDelete(invit.id);
                        //   setGuests(
                        //     guests?.filter((g: any) => {
                        //       return g.id !== invit.id;
                        //     })
                        //   );
                        // }}
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
                console.log("OOOOOKEKEKEKEK :", inviting?.guests.firstname);

                return (
                  <div key={index} className={style.listGuestsContainer}>
                    <InvitationsCard
                      firstname={inviting.guests.firstname}
                      lastname={inviting.guests.lastname}
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
                        // onClick={() => {
                        //   handleCreate(inviting.id);
                        //   setUserCanInvite(
                        //     usersCanInvite?.filter((u) => {
                        //       return u.id !== inviting.id;
                        //     })
                        //   );
                        // }}
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
