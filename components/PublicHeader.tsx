import style from "./styleComponents/PublicHeader.module.css";
import Link from "next/link";

type titleProps = { title: string; link: string };

const PublicHeader = ({ title, link }: titleProps) => {
  return (
    <>
      <Link passHref href={link}>
        <div className={style.headContainer}>
          <h1 className={style.headTitle}>{title}</h1>
        </div>
      </Link>
    </>
  );
};

export default PublicHeader;
