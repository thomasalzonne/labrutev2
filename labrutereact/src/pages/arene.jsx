import { useObservable } from 'react-use';
import bruteService from '../services/brute.service.ts';
import { Link } from 'react-router-dom';

export default function Arene() {
    const brutes = useObservable(bruteService.brutestofight)
    const brute = useObservable(bruteService.mybrute)
    
    const getFight = (opponent) => {
        bruteService.opponent.next(opponent)
        bruteService.getFight()
    }

    return(
        <div className='p-3'>
            <div className="pt-3 flex h-full w-full text-white">
                {brutes?.length === 0?
                    <div className="w-full h-full flex">
                        <div className="w-fit m-auto">N'hésite pas à te créer une brute pour te mesurer aux autres</div>
                    </div>
                    :
                    <div className='grid grid-cols-3 w-full gap-4'>
                        {brutes?.map( brute => 
                            <div className='flex flex-col w-full bg-[#202531] p-4 rounded-xl'>
                                <div className='w-full'>
                                    <img className='w-1/4 m-auto' src={`https://avatars.dicebear.com/api/bottts/${brute.name}.svg`} alt="" />
                                </div>
                                <div className='mx-auto my-3'>
                                    {brute.name} Lv.{brute.level}
                                </div>
                                <div className='flex justify-evenly mt-4 mb'>
                                    <Link className='py-3 px-5 rounded-lg bg-slate-900' onClick={() => getFight(brute)} to={"/fight"}>
                                        Affronter
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}