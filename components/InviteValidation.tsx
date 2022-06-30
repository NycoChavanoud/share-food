import Link from "next/link";
import style from "./styleComponents/InviteValidation.module.css";

type PropsInvitationsComponent = {
  numberOfInvitationsPending: number;
};

const InviteValidation = ({
  numberOfInvitationsPending,
}: PropsInvitationsComponent) => {
  return (
    <Link href={"/profile/invitations"}>
      <div className={style.InviteValidationContainer}>
        <div className={style.textInvitations}> Invitations en attentes</div>
        <div className={style.numberOfInvitations}>
          {numberOfInvitationsPending}
        </div>
      </div>
    </Link>
  );
};

export default InviteValidation;
