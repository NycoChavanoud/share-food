import type { NextPage } from 'next'
import { useState } from 'react'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [name, setName]=useState('')
  const [mail, setMail]=useState('')
 const [result, setresult]=useState('')

  const alerteTest = ()=>{
    setresult('')
  }

  const handleSubmit = (e : any)=>{
    e.preventDefault()
    setresult(`${name}-${mail}`)
    setMail('')
    setName('')
    
  
  }
  

  return (
    <div className={styles.container}>
      <button onClick={alerteTest} data-cy="submit">Click</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input type="text" id='name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <label htmlFor="mail">Email</label>
        <input type="email" id="mail" value={mail} onChange={(e)=>setMail(e.target.value)} />
        <button type='submit' id='send'>ENVOYER</button>
      </form>
      {!result ? <span></span> : <span id="resultSpan">result : {result}</span>}
  
     
    </div>
  )
}

export default Home
