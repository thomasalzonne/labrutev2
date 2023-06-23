import { Chat } from "./chat";
import { Header } from "./header";
import NavBar from "./NavBar";
import {useObservable} from 'react-use';
import authService from '../services/auth.service';

export default function Layout({ children }) {
    const user = useObservable(authService.user)
    return (
        <div className="h-screen w-full bg-blue-300 flex flex-col">
            <Header />
            <div className="w-full grow bg-orange-300 flex">
               <NavBar />
                <div className="grow bodybg relative overflow-hidden">
                    {user && <Chat />}
                    { children }
                </div>
            </div>
        </div>
    )
}