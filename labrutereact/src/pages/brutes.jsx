import {useObservable} from 'react-use';
import bruteService from '../services/brute.service.ts';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { Link } from 'react-router-dom';


export default function Brutes() {
    const brutes = useObservable(bruteService.brutes)
    const { handleSubmit, register} = useForm()
    const dialog = useRef()
    const openBruteForm = () => {
        dialog.current.showModal()
    }
    
    const createBrute = (values) => {
        bruteService.generateCharacter(values)
        dialog.current.closeModal()
    }

    const getBrutes = (el) => {
        bruteService.mybrute.next(el)
        bruteService.getBrutesToFight()
    }
    return(
        <div className="text-white flex grow m-2 flex-col">
            <div className="p-3 w-full bg-[#202531] rounded-md justify-between flex">
                {brutes?.length > 0 && <div>Mes brutes</div>}
                <button onClick={openBruteForm}>Créer une brute</button>
            </div>
            <dialog ref={dialog}>
                <div>
                    <form onSubmit={handleSubmit(createBrute)} className="flex flex-col gap-3">
                        <h2 className='text-xl font-semibold'>Créer ta brute</h2>
                        <input {...register('name')} placeholder="Le nom de ta brute" className='p-3'></input>
                        <button type="submit">Go</button>
                    </form>
                </div>
            </dialog>
            <div className="pt-3 flex h-full w-full">
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
                                    <Link onClick={() => getBrutes(brute)} className='py-3 px-5 rounded-lg bg-slate-900' to={"/arene/" + brute.id}>
                                        Se battre
                                    </Link>
                                    <Link className='py-3 px-5 rounded-lg bg-slate-900' to="/">
                                        Détails
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