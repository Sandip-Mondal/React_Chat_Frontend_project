import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ChatList from './Chat/ChatList';

const ChatItemProps = ({ getChatId, clickHandle }) => {
    const [ChatItem, setChatItem] = useState([]);

    const ChatFetch = async () => {
        try {
            const res = await fetch(`/fetchchat`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const val = await res.json();

            if (res.status === 200) {
                setChatItem([...val]);

            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        ChatFetch();
    });

    const [bg, setBg] = useState();
    const bgHandle = (id) => {
        setBg(id);
    }

    return (
        <div className=' overflow-auto scrollbar-hide overflow-x-hidden  '>

            {
                ChatItem.map((val, ind) => {
                    return <ChatList key={ind} users={val.users} id={val._id} chatName={val.chatName} bgHandle={bgHandle}
                        isGroupChat={val.isGroupChat} getChatId={getChatId} bg={bg} clickHandle={clickHandle} />
                })
            }

        </div>
    )
}

export default ChatItemProps
