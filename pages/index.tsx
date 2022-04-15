import type { NextPage } from "next";
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
          content="Partagez avec vos proches vos meilleures recettes. Liberez votre
          créativité culinaire et faites en profiter l'ensemble de votre
          comunaute."
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

        <RegisterBtn content="Se connecter " link="/login" />
      </Layout>
    </>
  );
};

export default Home;
