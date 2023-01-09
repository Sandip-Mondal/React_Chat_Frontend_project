import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "./Action/index";


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    toast.success("welcome to login page", {
      position: "top-center"
    })
  }, [])

  const uploadingData = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submit = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = state;
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.status !== 200) {
        toast.warn(data.msg, {
          position: "top-center"
        });
        throw new Error("inValid");
      } else {
        dispatch(LOGIN("CHANGELOGIN"));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <form method='POST' onSubmit={submit}>
      <div className="lg:w-screen lg:h-screen mt-10 lg:mt-0 flex justify-center items-center">
        <div className="max-w-[1300px]  rounded-lg shadow-2xl bg-gradient-to-r from-green-400 to-blue-500
            p-5 ">
          <Menu />

          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mt-6">
            <div className="flex my-1 lg:mr-5">
              <i className="fa fa-envelope text-2xl text-blue-900 mt-2 mr-1"></i>
              <div>
                <input type="email" className="peer rounded-lg outline-none px-3 py-2 text-lg mb-1
                    placeholder:text-slate-400" name="email" value={state.email} onChange={uploadingData} id="" placeholder="Enter Email" />
                <p className="font-semibold invisible peer-invalid:visible text-pink-600 text-sm">Enter Valid Email
                </p>
              </div>
            </div>

            <div className="flex my-1 lg:mr-5">
              <i className="fa fa-key text-2xl text-blue-900 mt-2 mr-1"></i>
              <div>
                <input type="password" value={state.password} onChange={uploadingData}
                  className="peer rounded-lg outline-none px-3 py-2 text-lg placeholder:text-slate-400"
                  placeholder="Enter Password" name="password" id="" />
                <p className="font-semibold invisible peer-invalid:visible text-pink-600 text-sm">My name is Don</p>
              </div>
            </div>


          </div>

          <div className="grid justify-center">
            <button type='submit' className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 ">click now</button>
          </div>

        </div>

      </div>
      <ToastContainer theme='colored' />
    </form>
  )
}

export default Login
