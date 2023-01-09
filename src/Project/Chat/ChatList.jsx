import React, { useContext } from 'react'
import { chatListName } from '../ChatLogic';
import { Fvalue } from "../Chat";


const ChatList = ({ users, bg, chatName, isGroupChat, id, getChatId, bgHandle, clickHandle }) => {
    const UserId = useContext(Fvalue);
    const sendChatHandle = () => {
        getChatId(id);
        bgHandle(id);
        clickHandle(Math.random());
    }
    return (
        <div onClick={sendChatHandle} className={bg === id ? 'flex h-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 my-3 mx-2 rounded-lg shadow-xl cursor-pointer' : "flex h-20 py-3 my-3 mx-2 rounded-lg shadow-xl cursor-pointer bg-transparent"} >
            <img src='https://wallpaperaccess.com/full/393735.jpg' alt='Img'
                className='mx-2 w-14 h-14  rounded-full inline' />
            {!isGroupChat ? <span className='w-4/5 truncate my-auto text-xl '>{chatListName(users, UserId).name}</span> :
                <span className='w-4/5 truncate my-auto text-xl '>{chatName}</span>}
        </div>
    )
}

export default ChatList
