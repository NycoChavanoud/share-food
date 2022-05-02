import { NextPage } from "next";
import { useRouter } from "next/router";
import BackBtn from "../../components/BackBtn";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import ProfilCard from "../../components/ProfilCard";

const Dashboard: NextPage = (props) => {
  const router = useRouter();
  return (
    <LayoutCurrentUser pageTitle="tableau de bord">
      <BackBtn />
      <h1>Dashboard</h1>
      <ProfilCard />
      <button onClick={() => router.push("/profile")}>LIEN PROVISOIRE</button>
    </LayoutCurrentUser>
  );
};

export default Dashboard;
