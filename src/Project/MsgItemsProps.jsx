import React, { useState } from 'react';
import { useEffect } from 'react';
import MsgList from './Chat/MsgList';
import io from "socket.io-client";


const socket = io.connect("http://localhost:5000")

const MsgItemsProps = ({ chatId, isClick }) => {
    const [MsgData, setMsgData] = useState([]);
    const msgGet = async (id) => {
        const res = await fetch(`/MessageSent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ chat: id })
        });
        const data = await res.json();

        setMsgData([...data]);
    }

    useEffect(() => {
        socket.on("recieve-message", (ID) => {
            msgGet(ID);
        });
        msgGet(chatId);
    }, [isClick]);



    const [content, setContent] = useState();
    const msgSent = async () => {
        if (content) {
            const res = await fetch(`/getmessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ chatId, content })
            });
            setContent("");
            socket.emit("send-message", chatId);

        }
    }



    return (
        <>
            <div className='grow my-2 overflow-auto scrollbar-hide'>
                {
                    MsgData.map((val, ind) => {
                        return <MsgList key={ind} content={val.content} chat={val.chat} sender={val.sender} />
                    })
                }
            </div>

            <div className='flex w-[63.4vw] '>
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className='w-10/12 bg-slate-200 outline-none py-2 pl-4 text-lg ' placeholder='Send Here' />
                <div onClick={msgSent} className='w-2/12 bg-slate-200 text-center text-sky-500 grid place-items-center cursor-pointer'>
                    <i className="fa fa-paper-plane text-lg  lg:text-2xl cursor-pointer" aria-hidden="true"></i>
                </div>
            </div></>
    )
}

export default MsgItemsProps;
export { socket };
