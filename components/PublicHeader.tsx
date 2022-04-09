import style from "./styleComponents/PublicHeader.module.css"
import Link from "next/link";
import Head from 'next/head'



type titleProps = { title: string, link: string, titlePage: string }


const PublicHeader = ({ title, link, titlePage }: titleProps) => {
  return (
    <>
      <Head>
        <title>{titlePage}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>

      <Link passHref href={link}>
        <div className={style.headContainer}>
          <h1 className={style.headTitle} >{title}</h1>

        </div>
      </Link>
    </>
  )
}


export default PublicHeader