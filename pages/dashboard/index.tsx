import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";

const Dashboard: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="tableau de bord">
      <BackBtn />
    </LayoutCurrentUser>
  );
};

export default Dashboard;
