import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import authService from '../services/auth.service';
import chatService from '../services/chat.service.ts';
import {useObservable} from 'react-use';
import { Link } from 'react-router-dom';

export function Header() {
    const { handleSubmit, register} = useForm()
    const dialog = useRef()
    const user = useObservable(authService.user)
    const showForm = useObservable(authService.logForm)

    const changeForm = () => {
        authService.registerForm()
    }
    const open = () => {
        dialog.current.showModal()
    }
    const submit = (values) => {
        authService.login(values).then(() => dialog.current.close())
    }
    const registerUser = (values) => {
        authService.register(values)
        dialog.current.close()
    }
    const logout = () => {
        authService.logout()
    }
    const openChat = () => {
        chatService.openChat()
    }
    return (
        <header className="h-20 bg-gradient-to-r from-[#282B33] via-[#323741] to-[#282B33] shrink-0 w-full shadow flex">
            <div className='ml-10 my-auto text-white'>
                <Link to="/">
                    LaBrute
                </Link>
            </div>
            <dialog ref={dialog}>
                {showForm ?
                    <div>
                        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
                            <h2 className='text-xl font-semibold'>Connexion</h2>
                            <input {...register('username')} placeholder="Username" className='p-3'></input>
                            <input {...register('password')} type="password" placeholder="password" className='p-3'></input>
                            <button type="submit">Go</button>
                        </form>
                        <button className='text-xs mt-3' onClick={changeForm}>Pas de compte? Insris-toi ici</button>
                    </div>
                    :
                    <div>
                        <form onSubmit={handleSubmit(registerUser)} className="flex flex-col gap-3">
                            <h2 className='text-xl font-semibold'>Inscription</h2>
                            <input {...register('username')} placeholder="Username" className='p-3'></input>
                            <input {...register('password')} type="password" placeholder="password" className='p-3'></input>
                            <button type="submit">Go</button>
                        </form>
                        <button className='text-xs mt-3' onClick={changeForm}>T'as un compte? Connectes toi ici</button>
                    </div>
                }
            </dialog>
            {!user 
                ? <button className='my-auto mr-5 ml-auto text-white flex' onClick={open}>Login</button>
                :   <>
                        <button className='text-white my-auto ml-auto mr-5 flex flex-col text-center opacity-60 hover:opacity-100 duration-500' onClick={openChat}>
                            <img src="/assets/chat.png" className='w-12 h-12 mx-auto'/>
                        </button>
                        <button className='my-auto mr-5 hidden' onClick={logout}>Logout</button>
                        <div className=' my-auto mr-10 text-white p-2 rounded-full bg-gray-700'>
                            <img className='w-10 h-10' src={`https://avatars.dicebear.com/api/bottts/${user.username}.svg`} alt="" />
                        </div>
                    </>
            }
        </header>
    )
}