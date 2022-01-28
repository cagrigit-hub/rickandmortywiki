import Head from 'next/head'
import Link from "next/link"
import styles from '../../../styles/Home.module.css'
import {ArrowLeftIcon,ArrowRightIcon} from "@heroicons/react/outline"
const defaultEndpoint = "https://rickandmortyapi.com/api/character/";
export async function getServerSideProps({query}){
  const {id} = query;

  const res = await fetch(`${defaultEndpoint}/${id}`);
  const data = await res.json();
  return {
    props: {
      data,
      query
    }
  }
}

export default function Character({data,query}) {
  const {name,image,gender,location,origin,species,status} = data;
  const randomNumGenerator = () => {
    let random = Math.floor(Math.random() * 826) + 1;
    return random;
  }
  return (
    <div className={styles.container + " flex"}>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Creepster&display=swap" rel="stylesheet"/>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
         {name}
        </h1>
        <div className={styles.profile + " flex lg:flex-row justify-center items-center mb-4  "}>
          <div className={styles.profileImage}>
            <img className='rounded-xl' src={image} alt={name} />
          </div>

          <div className={styles.profileDetails + " flex flex-col space-y-1"}>
            <h2 className='m-0'> Character Details</h2>
            
            <p className='text-xl'><strong>Name:</strong> {name}</p>
            
            <p className='text-xl'><strong>Status:</strong> <span className={status === "Alive" ? "text-green-400" : "text-red-500"}>  {status}  </span></p>
            <p className='text-xl'><strong>Gender:</strong> {gender}</p>
            <p className='text-xl'><strong>Species:</strong> {species}</p>
            <p className='text-xl'><strong>Location:</strong> {location?.name}</p>
            <p className='text-xl'><strong>Originally From:</strong> {origin?.name}</p>
            
          </div>
        </div>


        <p className={styles.back + " space-y-2"}>
          <Link href="/"> 
          <a className="flex items-center justify-center text-center text-2xl no-underline cursor-default space-x-3">
            <ArrowLeftIcon className='h-8 cursor-pointer'/> <span className='mb-1'>back to all characters</span> 
          </a>
          </Link>
          <Link href="/character/[id]" as={`/character/${randomNumGenerator()}`}>
          <a className="flex items-center justify-center text-center text-2xl no-underline cursor-default space-x-3">
          <span className='mb-1'>to get random one</span>  <ArrowRightIcon className='h-8 cursor-pointer'/> 
          </a>
          </Link>

        </p>
      </main>
      
    </div>
  )
}
