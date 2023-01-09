import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';


const Home = () => {
  const state = useSelector((state) => state.ReducerState);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    if (state === "CHANGESIGNUP") {
      toast.success("Successfully signup", {
        position: "top-center"
      })
    } else if (state === "CHANGELOGIN") {
      toast.success("Successfully login", {
        position: "top-center"
      })
    } else {
      toast.success("Welcome to Home page", {
        position: "top-center"
      })
    }
  }, []);

  return (
    <>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
        style={
          {
            overlay: {
              backgroundColor: '#e5e7eb',

            },
            content: {
              width: "50%",
              borderRadius: "10px",
              position: 'absolute',
              left: "0px",
              top: "0px",
              height: "70%",
              outline: "none"
            },
          }
        }
        className="bg-slate-100 overflow-auto scrollbar-hide "
      >
        <i onClick={() => setModalIsOpen(false)} className="fa fa-times cursor-pointer fixed left-[50%] text-2xl text-red-700" aria-hidden="true"></i>
        <div className='flex flex-col w-full h-full bg-slate-500 rounded-l-lg  '>
          <div className='grid grid-cols-1 gap-6'>

            <NavLink to="/signup"><div className='mx-4 flex mt-6 p-2'>
              <span><i class="fa fa-registered text-2xl mr-2 text-teal-900" aria-hidden="true"></i></span>
              <span className='text-xl hover:text-fuchsia-700'>Signup</span>
            </div></NavLink>

            <NavLink to="/login"><div className='mx-4 flex p-2'>
              <span><i class="fa fa-user text-2xl mr-2 text-sky-900" aria-hidden="true"></i></span>
              <span className='text-xl hover:text-fuchsia-700'>login</span>
            </div></NavLink>

            <NavLink to="/chat"><div className='mx-4 flex p-2'>
              <span><i class="fa fa-comment text-2xl mr-2 text-indigo-900" aria-hidden="true"></i></span>
              <span className='text-xl hover:text-fuchsia-700'>chat</span>
            </div></NavLink>

          </div>
        </div>
      </Modal>

      <div className='w-screen h-screen overflow-auto scrollbar-hide'>
        <div>
          <div>
            <div className="min-w-screen-sm h-[550px] overflow-auto bg-gradient-to-r from-sky-500 to-indigo-500 ">

              <div className="mx-10 mt-10 lg:hidden  md:hidden">
                <i onClick={() => setModalIsOpen(true)} className="fa fa-bars text-3xl  p-1 border-2 border-lime-600 cursor-pointer hover:bg-slate-500" aria-hidden="true"></i>
              </div>

              <NavLink to="/chat"><div className="flex flex-col float-right mr-10  mt-12 invisible  md:visible lg:visible">
                <i className="fa fa-comment text-2xl text-center cursor-pointer" aria-hidden="true"></i>
                <label for="" className="text-lg">chat</label>
              </div></NavLink>


              <NavLink to="/login"><div className="flex flex-col float-right  mx-10  mt-12 invisible md:visible lg:visible">
                <i className="fa fa-user text-2xl text-center cursor-pointer" aria-hidden="true"></i>
                <label for="" className="text-lg">Login in</label>
              </div></NavLink>

              <NavLink to="/signup"><div className="flex flex-col  float-right  mt-12 invisible md:visible lg:visible">
                <i className="fa fa-registered text-2xl text-center cursor-pointer" aria-hidden="true"></i>
                <label for="" className="text-lg">signup</label>
              </div></NavLink>

              <h1 className="ml-8 tracking-wider mt-20 text-3xl text-slate-300 ">Welcome to New User.</h1>
              <h1 className="ml-8 mt-2 mr-4 tracking-tight text-2xl">Connect And Enjoy with Unlimited Free Chat </h1>

            </div>

          </div>
          <h1 className="text-center text-2xl  my-4">Our Services</h1>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3  gap-5  mt-4 mx-3">
            
            <div className=" p-5  rounded-xl shadow-2xl ">
              <div className="overflow-hidden"><img
                src="https://stories.freepiklabs.com/storage/54368/sign-up-rafiki-9019.png"
                className="rounded-lg hover:scale-125 duration-1000 mx-auto" width="200" height="450" alt="None" /></div>
              <h1 className="text-lg mt-2 tracking-wide">1. At first you create in your account</h1>
            </div>

            <div className=" p-5  rounded-xl shadow-2xl ">

              <div className="overflow-hidden"><img src="https://img.lovepik.com/element/45009/2860.png_300.png"
                width="200" height="450" className="rounded-lg hover:scale-125 duration-1000 mx-auto" alt="None" /></div>
              <h1 className="text-lg mt-2 tracking-wide">2. then go to login page and log in</h1>
            </div>

            <div className=" p-5  rounded-xl shadow-2xl ">
              <a href="https://google.com">
                <div className="overflow-hidden"><img src="https://www.pngmart.com/files/16/Speech-Chat-Icon-Transparent-PNG.png"
                  width="200" height="450" className="rounded-lg hover:scale-125 duration-1000 mx-auto" alt="None" /></div>
              </a>
              <h1 className="text-lg mt-2 tracking-wide">3. then click on chat button and go to chat page</h1>
            </div>

            <div className=" p-5  rounded-xl shadow-2xl ">
              <a>
                <div className="overflow-hidden"><img src="https://png.pngtree.com/png-vector/20221214/ourmid/pngtree-phone-chat-apps-png-image_6523592.png"
                  width="200" height="450" className="rounded-lg hover:scale-125 duration-1000 mx-auto" alt="None" /></div>
              </a>
              <h1 className="text-lg mt-2 tracking-wide">4. create single and group chat clicking on single and group button and Connect with one another</h1>
            </div>

          </div>
          <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 p-10">
            <p className="text-center">This website is created By @sandip</p>
            <p className="text-center">MERN project</p>
            <p className="text-center">GitHub Project</p>
          </div>
          <ToastContainer theme='colored' />
        </div>
      </div>
    </>
  )
}

export default Home
