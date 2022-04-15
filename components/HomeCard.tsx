import style from "./styleComponents/HomeCard.module.css";

type publicMainProps = {
  title: string;
  link: any;
  content: string;
  secondContent: string;
};

const HomeCard = ({ title, link, content, secondContent }: publicMainProps) => {
  return (
    <div className={style.cardContainer}>
      <h2 className={style.titleHome}>{title}</h2>
      <div
        className={style.imageContainer}
        style={{
          backgroundImage: `url(${link})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className={style.textHome}>
        <p className={style.pHome}>{content}</p>
        <p className={style.pHome}>{secondContent}</p>
      </div>
    </div>
  );
};

export default HomeCard;
