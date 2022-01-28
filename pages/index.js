import Head from 'next/head'
import Link from "next/link"
import styles from '../styles/Home.module.css'
import {SearchIcon} from "@heroicons/react/solid"
import { useEffect, useState } from 'react';
const defaultEndpoint = "https://rickandmortyapi.com/api/character/";


export async function getServerSideProps(){
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

export default function Home({data}) {



  const {info,results: defaultResults = []} = data;

  const [audio,setAudio] = useState("");
  useEffect(() => {
    setAudio(new Audio("rigidi.mp3"));
        
  }, [])
  const [results , updateResults] = useState(defaultResults)
  const [page , updatePage] = useState({
    ...info,
    current: defaultEndpoint
  });
  
  const { current } = page; 


  useEffect(() => {

    if ( current === defaultEndpoint) return;
    async function request(){
      const res = await fetch(current);
      const nextData = await res.json();
      updatePage({
        current,
        ...nextData.info
      });
      if (!nextData.info?.prev){
        updateResults(nextData.results);
        return;
      }

      updateResults(prev => {
        return [
          ...prev,
          ...nextData.results
        ]
      });
    }
    request();
  },[current])

 
  


  function playMusic(){
    audio.muted = true;
    audio.muted = false;
    audio.play()
    
    
  }
  function stopMusic(){
    audio.pause();
    audio.currentTime = 0;
  }
  
  function handleLoadMore(){
    updatePage(prev => {
      return {
        ...prev,
        current : page?.next

      }
    });
  }


  function handleSearch(e){
    e.preventDefault();
    const { currentTarget  = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find(field => field.name === "query");
    const value = fieldQuery.value || "";
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;
    
    updatePage({
      current: endpoint
    })
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Wubba Lubba Dub dub!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Creepster&display=swap" rel="stylesheet"/>
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
         Wubba Lubba Dub dub!
        </h1>
        
        <p>
          <img onClick={playMusic} onMouseEnter={playMusic} onMouseLeave={stopMusic} className={styles.rick + " cursor-pointer"} src="/rick.png" alt='rick' />
        </p>
       
        <p className={styles.description + " text-5xl font-bold" }>  
          Rick and Morty Wiki!
        </p>
          
        
        
      <form className={styles.search + "space-x-0 flex align-center ml-16"} onSubmit = {handleSearch}>
        
        <input className='h-12 w-96 rounded-md  text-xl border-[3px] border-solid border-gray-300 focus:outline-none focus:border-[3px] focus:border-[#aae1fa] focus:border-t-[#aae1fa]' name='query' type="search" />
        <button className='bg-white border-0 h-12  '><SearchIcon className='text-[#aae1fa] h-12 cursor-pointer' /></button>

        
      </form>
        <ul className={styles.grid}>
          {
          results?.map(result => {
            const {id , name , image} = result;

            return ( 
             
              <li key={id} className={styles.card + " text-lg"}> 
              <Link href="/character/[id]" as={`/character/${id}`}>
                <a>
                  <img src={image} alt={name + " Thumb"} />
                  <h3 className=" first-letter:text-[#aae1fa] ">{name}</h3>
                </a>
                </Link>
              </li>
              
            )
          })}
          
        </ul>
        <p>
        <button className="bg-white text-xl font-bold cursor-pointer hover:text-white hover:bg-[#47c4fd] border-solid border-[0.5px] border-[#47c4fd] rounded-lg w-36 h-12 text-[#47c4fd]" onClick={handleLoadMore}>
            Load More
        </button>
      </p>
      </main>
      
    </div>
  )
}
