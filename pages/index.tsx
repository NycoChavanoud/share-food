import type { NextPage } from 'next'
import PublicHeader from '../components/PublicHeader'
import PublicMain from '../components/PublicMain'
import RegisterBtn from '../components/RegisterBtn'
import Head from 'next/head'



const Home: NextPage = (props) => {



  return (
    <>
      <Head>
        <title>Accueil</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <PublicHeader title='Cook of the day' link='/inscription' />
      <PublicMain />
      <RegisterBtn content='Se connecter ' link='/login' />

    </>
  )
}




export default Home

