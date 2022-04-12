import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import Layout from "../../components/Layout";

const Friend: NextPage = (props) => {
  return (
    <Layout pageTitle="Vos amis">
      <BackBtn />

      <h1>Friend Page</h1>
    </Layout>
  );
};

export default Friend;
