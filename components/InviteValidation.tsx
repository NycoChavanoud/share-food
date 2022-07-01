import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IInvitation } from "../models/invitations";
import style from "./styleComponents/InviteValidation.module.css";

const InviteValidation = () => {
  const [invitations, setInvitations] = useState<IInvitation[]>([]);
  useEffect(() => {
    axios.get(`/api/invitations/`).then((res) => setInvitations(res.data));
  }, []);

  return (
    <Link href={"/profile/invitations"}>
      <div
        className={
          invitations.length !== 0
            ? style.InviteValidationContainer
            : style.InviteValidationContainerAtZero
        }
      >
        <div className={style.textInvitations}>
          {" "}
          {invitations.length !== 0 ? (
            <span> Invitations en attentes </span>
          ) : (
            <span> aucune invitations en cours </span>
          )}
        </div>
        <div
          className={
            invitations.length !== 0
              ? style.numberOfInvitations
              : style.numberOfInvitationsAtZero
          }
        >
          {invitations.length}
        </div>
      </div>
    </Link>
  );
};

export default InviteValidation;
