import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import Layout from "../../components/Layout";

const Dashboard: NextPage = (props) => {
  return (
    <Layout pageTitle="tableau de bord">
      <BackBtn />

      <h1>Dashboard</h1>
    </Layout>
  );
};

export default Dashboard;
