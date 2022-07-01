import style from "./styleComponents/InviteCard.module.css";
import acceptedIcon from "../public/icons/valide.png";
import refusedIcon from "../public/icons/annule.png";
import pendingIcon from "../public/icons/pending.png";
import Image from "next/image";
import Link from "next/link";

type PropsInviteCard = {
  linkId: number;
  title: string;
  date: string;
  hour: string;
  status: string;
};

const InviteCard = ({ linkId, title, date, hour, status }: PropsInviteCard) => {
  return (
    <div className={style.inviteCardContainer}>
      <div className={style.dateContainer}>
        <div className={style.dateInviteCard}>
          <span className={style.boldText}> {date}</span> à{" "}
          <span className={style.boldText}> {hour}</span>
        </div>
      </div>
      <div className={style.titleInviteContainer}>
        <Link href={`/events/${linkId}`}>
          <span className={style.titleCardInvite}>{title}</span>
        </Link>
        <span className={style.iconContainer}>
          {status === "PENDING" ? (
            <Image
              src={pendingIcon}
              width={30}
              height={30}
              alt="logo-pending"
            />
          ) : status === "ACCEPTED" ? (
            <Image
              src={acceptedIcon}
              width={35}
              height={35}
              alt="logo-accepted"
            />
          ) : (
            <Image
              src={refusedIcon}
              width={35}
              height={35}
              alt="logo-refused"
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default InviteCard;
