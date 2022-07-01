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

const invitations: NextPage = (props) => {
  const router = useRouter();
  const { currentUserProfile } = useContext(CurrentUserContext);
  const [invitations, setInvitations] = useState<IInvitation[]>([]);

  const fetchInvitations = () => {
    axios.get(`/api/invitations/`).then((res) => setInvitations(res.data));
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
        <div className={style.invitationManagerContainer}>
          {invitations.map((i: any) => {
            const dateFormat = dayjs(i.event.date)
              .locale("fr")
              .format("dddd DD MMMM YYYY");
            console.log(i);

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
