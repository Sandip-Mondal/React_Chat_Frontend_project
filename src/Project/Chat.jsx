import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Modal from 'react-modal';
import ChatProps from "./Chat/Search";
import MsgContent from './MsgItemsProps';
import ChatHeader from './Chat/ChatHeader';
import ChatItemProps from './ChatItemProps';
import GroupSearchModal from "./Chat/CreateGroupSearch";
import { socket } from "./MsgItemsProps";
const Fvalue = createContext();

const Chat = () => {
  const navigate = useNavigate();
  const [Iddata, setIddata] = useState();
  const [ownData, setOwnData] = useState({});
  const UserLogin = async () => {
    try {
      const res = await fetch("/page", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setIddata(data._id);
      setOwnData({ ...data });
      if (res.status === 400) {
        navigate("/login");
        throw new Error();
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    UserLogin();
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);

  const [search, setSearch] = useState();
  const [searList, setSearchList] = useState([]);
  const searchData = async () => {
    if (search) {
      const res = await fetch(`/search/${search}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const val = await res.json();
      setSearchList([...val]);
    }
  }

  const handleModal = async (bool, id) => {
    setModalIsOpen(bool);
    const res = await fetch(`/singlechat/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    setSearch("");
    setSearchList([]);
  }

  const [chatId, setChatId] = useState();
  const getChatId = (id) => {
    socket.emit("leave", chatId);
    socket.emit("join room", id);
    setChatId(id);
  }

  const [isClick, setIsClick] = useState();
  const clickHandle = (click) => {
    setIsClick(click);
  }

  return (
    <Fvalue.Provider value={Iddata}>

      <Modal isOpen={modalIsOpen1} onRequestClose={() => setModalIsOpen1(false)}
        style={
          {
            overlay: {
              backgroundColor: 'grey',
            },
            content: {
              color: "#525252",
              width: "350px",
              height: "350px",
              margin: "auto",
              position: 'absolute',
              left: "5px",
              outline: "none",
              borderRadius: "10px"
            },
          }
        }
      >
        <div className="italic text-2xl text-blue-700">
          <h2 className="text-3xl not-italic text-center text-violet-900">Your account</h2>
          <div className="w-full grid grid-cols-3 mt-6">

            <div className="flex flex-col col-span-1 my-5 text-center">
              <h2>Name:</h2>
              <h2 className="my-10">Email:</h2>
              <h2>phone:</h2>
            </div>

            <div className="flex flex-col col-span-2 my-5 text-red-600">
              <span className='truncate'>{ownData.name}</span>
              <h2 className="truncate my-10">{ownData.email}</h2>
              <h2 className='truncate'>{ownData.number}</h2>
            </div>
          </div>

        </div >
      </Modal >

      <div>
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
                left: "0px",
                top: "0px",
                bottom: "0px",
                outline: "none"
              },
            }
          }
          className="bg-slate-100 overflow-auto scrollbar-hide "
        >
          <i onClick={() => setModalIsOpen(false)} className="fa fa-times cursor-pointer fixed left-[40%] text-2xl text-red-700" aria-hidden="true"></i>
          <div className='flex flex-col  w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-l-lg  '>
            <div className='rounded-l-lg bg-slate-600 '>
              <input type="text" id="open" value={search} onChange={(e) => setSearch(e.target.value)}
                className='w-10/12 p-3.5 outline-none text-lg rounded-lg border-2 border-solid border-slate-500' />
              <label onClick={searchData} for="open"><i className="fa fa-search w-2/12 px-1 cursor-pointer  text-center  text-sm lg:text-lg " id='open' aria-hidden="true"></i></label>
            </div>

            <div className=' overflow-auto scrollbar-hide overflow-x-hidden  '>

              {
                searList.map((val, ind) => {
                  return <ChatProps key={ind} name={val.name} email={val.email} id={val._id} handleModal={handleModal}
                    clickHandle={clickHandle} />
                })
              }

            </div>
          </div>
        </Modal>
      </div>

      <div className='w-screen h-screen grid place-items-center bg-blue-500'>
        <div className='flex   w-[95vw] h-[95vh]  shadow-2xl rounded-lg bg-zinc-800'>
          <div className="w-2/6  flex flex-col justify-center items-center  ">

            <div className='flex flex-col  w-full h-full  bg-gradient-to-r from-cyan-500 to-blue-500 rounded-l-lg  '>

              <div className='flex justify-between my-1.5 '>
                <Tippy content={<span style={{ color: "orange" }}>Single chat</span>}><button onClick={() => setModalIsOpen(true)} className='p-1.5 border-2 border-solid border-stone-300 rounded-md'>single</button></Tippy>
                <GroupSearchModal clickHandle={clickHandle} />
              </div>

              <div className='rounded-l-lg bg-slate-400 '>
                <div className='w-full  py-3 outline-none text-lg ' >
                  <h2 className='text-center text-2xl'>chat list</h2>
                </div>
              </div>

              <ChatItemProps getChatId={getChatId} isClick={isClick} clickHandle={clickHandle} />

            </div>
          </div>

          <div className="w-4/6  flex justify-between flex-col ">
            <div className='w-[63.4vw] flex justify-end items-center bg-blue-500 py-1 pb-3'>
              <Tippy content={<span style={{ color: "orange" }}>Your Profile</span>}><i onClick={() => setModalIsOpen1(true)} className="fa fa-user text-3xl mr-3 text-violet-700 cursor-pointer" aria-hidden="true"></i></Tippy>
            </div>

            {
              chatId ?
                <>
                  <ChatHeader chatId={chatId} isClick={isClick} clickHandle={clickHandle} getChatId={getChatId} />
                  <MsgContent chatId={chatId} isClick={isClick} />
                </> : null
            }

          </div>

        </div>
      </div >
    </Fvalue.Provider>
  )
}

export default Chat;
export { Fvalue };