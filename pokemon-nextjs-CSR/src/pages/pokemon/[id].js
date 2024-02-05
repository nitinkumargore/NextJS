import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Details(){

    const {query:{id}} = useRouter();
    const BASE_API_PATH = 'http://localhost:3010';
    const [pokemon, setPokemon] = useState({});
  
    useEffect(()=>{
        async function getPokemon() {
            try{
            const resp = await fetch(BASE_API_PATH+`/assets/pokemon/${id}.json`);
            setPokemon(await resp.json());
            }catch(e){
            console.log(`Error in fetching ${id}.json`);
            }
        }
        if(id){
          getPokemon();
        }
    },[id]);


    return(
        <div>
            {pokemon?
                <>
                    <Link className="py-2" href="/">Back to Home</Link>
                    <div className="grid grid-cols-4 grid-gap-10">
                        <div className="col-span-1">
                            <img className="w-80" src={BASE_API_PATH+'/assets/'+pokemon.image}/>    
                        </div>
                        <div>
                            <div>
                                <div className="font-bold text-xl">{pokemon.name}</div>
                                <div>{pokemon?.type?.toString().replaceAll(',',', ')}</div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th className="text-left min-w-150">Name</th>
                                        <th className="text-center">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pokemon.stats?.map((p, i)=>
                                        (<tr key={p.name+'_'+i}>
                                            <td className="text-left">{p.name}</td>
                                            <td className="text-center">{p.value}</td>
                                        </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            :
                ''}
        </div>
    )
}