import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";

const Crew: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="Vos groupes">
      <BackBtn />

      <h1>Crew Page</h1>
    </LayoutCurrentUser>
  );
};

export default Crew;
