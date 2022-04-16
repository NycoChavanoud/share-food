import type { NextPage } from "next";
import style from "../styles/Home.module.css";
import HomeCard from "../components/HomeCard";
import Layout from "../components/Layout";
import PublicHeader from "../components/PublicHeader";
import RegisterBtn from "../components/RegisterBtn";
import food from "../public/img/food.jpg";
import crew from "../public/img/crew.jpg";
import money from "../public/img/money.jpg";
import calendar from "../public/img/calendar.jpg";
import HomeBtns from "../components/HomeBtns";
import { useEffect, useRef, useState } from "react";
import TopBtn from "../components/TopBtn";

const Home: NextPage = (props) => {
  const srcFood = food.src;
  const srcCrew = crew.src;
  const srcMoney = money.src;
  const srcCalendar = calendar.src;

  const [top, setTop] = useState();

  const topPage = useRef<any>();

  const topToPage = () => {
    setTop(
      topPage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    );
  };

  return (
    <>
      <div className={style.scrollContainer}>
        <Layout pageTitle="Accueil">
          <div ref={topPage}></div>
          <PublicHeader title="Cook of the day" link="/" />

          <HomeBtns />
          <div className={style.HomeCardContainer}>
            <HomeCard
              title="C’est vous le chef..."
              link={srcFood}
              content="Partagez avec vos proches vos meilleures recettes. Liberez votre
          créativité culinaire et faites en profiter l'ensemble de votre
          comunaute."
              secondContent=" Developpez un véritable cahier de recette, pour que vos créations ne
          soient jamais oubliées."
            />
            <HomeCard
              title="Créer un groupe déj..."
              link={srcCrew}
              content="Organisez vos pauses déjeuner avec vos collègues, mais bien plus encore. Un restaurant, un anniversaire ou tout autres évènements. "
              secondContent=" Ne ratez plus une occasion pour partager un moment convivial avec vos proches."
            />
            <HomeCard
              title="Plannifier vos repas..."
              link={srcCalendar}
              content="Save the date! Vous avez prévu un évènement ?  Inviter vos groupes ou vos amis en quelques instants avec beaucoup de simplicité."
              secondContent=" Vous recevrez sans doute en retour des invitations pour des moments inoubliables. "
            />

            <HomeCard
              title="Vos budgets patagés..."
              link={srcMoney}
              content="Une soirée? Un repas? Communiquez facilement avec vos proches et partagez les frais de vos évènements."
              secondContent=" Les bons comptes font les bons amis. Mais bien sûr, il est toujours possible d'être grand seigneur. "
            />
          </div>

          <TopBtn scrollFunction={topToPage} />
          <RegisterBtn content="Se connecter " link="/login" />
        </Layout>
      </div>
    </>
  );
};

export default Home;
