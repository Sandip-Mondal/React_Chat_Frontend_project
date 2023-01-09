import React, { useContext } from 'react';
import { Fvalue } from "../Chat";

const ChatHeaderProps = ({ id, groupAdmin, name, email, removeUser }) => {
    const OwnId = useContext(Fvalue);

    return (
        <div className='flex h-13 bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 my-3 mx-2 rounded-lg shadow-xl cursor-pointer'>
            <img src='https://wallpaperaccess.com/full/393735.jpg' alt='Img'
                className='mx-2 w-10 h-10 rounded-full inline my-auto' />
            <div className='w-4/5 truncate my-auto flex flex-col'>
                {
                    OwnId === id ?
                        <span className='truncate text-sm'>YOU</span>
                        : <>
                            <span className='truncate text-sm'>{name} </span>
                            <span className='truncate text-md'>{email}</span>
                        </>
                }
            </div>

            {
                OwnId === groupAdmin ? <i onClick={() => removeUser(id)} className="fa fa-times w-2/12 px-1 text-red-900 text-lg cursor-pointer  text-center lg:text-lg " id='open' aria-hidden="true"></i> : null
            }
        </div>
    )
}

export default ChatHeaderProps
