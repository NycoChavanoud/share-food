import style from "./styleComponents/InvitationsManager.module.css";
import valideIcon from "../public/icons/valide.png";
import annuleIcon from "../public/icons/annule.png";
import Image from "next/image";
import { IInvitation } from "../models/invitations";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import CurrentUserContext from "../contexts/currentUserContext";

const InvitationsManager = ({ id }: Partial<IInvitation>) => {
  const router = useRouter();
  const eventId = parseInt(router.query.id as string, 10);
  const { currentUserProfile } = useContext(CurrentUserContext);

  const handlePatchStatus = async (status: string) => {
    await axios
      .patch(`/api/invitations/`, {
        id: id,
        guestId: currentUserProfile?.id,
        eventId: eventId,
        status: status,
      })
      .then(() => router.push("/events"));
  };

  return (
    <div className={style.managerContainer}>
      <div className={style.titleDescription}>
        Souhaitez-vous participer à cet évènement?
      </div>
      <div className={style.buttonContainer}>
        <button
          className={style.buttonTransparent}
          onClick={() => {
            handlePatchStatus("REFUSED");
          }}
        >
          <Image
            src={annuleIcon}
            width={90}
            height={90}
            alt="logo-annulation"
          />
        </button>
        <button
          onClick={() => {
            handlePatchStatus("ACCEPTED");
          }}
          className={style.buttonTransparent}
          data-cy="validateBtn"
        >
          <Image
            src={valideIcon}
            width={90}
            height={90}
            alt="logo-validation"
          />
        </button>
      </div>
    </div>
  );
};

export default InvitationsManager;
