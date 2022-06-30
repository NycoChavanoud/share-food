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
        <span className={style.titleCardInvite}>{title}</span>{" "}
        <span className={style.iconContainer}>
          {status === "PENDING" ? (
            <Link href={`/events/${linkId}`}>
              <Image
                src={pendingIcon}
                width={35}
                height={35}
                alt="logo-pending"
              />
            </Link>
          ) : status === "ACCEPTED" ? (
            <Link href={`/events/${linkId}`}>
              <Image
                src={acceptedIcon}
                width={35}
                height={35}
                alt="logo-accepted"
              />
            </Link>
          ) : (
            <Link href={`/events/${linkId}`}>
              <Image
                src={refusedIcon}
                width={35}
                height={35}
                alt="logo-refused"
              />
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default InviteCard;
