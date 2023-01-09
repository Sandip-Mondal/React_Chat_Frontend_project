import React, { useContext } from "react";
import { Fvalue } from "../Chat";

const MsgList = ({ sender, content, chat }) => {
    const User = useContext(Fvalue);
    const auth = () => {
        return User === sender._id;
    }
    return (
        <>
            {
                chat.isGroupChat ?
                    <div className={auth() ? 'mb-3 overflow-auto  mx-1 max-w-[80%] md:max-w-[70%] lg:max-w-[50%] float-right clear-both rounded-md  bg-zinc-500 ' :
                        'mb-3 overflow-auto  mx-1 max-w-[80%] md:max-w-[70%] lg:max-w-[50%] float-left clear-both rounded-md  bg-zinc-500 '}>
                        <div className='px-3 flex justify-between'>
                            {
                                !auth() ?
                                    <>
                                        <h1 className='p-1 truncate text-md text-blue-900'>{sender.number}</h1>
                                        <h1 className='p-1 truncate text-sm text-violet-900'>~~{sender.name}</h1>
                                    </>
                                    :
                                    null
                            }

                        </div>
                        <h2 className='px-3 pb-3 text-white text-lg '>{content}</h2>
                    </div> :
                    <div className={auth() ? 'mb-3 overflow-auto  mx-1 max-w-[80%] md:max-w-[70%] lg:max-w-[50%] float-right clear-both rounded-md  bg-zinc-500 ' :
                        'mb-3 overflow-auto  mx-1 max-w-[80%] md:max-w-[70%] lg:max-w-[50%] float-left clear-both rounded-md  bg-zinc-500 '}>
                        <h2 className='p-3 text-white text-lg '>{content}</h2>
                    </div>

            }
        </>


    )
}

export default MsgList;
