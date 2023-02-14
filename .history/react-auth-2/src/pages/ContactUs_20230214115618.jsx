import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
// import {useSnackbar} from 'react-simple-snackbar'
import { useNavigate } from 'react-router-dom'


function ContactUs() {

    const [message, setMessage] = useState();
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let User = localStorage.getItem("user");
        if(!User) {
            navigate("/login")
        } 
        User = JSON.parse(User)
        setUserId(User.id)
        if(User.role_id === 1) {
            navigate("/")
        }else if(User.role_id === 2) {
            navigate("/")
        }
    }, [navigate]);

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
    axios.post(`http://127.0.0.1:8080/api/sendMail/${data.userId}`, { ...body}).then(function(response) {
        // handle access .....
        setLoading(false);
        setMessage(response?.data?.message);
        // openSnackbar(response?.data?.message);
        // localStorage.setItem("user", JSON.stringify(response?.data?.user));
        // console.log(response?.data?.user);
        navigate("/contact_form");
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
        <div className="container my-24 px-6 mx-auto">
            <section className="mb-32 text-center text-gray-800">
                <div className="max-w-[700px] mx-auto px-3 lg:px-6">
                <h2 className="text-3xl font-bold mb-12">Contact us</h2>
                {message && (
                    <div className='px-11 py-4'>
                        <div className='font-bold bg-gradient-to-r from-fuchsia-400 via-sky-400 to-violet-200 p-4 text-black'>
                        {message}
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-6">
                    <input 
                        type="text" 
                        name="name"
                        id='name'
                        autoComplete='on'
                        className="form-control block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  
                        placeholder="Name" 
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <div>
                            {errors.name && errors.name.type === "required" && (
                                <span
                                role="alert"
                                className="text-red-600 text-[10px] italic"
                                >
                                Name is required
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="form-group mb-6">
                    <input 
                        type="email" 
                        name="email"
                        id='email'
                        autoComplete='on'
                        className="form-control block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                        placeholder="Email address" 
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
                    <div className="form-group mb-6">
                    <textarea 
                        name="message"
                        id='message'
                        autoComplete='on'
                        className="
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" rows="3" 
                        placeholder="Message"
                        {...register("message", {
                            required: true,
                        })}
                        ></textarea>
                        <div>
                            {errors.message && errors.message.type === "required" && (
                                <span
                                role="alert"
                                className="text-red-600 text-[10px] italic"
                                >
                                Message is required
                                </span>
                            )}
                        </div>
                    </div>
                    {/* <div class="form-group form-check text-center mb-6">
                    <input type="checkbox" class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer" id="exampleCheck87" checked />
                    <label class="form-check-label inline-block text-gray-800" for="exampleCheck87">Send me a copy of this
                        message</label>
                    </div> */}
                    <input type="hidden" value={userId} name="user_id" />
                    <button type="submit" className={`
                    w-full
                    px-6
                    py-2.5
                    ${
                    loading ? "bg-gray-500" : "bg-blue-600"
                    }
                    text-white
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    rounded
                    shadow-md
                    hover:bg-blue-700 hover:shadow-lg
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-blue-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out`}
                    disabled={loading ? true : false}
                    >{loading ? "Sending...":"Send"}</button>
                </form>
                </div>
            </section>

            </div>
    )
}

export default ContactUs
