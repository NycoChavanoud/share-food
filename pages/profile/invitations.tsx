import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from "../../styles/InvitationsPage.module.css";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import PrivateHeader from "../../components/PrivateHeader";
import CurrentUserContext from "../../contexts/currentUserContext";
import axios from "axios";
import { IInvitation } from "../../models/invitations";
import InviteCard from "../../components/InviteCard";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import acceptedIcon from "../../public/icons/valide.png";
import refusedIcon from "../../public/icons/annule.png";
import pendingIcon from "../../public/icons/pending.png";
import reset from "../../public/icons/reset.png";

import Image from "next/image";

const invitations: NextPage = (props) => {
  const router = useRouter();
  const { currentUserProfile } = useContext(CurrentUserContext);
  const [invitations, setInvitations] = useState<IInvitation[]>([]);
  const [filter, setFilter] = useState<string>("PENDING");
  const [isActive, setIsActive] = useState<Boolean>(true);

  const fetchInvitations = () => {
    axios.get(`/api/invitations/`).then((res) => setInvitations(res.data));
  };

  const translateStatus = () => {
    if (filter === "PENDING") return <span>Invitations en attentes</span>;
    if (filter === "ACCEPTED") return <span>Invitations en acceptées</span>;
    if (filter === "REFUSED") return <span>Invitations en refusées</span>;
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  return (
    <LayoutCurrentUser pageTitle="Gestion des invitations">
      <div className={style.InvitationPageContainer}>
        <PrivateHeader
          firstname={currentUserProfile?.firstname}
          lastname={currentUserProfile?.lastname}
          title="Gestion des invitations"
          router={() => {
            router.push("/events");
          }}
        />
        <div className={style.inviteTitle}> Gestion des invitations </div>
        <div className={style.legendIcons}>
          <div
            className={
              filter === "PENDING" ? style.selectedIcon : style.iconsAndText
            }
            onClick={() => {
              setIsActive(true);
              setFilter("PENDING");
            }}
          >
            <Image
              src={pendingIcon}
              width={33}
              height={33}
              alt="logo-pending"
            />
            <div className={filter === "PENDING" ? "" : style.txtOpacity}>
              en attente
            </div>
          </div>
          <div
            className={
              filter === "ACCEPTED" ? style.selectedIcon : style.iconsAndText
            }
            onClick={() => {
              setIsActive(true);
              setFilter("ACCEPTED");
            }}
          >
            <Image
              src={acceptedIcon}
              width={35}
              height={35}
              alt="logo-accepted"
            />
            <div className={filter === "ACCEPTED" ? "" : style.txtOpacity}>
              accepté
            </div>
          </div>
          <div
            className={
              filter === "REFUSED" ? style.selectedIcon : style.iconsAndText
            }
            onClick={() => {
              setIsActive(true);
              setFilter("REFUSED");
            }}
          >
            <Image
              src={refusedIcon}
              width={35}
              height={35}
              alt="logo-refused"
            />
            <div className={filter === "REFUSED" ? "" : style.txtOpacity}>
              refusé
            </div>
          </div>
          <div
            className={isActive ? style.iconsAndText : style.selectedIcon}
            onClick={() => {
              setIsActive(false);
              setFilter("");
            }}
          >
            <Image src={reset} width={35} height={35} alt="logo-refused" />
            <div className={!isActive ? "" : style.txtOpacity}>tout</div>
          </div>
        </div>

        <div className={style.inviteTitle}>
          {isActive ? translateStatus() : <span>Tous les évènements</span>}
        </div>
        <div className={style.invitationManagerContainer}>
          {invitations
            .filter((list) => list.status === (isActive ? filter : list.status))
            .map((i: any) => {
              const dateFormat = dayjs(i.event.date)
                .locale("fr")
                .format("dddd DD MMMM YYYY");
              return (
                <div key={i.id}>
                  <InviteCard
                    linkId={i.event.id}
                    title={i.event.title}
                    date={dateFormat}
                    hour={i.event.hour}
                    status={i.status}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </LayoutCurrentUser>
  );
};

export default invitations;
