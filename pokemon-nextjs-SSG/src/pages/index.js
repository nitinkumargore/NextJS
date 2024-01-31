"use client";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Link from "next/link";
const BASE_API_PATH = 'http://localhost:3010';

export async function getStaticProps(){
  const resp = await fetch(BASE_API_PATH+'/assets/index.json');
  const pokemon = await resp.json();

  return {props:{pokemon}};
}

export default function Home({pokemon}) {
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
