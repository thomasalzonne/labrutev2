import { motion } from 'framer-motion';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom'

export default function NavBar() {
    const route = useLocation()
    const isFight = route.pathname === '/fight'
    return(
        <>
             <motion.div 
                initial={false}
                animate={isFight ? 'hidden': 'visible'}
                transition={{type:"tween"}}
                variants={{ 
                    visible: { width: '6rem'},
                    hidden: { width: '0rem'},
                }}
                className="shrink-0 h-full bg-[#1C212D] flex flex-col pt-5 gap-5 overflow-hidden">
                    <Link to="/fight" className='text-white mx-auto flex flex-col text-center opacity-60 hover:opacity-100 duration-500 text-xs'>
                        <img src="/assets/home.png" className='w-12 h-12 mx-auto'/>
                        <span className='mt-1'>Home</span>
                    </Link>
                    <Link to="/brutes" className='text-white mx-auto flex flex-col text-center opacity-60 hover:opacity-100 duration-500 text-xs'>
                        <img src="/assets/brutes.png" className='w-12 h-12 mx-auto'/>
                        <span className='mt-1 whitespace-nowrap'>Mes brutes</span>
                    </Link>
                    <Link to="/fight" className='text-white mx-auto flex flex-col text-center opacity-60 hover:opacity-100 duration-500 text-xs'>
                        <img src="/assets/inventory.png" className='w-12 h-12 mx-auto'/>
                        <span className='mt-1'>Inventaire</span>
                    </Link>
                </motion.div>
        </>
    )
}