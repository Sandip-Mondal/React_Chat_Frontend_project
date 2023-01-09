import React, { useState } from "react";
import Modal from 'react-modal';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useEffect } from "react";
Modal.setAppElement("#root");

const CreateGroupSearch = ({ clickHandle }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState();
  const [chatName, setChatName] = useState();
  const [User, setUser] = useState();

  const searchData = async () => {
    if (email) {
      const res = await fetch(`/searchGroup/${email}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const val = await res.json();
      setUser(val);

    }
  }
  useEffect(() => {
    searchData();
  });

  const submit = async () => {
    try {
      if (chatName && User) {
        const res = await fetch(`/groupchat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ chatName, User })
        });
        setChatName("");
        setEmail("");
        setModalIsOpen(false);
        clickHandle(Math.random());
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
        style={
          {
            overlay: {
              backgroundColor: 'grey',
            },
            content: {
              color: "#525252",
              width: "350px",
              height: "400px",
              margin: "auto",
              position: 'absolute',
              left: "5px",
              outline: "none",
            },
          }
        }

      >
        <h2 className="text-xl text-center">Create Group Chat</h2>
        <div className="flex flex-col justify-between h-[330px] ">
          <div className="w-full  flex flex-col items-center ">

            <input type="text" value={chatName} onChange={(e) => setChatName(e.target.value)} className="w-[94%] my-5 rounded outline-none border-2 border-dotted border-emerald-600 py-1.5 px-3 text-lg " name="" id="" placeholder="Enter group name" />
            <div className="w-[94%]">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full peer rounded outline-none border-2 border-dotted border-emerald-600 py-1.5 px-3 text-lg " name="" id="" placeholder="Enter User Email name" />
              <p className="font-semibold invisible peer-invalid:visible text-pink-600 text-sm">Enter Valid Email
              </p>
            </div>

          </div>
          <div className="grow my-0">

            {
              User ?
                <div className='flex h-13 bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 my-3 mx-2 rounded-lg shadow-xl cursor-pointer'>
                  <img src='https://wallpaperaccess.com/full/393735.jpg' alt='Img'
                    className='mx-2 w-10 h-10 rounded-full inline my-auto' />
                  <div className='w-4/5 truncate my-auto flex flex-col'>
                    <span className='truncate text-sm'>{User.name}</span>
                    <span className='truncate text-md'>{User.email}</span>
                  </div>
                </div> : null
            }

          </div>
          <button type="submit" onClick={submit} className="bg-green-700 p-2 mb-2 text-lg text-slate-200 rounded">click now</button>
        </div>
      </Modal>
      <Tippy content={<span style={{ color: "orange" }}>Group chat</span>}><button onClick={() => setModalIsOpen(true)} className='p-1.5 border-2 border-solid border-stone-300 bg-blue-500 rounded-md'>Group</button></Tippy>
    </div>
  )
}

export default CreateGroupSearch;
