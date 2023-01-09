import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Fvalue } from "../Chat";
import ChatHeaderProps from './ChatHeaderProps';
import { socket } from "../MsgItemsProps";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ chatId, isClick, clickHandle, getChatId }) => {
    const navigate = useNavigate();
    const OwnId = useContext(Fvalue);
    const [email, setEmail] = useState();
    const [userData, setUserData] = useState();
    const [userId, setUserId] = useState();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const searchData = async () => {
        const res = await fetch(`/searchGroup/${email}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const val = await res.json();
        setUserData(val);
        setUserId(val._id);
    }
    useEffect(() => {
        searchData();
    }, [email]);


    const [chatData, setChatData] = useState({});
    const [users, setUsers] = useState([]);
    const getChatInfo = async (chatId) => {
        try {
            const res = await fetch(`/chatInfo/${chatId}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const val = await res.json();
            setChatData({ ...val });
            setUsers(val.users.filter((val) => {
                return val._id !== OwnId;
            }));

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getChatInfo(chatId);
    }, [isClick]);

    useEffect(() => {
        socket.on("remove", (id) => {
            getChatId(null);
            setModalIsOpen(false);
            clickHandle(Math.random());
            getChatInfo(id);
        });
        socket.on("delete", (id) => {
            getChatId(null);
            setModalIsOpen(false);
            getChatInfo(id);
        });
        socket.on("rename", (id) => {
            getChatId(null);
            setModalIsOpen(false);
            clickHandle(Math.random());
            getChatInfo(id);
        });

        socket.on("add", (id) => {
            getChatInfo(id);
        });
    }, []);



    const [newChatName, setNewChatName] = useState();
    const RenameGroup = async () => {
        try {
            if (newChatName) {
                const res = await fetch(`/updateGroupName/${chatId}/${newChatName}`, {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                const data = await res.json();
                setChatData({ ...data });
                if (res.status === 200) {
                    socket.emit("rename-group", chatId);
                    alert('updated successfully');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const addUser = async () => {
        try {
            if (userId) {
                const res = await fetch(`/addUser/${chatId}/${userId}`, {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                if (res.status === 200) {
                    alert('User is added');
                    socket.emit("add-user", chatId);

                } else {
                    alert("User already admit");
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const removeUser = async (id) => {
        try {
            const res = await fetch(`/removeUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ chatId: chatId, userId: id })
            });
            if (res.status === 200) {
                socket.emit("remove-user", chatId);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteGroup = async () => {
        try {
            const res = await fetch(`/deleteGroup/${chatId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (res.status === 200) {
                alert("sucessfully deleted");
                socket.emit("delete-user", chatId);
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                style={
                    {
                        overlay: {
                            backgroundColor: 'white',
                        },
                        content: {
                            width: "40%",
                            borderRadius: "10px",
                            position: 'absolute',
                            right: "0px",
                            top: "0px",
                            bottom: "0px",
                            outline: "none"
                        },
                    }
                }
                className="bg-slate-100 overflow-auto scrollbar-hide ">

                <i onClick={() => setModalIsOpen(!modalIsOpen)} className="fa fa-times cursor-pointer fixed left-[58%] text-2xl text-red-700" aria-hidden="true"></i>

                <div className='flex flex-col  w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-l-lg  '>
                    {chatData.isGroupChat ?
                        <>
                            <div className="text-2xl text-center my-3">
                                <span>GroupChat</span>
                            </div>

                            <div className='rounded-l-lg mb-2 bg-indigo-800 mx-2 rounded'>
                                <input type="text" id="open" value={newChatName} onChange={(e) => setNewChatName(e.target.value)}
                                    className='w-10/12 p-3.5 outline-none text-lg rounded border-2 border-dotted border-emerald-600' placeholder="change group name" />
                                <label for="open"><i onClick={RenameGroup} className="fa fa-paint-brush w-2/12 px-1 cursor-pointer  text-center  text-sm lg:text-lg " id='open' aria-hidden="true"></i></label>
                            </div>

                            <div className='rounded-l-lg mb-2 bg-teal-800 mx-2 rounded'>
                                <input type="text" id="open" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className='w-10/12 p-3.5 outline-none text-lg rounded border-2 border-dotted border-emerald-600' placeholder="Add User" />
                                <label for="open"><i onClick={addUser} className="fa fa-plus w-2/12 px-1 cursor-pointer  text-center  text-sm lg:text-lg" id='open' aria-hidden="true"></i></label>
                            </div>
                        </> : null

                    }
                    {
                        userData ?
                            <div className='flex h-13 bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 my-3 mx-2 rounded-lg shadow-xl cursor-pointer'>
                                <img src='https://wallpaperaccess.com/full/393735.jpg' alt='Img'
                                    className='mx-2 w-10 h-10 rounded-full inline my-auto' />
                                <div className='w-4/5 truncate my-auto flex flex-col'>
                                    <span className='truncate text-sm'>{userData.name} </span>
                                    <span className='truncate text-md'>{userData.email}</span>
                                </div>
                            </div> : null
                    }


                    <div className=' overflow-auto scrollbar-hide overflow-x-hidden mt-1 '>

                        {
                            users.map((val, ind) => {
                                return <ChatHeaderProps key={ind} id={val._id} name={val.name} email={val.email} groupAdmin={chatData.groupAdmin} removeUser={removeUser} />
                            })
                        }
                        {
                            chatData.groupAdmin === OwnId || !chatData.isGroupChat ?
                                <div className='w-full my-4 p-3 text-center'>
                                    <Tippy content={<span style={{ color: "orange" }}>Delete group</span>}><i onClick={deleteGroup} className="fa fa-trash text-red-900 text-3xl text-center cursor-pointer" aria-hidden="true"></i></Tippy>
                                </div> : null
                        }
                    </div>

                </div>
            </Modal>
            <div className=' w-[63.4vw]  bg-slate-400 py-1  '>
                <div className='flex justify-between'>
                    <div className='flex overflow-auto'>
                        <img src='https://wallpaperaccess.com/full/393735.jpg' alt='Img'
                            className='mx-2 w-12 h-12  rounded-full' />
                        {
                            chatData.isGroupChat ? <span className='text-slate-800 text-2xl truncate my-auto'>{chatData.chatName}</span>
                                : users.map((val, ind) => {
                                    return <span key={ind} className='text-slate-800 text-2xl truncate my-auto'>{val.name}</span>
                                })
                        }
                    </div>
                    <span className='py-auto flex px-4 justify-center cursor-pointer' onClick={() => setModalIsOpen(true)}>
                        <Tippy content={<span style={{ color: "orange" }}>Chat Profile</span>}><i className="fa fa-eye  text-xl my-auto" aria-hidden="true"></i></Tippy>
                    </span>
                </div>
            </div>
        </>
    )
}

export default ChatHeader;
