import { useRouter } from "next/router";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Link from "next/link";

const BASE_API_PATH = 'http://localhost:3010';

export async function getServerSideProps({params}){
    const resp = await fetch(BASE_API_PATH+`/assets/pokemon/${params.id}.json`);
    return {props:{
        pokemon: await resp.json()
    }}
}

export default function Details({pokemon}){

    const {query:{id}} = useRouter();
    
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