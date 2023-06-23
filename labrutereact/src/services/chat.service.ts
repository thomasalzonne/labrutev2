import { BehaviorSubject } from 'rxjs';
import Message from '../models/message';
import socketClient  from "socket.io-client";

const SERVER = ":3000";
const MAX_MESSAGE = 30;
const socket = socketClient (SERVER, {
    path: '/socket'
});
class ChatService {
    chat = new BehaviorSubject<Message[]>([]);
    open = new BehaviorSubject<Boolean>(false)

    constructor(){
            socket.on('message', message => {
                if(this.chat.value.length > MAX_MESSAGE){
                    let array = [...this.chat.value, message]
                    array.shift()
                    this.chat.next(array)
                }
                else{
                    this.chat.next([...this.chat.value, message])
                }
            })
    }

    addMessage(message: Message) {
        //this.chat.next([...this.chat.value, message])
        if(message.message.trim().length !== 0) socket.emit('send-message', message)
    }
    saveMessage(message){

    }

    openChat() {
        return this.open.next(!this.open.value)
    }
}

export default new ChatService()