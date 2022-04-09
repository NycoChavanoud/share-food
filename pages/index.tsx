import type { NextPage } from 'next'
import PublicHeader from '../components/PublicHeader'
import PublicMain from '../components/PublicMain'
import RegisterBtn from '../components/RegisterBtn'




const Home: NextPage = (props) => {



  return (
    <>

      <PublicHeader title='Cook of the day' link='/login' titlePage='Accueil' />
      <PublicMain />
      <RegisterBtn content='Se connecter ' link='/login' />

    </>
  )
}




export default Home

