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
    <div className={style.invitationsCardContainer}>
      <Link href={`/profile/${id}`}>
        <div className={style.imageContainer}>
          <img src={avatarUrl} alt={lastname} className={style.avatar} />
        </div>
      </Link>
      <div className={style.nameContainer}>
        {firstname} {lastname}
      </div>
    </div>
  );
};

export default InvitationsCard;
