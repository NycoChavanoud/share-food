import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import Wip from "../../components/Wip";

const Crew: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="Vos groupes">
      <BackBtn />
      <h1>Crew Page</h1>
      <Wip />
    </LayoutCurrentUser>
  );
};

export default Crew;
