import style from "./styleComponents/InviteCard.module.css";
import AcceptedIcon from "../public/icons/valide.png";
import RefusedIcon from "../public/icons/annule.png";
import PendingIcon from "../public/icons/pending.png";

type PropsInviteCard = {
  title: string;
  date: string;
  hour: string;
  status: string;
};

const InviteCard = ({ title, date, hour, status }: PropsInviteCard) => {
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
        <span>
          {status === "PENDING" ? (
            <div>A</div>
          ) : status === "ACCEPTED" ? (
            <div>B</div>
          ) : (
            <div>C</div>
          )}
        </span>
      </div>
    </div>
  );
};

export default InviteCard;
