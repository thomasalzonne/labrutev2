import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import chatService from '../services/chat.service.ts';
import {useObservable} from 'react-use';
import authService from '../services/auth.service';
import { useEffect, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
export function Chat() {
    const { handleSubmit, register, reset, formState, formState: { isSubmitSuccessful }} = useForm()
    const isChatOpened = useObservable(chatService.open)
    const chat = useObservable(chatService.chat, chatService.chat.value)
    const user = useObservable(authService.user)
    const ref = useRef(null)

    useEffect(() => {
        ref.current.scrollIntoView({behavior: "smooth"})
        if (formState.isSubmitSuccessful) {
            reset({ message: '' });
          }
    }, [chat, formState, reset])
    return(
        <>
            <motion.div
            initial={false}
            animate={isChatOpened ? 'visible' : 'hidden'}
            variants={{ 
                visible: { height: '90%', width:'18rem', borderRadius: '30px', type:"tween", padding:"1rem"},
                hidden: { height: '0%', width: '0%', padding: '0%'},
            }}
            className="absolute bg-[#292D3A] right-3 overflow-hidden mt-7 flex-col flex"
            >
                <div className='w-full text-white pb-5 border-b border-white border-opacity-20 whitespace-nowrap mb-2'>
                    Chat des brutes
                </div>
                <div className='h-full w-full overflow-y-auto'>
                    {chat.map(msg => 
                            <div className='text-white bg-[#1D222E] p-4 w-full mx-auto rounded-lg flex mb-3'>
                                <div className=' my-auto mr-3 text-white p-2 rounded-full bg-gray-700 w-fit shrink-0'>
                                    <img className='w-10 h-10' src={`https://avatars.dicebear.com/api/bottts/${msg.user.username}.svg`} alt="" />
                                </div>
                                <div className='flex flex-col'>
                                    <div>{msg.user.username}</div>
                                    <div className='text-white/60 text-sm'>{msg.message}</div>  
                                </div>
                            </div>
                        )
                    }
                    <div ref={ref}></div>
                </div>
                <form className='h-12 relative' onSubmit={handleSubmit(values => {
                    chatService.addMessage({
                    user,
                    message: values.message
                })
            })}>
                    <input className='indent-1.5 h-full bg-transparent w-full text-white' placeholder='Send a message' type="text" {...register("message")} />
                    <button className='text-white h-full absolute right-1 top-1/2 transform -translate-y-1/2' type="submit"><FiSend/></button>
                </form>
            </motion.div>
        </>
    )
}
