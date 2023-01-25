import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
// import {useSnackbar} from 'react-simple-snackbar'
import { Link, useNavigate } from 'react-router-dom'

function Register() {

  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    formState: {errors},
  } = useForm();
  /* const options = {
    position: "bottom-right",
    style: {
      backgroundColor: "gray",
      border: "2px solid lightgreen",
      color: "white",
      fontFamily: "Menlo, monospace",
      fontSize: "20px",
      textAlign: "center",
    },
    closeStyle: {
      color: "lightcoral",
      fontSize: "16px",
    },
  }; */

  // const [openSnackbar] = useSnackbar(options);
  const onSubmit = (data) => {
    setLoading(true);
    const body = {
      ...data,
    }
    // console.log(body);
    // return
    axios.post(`http://127.0.0.1:8080/api/register`, { ...body}).then(function(response) {
      // handle access .....
      setLoading(false);
      setMessage(response?.data?.message);
      // openSnackbar(response?.data?.message);
      // localStorage.setItem("user", JSON.stringify(response?.data?.user));
      // console.log(response?.data?.user);
      navigate("/login");
    }).catch(function(error) {
      // handle error
      setLoading(false);
      setMessage(error?.response?.data?.message);
      // openSnackbar(error?.response?.data?.message);
      // console.log(error?.response?.data?.message);
    }).then(function() {
      //  always executed ....
    });
    // console.log(data);
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                  Sign Up
                </h1>
                {message && (
                  <div className='px-11 py-4'>
                    <div className='font-bold bg-gradient-to-r from-fuchsia-400 via-sky-400 to-violet-200 p-4 text-black'>
                      {message}
                    </div>
                  </div>
                )}
                <form method='POST' className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <label
                            for="first_name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            id='first_name'
                            autoComplete='on'
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("first_name", {
                              required: true,
                            })}
                        />
                        <div>
                          {errors.first_name && errors.first_name.type === "required" && (
                            <span
                              role="alert"
                              className="text-red-600 text-[10px] italic"
                            >
                              First Name is required
                            </span>
                          )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label
                            for="last_name" 
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            name='last_name'
                            id='last_name'
                            autoComplete='on'
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("last_name", {
                              required: true,
                            })}
                        />
                        <div>
                          {errors.last_name && errors.last_name.type === "required" && (
                            <span
                              role="alert"
                              className="text-red-600 text-[10px] italic"
                            >
                              Last Name is required
                            </span>
                          )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label
                            for="email" 
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name='email'
                            id='email'
                            autoComplete='on'
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("email", {
                              required: true,
                            })}
                        />
                        <div>
                          {errors.email && errors.email.type === "required" && (
                            <span
                              role="alert"
                              className="text-red-600 text-[10px] italic"
                            >
                              Email is required
                            </span>
                          )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label
                            for="password" 
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name='password'
                            id='password'
                            autoComplete='on'
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("password", {
                              required: true,
                            })}
                        />
                        <div>
                          {errors.password && errors.password.type === "required" && (
                            <span
                              role="alert"
                              className="text-red-600 text-[10px] italic"
                            >
                              Password is required
                            </span>
                          )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label
                            for="phone" 
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone Number
                        </label>
                        <input
                            type="number"
                            name='phone'
                            id='phone'
                            autoComplete='on'
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("phone", {
                              required: true,
                            })}
                        />
                        <div>
                          {errors.phone && errors.phone.type === "required" && (
                            <span
                              role="alert"
                              className="text-red-600 text-[10px] italic"
                            >
                              Phone is required
                            </span>
                          )}
                        </div>
                    </div>
                    <a
                        href="/forget_password"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className={`w-full ${
                          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
                          } text-white font-bold py-2 px-4 rounded`}
                          disabled={loading ? true : false}
                        >
                          {loading ? "Loading...":"Sign Up"}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-purple-600 hover:underline"
                    >
                      Sign In
                    </Link>
                </p>
            </div>
        </div>
  )
}

export default Register
