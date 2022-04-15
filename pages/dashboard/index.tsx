import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import Wip from "../../components/Wip";

const Dashboard: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="tableau de bord">
      <BackBtn />
      <h1>Dashboard</h1>
      <Wip />
    </LayoutCurrentUser>
  );
};

export default Dashboard;
