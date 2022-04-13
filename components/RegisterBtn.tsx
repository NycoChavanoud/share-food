import style from "./styleComponents/RegisterBtn.module.css";
import Link from "next/link";

type registerProps = { content: string; link: string };

const RegisterBtn = ({ content, link }: registerProps) => {
  return (
    <Link passHref href={link}>
      <div className={style.registetBtnContainer}>
        <p className={style.contentBtn}>{content}</p>
      </div>
    </Link>
  );
};

export default RegisterBtn;
