"use client";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Home() {
  const BASE_API_PATH = 'http://localhost:3010';
  const [pokemon, setPokemon] = useState([]);

  useEffect(()=>{
    async function getPokemon() {
      try{
        const resp = await fetch(BASE_API_PATH+'/assets/index.json');
        console.log('resp =>',resp);
        setPokemon(await resp.json());
      }catch(e){
        console.log('Error in fetching index.json');
      }
    }
    getPokemon();
  },[]);

  return(
    <main className={`flex min-h-screen flex-col  justify-between p-24 ${inter.className}`}>
        <div className="grid grid-cols-4 grid-gap-10">
          {
            pokemon.map((pokemon)=>(
              <div key={pokemon.id}>
                <Link href={`/pokemon/${pokemon.id}`}>
                    <img className="w-60" 
                      src={`${BASE_API_PATH}/assets/${pokemon.image}`}
                      alt={pokemon.name}/>
                    <h3>{pokemon.name}</h3>
                </Link>
              </div>
            ))
          }
        </div>
    </main>
  )
}
