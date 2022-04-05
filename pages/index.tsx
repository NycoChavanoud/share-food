import type { NextPage } from 'next'
import NextAuth from './NextAuth'
import styles from '../styles/Home.module.css'

const Home: NextPage = (props) => {



  return (
    <div className={styles.container}>

     <NextAuth/>
    </div>
  )
}




export default Home

