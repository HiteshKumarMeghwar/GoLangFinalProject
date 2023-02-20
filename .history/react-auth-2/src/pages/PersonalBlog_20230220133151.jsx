import React, {useState, useEffect} from "react";
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function PersonalBlog() {
    const [blogData, setBlogData] = useState();
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();

    const uniqueBlog = () => {
        setLoading(true);
        let user = localStorage.getItem("user")
        user = JSON.parse(user);
        let body = {
            id : JSON.stringify(user.id),
        }
        axios.post(`http://127.0.0.1:8080/api/uniquepost`,body
        ).then(function(response) {
            // handle access .....
            setLoading(false);
            setBlogData(response?.data)
            // console.log(response?.data)
        }).catch(function(error) {
            // handle error
            setLoading(false);
        }).then(function() {
            //  always executed ....
        });
    }

    useEffect(() => {
        const User = localStorage.getItem("user");
        if(!User){
            navigate("/login")
        }
        uniqueBlog();
    }, [navigate]);

    const deleteBtn = (blog) => {
        setDeleteLoading(true);
        axios.delete(`http://127.0.0.1:8080/api/deletepost/${blog.id}`).then(function(response) {
            // handle access .....
            setDeleteLoading(false);
            uniqueBlog();
        }).catch(function(error) {
            // handle error
            setDeleteLoading(false);
        }).then(function() {
            //  always executed ....
        });
        // console.log(data);
    }

    return (
        <div>
            {!loading && blogData?.length <= 0 && (
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
                    {blogData?.map((blog) => (
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg shadow-lg">
                                <Link to={`/allpost/${blog.id}`}>
                                    <img src={blog?.image} alt="placeholder" className="block h-72 w-full" />
                                </Link>
                                <header className="flex items-center justify-between leading-light p-2 md:p-4">
                                    <h1 className="text-lg">
                                        <Link to={`/allpost/${blog.id}`} className="no-underline hover:underline text-black" >
                                            {blog.title}
                                        </Link>
                                    </h1>
                                    <p className="text-grey-darker text-sm">
                                        {new Date(blog?.CreatedAt).toLocaleString()}
                                    </p>
                                </header>
                                <footer className="flex items-center justify-between leading-light p-2 md:p-4">
                                    <Link to={`/allpost/${blog.id}`} className="no-underline hover:underline text-black" >
                                        <img src={blog?.image} alt="placeholder" className="block rounded-full h-5 w-5" />
                                        <p>{blog?.user?.first_name} {blog?.user?.last_name}</p>
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
    );
}
