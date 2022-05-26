import Link from "next/link";
import { IUser } from "../models/user";
import style from "./styleComponents/InvitationsCard.module.css";

const InvitationsCard = ({
  firstname,
  lastname,
  avatarUrl,
  id,
}: Partial<IUser>) => {
  return (
    <Link href={`/profile/${id}`}>
      <div className={style.invitationsCardContainer}>
        <div className={style.nameContainer}>
          {firstname} {lastname}
        </div>
        <div className={style.imageContainer}></div>
        <div className={style.imageContainer}>
          <img src={avatarUrl} alt={lastname} className={style.avatar} />
        </div>
      </div>
    </Link>
  );
};

export default InvitationsCard;
