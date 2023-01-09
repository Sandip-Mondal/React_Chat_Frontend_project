import React from 'react';
import { useState } from 'react';
import Menu from './Menu';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SIGNUP } from "./Action/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        toast.success("welcome to signup page", {
            position: "top-center"
        })
    }, [])

    const [state, setState] = useState({
        name: "",
        email: "",
        number: "",
        gender: "male",
        password: "",
        cpassword: ""
    });

    const submit = async () => {
        try {
            const { name, email, number, gender, password, cpassword } = state;
            if (password !== cpassword) {
                toast.warn("two password are not matching", {
                    position: "top-center"
                })
                throw new Error();
            }
            const res = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, number, gender, password })
            });
            const value = await res.json();
            if (res.status !== 200) {
                toast.warn(value.msg, {
                    position: "top-center"
                })
                throw new Error("Invalid !");
            } else {
                dispatch(SIGNUP("CHANGESIGNUP"));
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    }


    const uploadingData = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }


    return (
        <div className="lg:w-screen lg:h-screen mt-10 lg:mt-0 flex justify-center items-center">
            <div className="max-w-[1300px]  rounded-lg shadow-2xl bg-gradient-to-r from-green-400 to-blue-500
            p-5 ">


                <Menu />
                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mt-6">

                    <div className="flex my-1 lg:mr-5 ">
                        <i className="fa fa-user text-2xl text-blue-900 mt-2 mr-1"></i>
                        <div>
                            <input type="text" className=" rounded-lg outline-none px-3 py-2 text-lg
                    placeholder:text-slate-400 " name="name" value={state.name} onChange={uploadingData} id="" placeholder="Enter Your Name" />
                            <p className="font-semibold invisible peer-invalid:visible text-pink-600 text-sm">....</p>
                        </div>
                    </div>



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
                        <i className="fa fa-phone-square text-2xl text-blue-900 mt-2 mr-1"></i>
                        <div>
                            <input type="number" className="peer rounded-lg outline-none px-3 py-2 text-lg
                    placeholder:text-slate-400" name="number" value={state.number} onChange={uploadingData} id="" placeholder="Enter Mobile Number" />
                            <p className="font-semibold invisible peer-invalid:visible text-pink-600 text-sm">Enter proper
                                mobile Number
                            </p>
                        </div>
                    </div>


                    <div className="flex justify-center my-1  lg:mr-5">

                        <div className="flex items-center mb-4 mr-1">
                            <label className="text-lg font-medium text-gray-900 dark:text-gray-300">Gender: </label>
                            <input id="default-radio-1" type="radio" value="male" onChange={uploadingData} name="gender"
                                className="h-4 ml-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked />
                            <label for="default-radio-1"
                                className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-300">Male</label>
                        </div>

                        <div className="flex items-center mb-4 mr-1">
                            <input id="default-radio-1" type="radio" value="female" onChange={uploadingData} name="gender"
                                className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-radio-1"
                                className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-300">Female</label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="default-radio-1" type="radio" value="others" onChange={uploadingData} name="gender"
                                className="h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-radio-1"
                                className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-300">Other</label>
                        </div>

                    </div>


                    <div className="flex my-1 lg:mr-5">
                        <i className="fa fa-key text-2xl text-blue-900 mt-2 mr-1"></i>
                        <div>
                            <input type="password"
                                className="peer rounded-lg outline-none px-3 py-2 text-lg placeholder:text-slate-400"
                                placeholder="Enter Password" name="password" value={state.password} onChange={uploadingData} id="" />
                            <p className="font-semibold invisible peer-invalid:visible text-pink-600 text-sm">...</p>
                        </div>
                    </div>


                    <div className="flex my-1 lg:mr-5">
                        <i className="fa fa-key text-2xl text-blue-900 mt-2 mr-1"></i>
                        <div>
                            <input type="password" className="rounded-lg outline-none px-3 py-2 text-lg "
                                placeholder="Enter confirm passWord" name="cpassword" value={state.cpassword} onChange={uploadingData} id="" />
                            <p className="font-semibold invisible peer-invalid:visible text-pink-600 text-sm">...</p>
                        </div>
                    </div>
                </div>

                <div className="grid justify-center">
                    <button onClick={submit} className="p-2 rounded-md bg-violet-600 hover:bg-violet-700 ">click now</button>
                </div>

            </div>
            <ToastContainer theme='colored' />
        </div>
    )
}

export default Signin
