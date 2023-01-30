import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios'
// import {useSnackbar} from 'react-simple-snackbar'
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
    const [singlePost, setSinglePost] = useState();
    const [loading, setLoading] = useState(false);
    const [imageUpload, setImageUpload] = useState();
    const [loadingData, setLoadingData] = useState();
    const {id} = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState();
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


    useEffect(() => {
        const singleBlog = () => {
            axios.get(`http://127.0.0.1:8080/api/allpost/${id}`, {withCredentials: true})
            .then(function(response) {
                // handle access .....
                setSinglePost(response?.data?.data);
                console.log(response?.data?.data);
            }).catch(function(error) {
                // handle error
                console.log(error);
            }).then(function() {
                //  always executed ....
            });
        };
        const User = localStorage.getItem("user");
        if(!User){
            navigate("/login")
        }
        singleBlog();
    }, [navigate, id]);

    const handleImage = (e) => {
        const file = e.target.files[0];
        // const size = file.size / 1024;
        // data.append("image", file)
        const reader = new FileReader();
        reader.onloadend = function() {
            setImage({ [e.target.name]: reader.result })
        };
        if (file){
            reader.readAsDataURL(file);
            e.target.value = null;
        }
    };

    const onSubmit = (data) => {
        setLoading(true);
        const body = {
            ...data,
            image: singlePost ? singlePost?.image : imageUpload,
        }

        axios.put(`http://127.0.0.1:8080/api/updatepost/${id}`, {...body})
        .then(function(response) {
            // handle access .....
            // openSnackbar("Post Updated Successfully .. !");
            setLoading(false);
            navigate("/");
        }).catch(function(error) {
            // handle error
            // openSnackbar("Post Not Updated");
            setLoading(false);
            console.log(error);
        });
    }

    const uploadImage = () => {
        let formData = new FormData(); // formData object
        formData.append("image", image ? image.image : singlePost?.image ); // append the value with key, value pair
        formData.append("name", image ? image.image : singlePost?.image.name);
        const config = {
            headers: {"Content-Type":"multipart/form-data"}
        };
        let url = `http://127.0.0.1:8080/api/upload-image/`;
        axios.post(url, formData, config)
        .then((response) => {
            setLoadingData(false);
            setImageUpload(response?.data?.url);
            // openSnackbar("Image Uploaded Successfully");
        })
        .catch((error) => {
            setLoadingData(false);
            console.log(error);
        });
    }

    return (
        <div className='max-w-screen-md mx-auto p-5'>
            <div className="max-w-screen-md mx-auto p-5">
                <div className="text-center mb-16">
                    <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
                        Edit your Post
                    </p>
                    <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-right text-gray-900">
                        Express your <span className="text-indigo-600">Feeling</span>
                    </h3>
                </div>
            </div>
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full md:w-full px-3 mb-6 md:mb-0'>
                        <label htmlFor="title" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Title</label>
                        <input 
                            type="text"
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded'
                            id='title'
                            placeholder='Title'
                            name='title'
                            autoComplete='off'
                            {...register("title", {
                                required: true,
                            })}
                            defaultValue={singlePost?.title}
                        />
                        {errors.title && errors.title.type === "required" && (
                            <p className='text-red-500 text-xs italic'>
                                Please fill out this field
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <div>
                    <label title='click to select a picture'>
                            <input type="file" name="image" id="banner" 
                                className='hidden'
                                accept='image/*'
                                visibility="hidden"
                                onChange={handleImage}
                            />
                            <div className='flex flex-col'>
                                <div className='pb-2'>Upload Image</div>
                                {image ? (
                                    <div className='pt-4'>
                                        <img 
                                            src={image.image} 
                                            alt="" 
                                            className='object-contain -mt-8 p-5 w-1/2'
                                        />
                                    </div>
                                ) : (
                                    <div className='pt-4'>
                                        <img 
                                            src={singlePost?.image}
                                            alt="" 
                                            className='object-contain -mt-8 p-5 w-1/2'
                                        />
                                    </div>
                                )}
                            </div>
                        </label>
                    </div>
                    <div className="flex items-center justify-center px-5">
                        <button
                            className="shadow text-white px-8 py-3 border border-transparent rounded bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none"
                            onClick={uploadImage}
                            disabled={loadingData ? true : false}
                        >
                            {loadingData ? "Loading ...":"Upload Image"}
                        </button>
                    </div>
                </div>
                <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full md:w-full px-3 mb-6 md:mb-0'>
                        <label htmlFor="desc" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Description</label>
                        <textarea
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded'
                            id='desc'
                            placeholder='Description'
                            name='desc'
                            autoComplete='off'
                            {...register("desc", {
                                required: true,
                            })}
                            defaultValue={singlePost?.desc}
                            rows="10"
                        ></textarea>
                        {errors.desc && errors.desc.type === "required" && (
                            <p className='text-red-500 text-xs italic'>
                                Please fill out this field
                            </p>
                        )}
                    </div>
                </div>
                <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className="flex items-center justify-center px-5">
                        <button
                            className="shadow text-white px-8 py-3 border border-transparent rounded bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none"
                            disabled={loading ? true : false}
                        >
                            {loading ? "Loading ...":"Update Post"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditPost
