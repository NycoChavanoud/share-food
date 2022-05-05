import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";

const Crew: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="Vos groupes">
      <BackBtn />
    </LayoutCurrentUser>
  );
};

export default Crew;
