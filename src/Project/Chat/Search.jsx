import React from 'react'

const Search = ({ name, email, id, handleModal, clickHandle }) => {
    const sendAll = () => {
        handleModal(false, id);
        clickHandle(Math.random());
    }
    return (
        <div onClick={sendAll}
            className='flex h-13 bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 my-3 mx-2 rounded-lg shadow-xl cursor-pointer'>
            <img src='https://wallpaperaccess.com/full/393735.jpg' alt='Img'
                className='mx-2 w-10 h-10 rounded-full inline my-auto' />
            <div className='w-4/5 truncate my-auto flex flex-col'>
                <span className='truncate text-sm'>{name}</span>
                <span className='truncate text-md'>{email}</span>
            </div>
        </div>
    )
}

export default Search;
