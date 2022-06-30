import style from "./styleComponents/PublicHeader.module.css";
import Link from "next/link";
import head from "../public/img/head.jpg";

type titleProps = { title: string; link: string };

const PublicHeader = ({ title, link }: titleProps) => {
  return (
    <>
      <Link passHref href={link}>
        <div
          className={style.headContainer}
          style={{
            backgroundImage: `url(${head.src})`,
            height: "235px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h1 className={style.headTitle}>{title}</h1>
        </div>
      </Link>
    </>
  );
};

export default PublicHeader;
