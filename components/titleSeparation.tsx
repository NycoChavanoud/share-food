import style from "./styleComponents/TitleSeparation.module.css";

type titleProps = { content: string; title: string };

const TitleSeparation = ({ content, title }: titleProps) => {
  return (
    <div className={style.titleSeparationContainer}>
      <h3 className={style.titleSeparationTitle}>{title}</h3>
      <p className={style.titleSeparationContent}>{content}</p>
    </div>
  );
};

export default TitleSeparation;
