import React, {useState, useEffect} from 'react'
import axios from 'axios'
// import {useSnackbar} from 'react-simple-snackbar'
import { useNavigate, Link } from 'react-router-dom'

function AllUsers() {
    const [allUsersData, setAllUsersData] = useState();
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();

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

    const allUsers = async () => {
        setLoading(true);
        await axios.get(`http://127.0.0.1:8080/api/allUsers`)
        .then(function(response) {
            // handle access .....
            setLoading(false);
            setAllUsersData(response?.data)
            console.log(response?.data)
        }).catch(function(error) {
            // handle error
            setLoading(false);
        }).then(function() {
            //  always executed ....
        });
    }

    useEffect(() => {
        const User = localStorage.getItem("user");
        if(!User) {
            navigate("/login")
        }
        allUsers();
    }, [navigate]);

    const deleteBtn = async (blog) => {
        setDeleteLoading(true);
        await axios.delete(`http://127.0.0.1:8080/api/deletepost/${blog.id}`).then(function(response) {
            // handle access .....
            setDeleteLoading(false);
            // openSnackbar(error?.response?.data?.message);
            allUsers();
        }).catch(function(error) {
            // handle error
            setDeleteLoading(false);
            // setMessage(error?.response?.data?.message);
            // openSnackbar(error?.response?.data?.message);
            // console.log(error?.response?.data?.message);
        }).then(function() {
            //  always executed ....
        });
        // console.log(data);
    }
    
    return (
        <div>
            {!loading && allUsersData?.length <= 0 && (
                <div className="text-2xl font-bold text-center flex justify-center items-center pl-16 pt-24">
                    <h1>You don't have post any yet. Kindly create a post</h1>
                </div>
            )}
            {loading && (
                <div className="text-2xl font-bold text-center px-56 pt-24">
                    <h1>Loading....</h1>
                </div>
            )}
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:mx-4">
                    {allUsersData?.map((blog) => (
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg shadow-lg">
                                <Link to={`/allpost/${blog.id}`}>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNaZWu6JFF7vxUdvIhvdG8RLQiMCI0RHUaitDRFpmj&s" alt="placeholder" className="block h-72 w-full" />
                                </Link>
                                <header className="flex items-center justify-between leading-light p-2 md:p-4">
                                    <h1 className="text-lg">
                                        <Link to={`/allpost/${blog.id}`} className="no-underline hover:underline text-black" >
                                            {blog.first_name} {blog.last_name}
                                        </Link>
                                    </h1>
                                    <p className="text-grey-darker text-sm">
                                        {blog.email}
                                    </p>
                                </header>
                                <footer className="flex items-center justify-between leading-light p-2 md:p-4">
                                    <Link to={`/allpost/${blog.id}`} className="no-underline hover:underline text-black" >
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNaZWu6JFF7vxUdvIhvdG8RLQiMCI0RHUaitDRFpmj&s" alt="placeholder" className="block rounded-full h-5 w-5" />
                                        <p>{blog.phone}</p>
                                    </Link>
                                    <div>
                                        <button
                                            onClick={() => deleteBtn(blog)}
                                            disabled={loading ? true : false}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            {deleteLoading ? "Loading" : "Delete"}
                                        </button>
                                    </div>
                                    <div>
                                        <Link to={`/edit_post/${blog.id}`}>
                                            <button 
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Edit
                                            </button>
                                        </Link>
                                    </div>
                                </footer>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllUsers