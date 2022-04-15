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

const Home: NextPage = (props) => {
  const srcFood = food.src;
  const srcCrew = crew.src;
  const srcMoney = money.src;
  const srcCalendar = calendar.src;

  return (
    <>
      <Layout pageTitle="Accueil">
        <PublicHeader title="Cook of the day" link="/" />
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
            content="Organisez vos pauses déjeuner avec vos collègues, mais bien plus encore. "
            secondContent=" Developpez un véritable cahier de recette, pour que vos créations ne
          soient jamais oubliées."
          />
          <HomeCard
            title="Créer un groupe déj..."
            link={srcCalendar}
            content="Partagez avec vos proches vos meilleures recettes. Liberez votre
          créativité culinaire et faites en profiter l'ensemble de votre
          comunaute."
            secondContent=" Developpez un véritable cahier de recette, pour que vos créations ne
          soient jamais oubliées."
          />
          <HomeCard
            title="Créer un groupe déj..."
            link={srcMoney}
            content="Partagez avec vos proches vos meilleures recettes. Liberez votre
          créativité culinaire et faites en profiter l'ensemble de votre
          comunaute."
            secondContent=" Developpez un véritable cahier de recette, pour que vos créations ne
          soient jamais oubliées."
          />
        </div>

        <RegisterBtn content="Se connecter " link="/login" />
      </Layout>
    </>
  );
};

export default Home;
