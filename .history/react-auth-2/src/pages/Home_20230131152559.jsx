import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Home() {
  const [userData, setUserData] = useState();
  const [blogData, setBlogData] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const allBlog = async () => {
    setLoading(true);
    let user = localStorage.getItem("user")
    user = JSON.parse(user);
    let body = {
        id : JSON.stringify(user.id),
    }
    await axios.post(`http://127.0.0.1:8080/api/allpost`, body)
    .then(function(response) {
        // handle access .....
        setLoading(false);
        setBlogData(response?.data.data)
        console.log(response?.data.data)
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
    const parseUser = JSON.parse(User);
    setUserData(parseUser);
    allBlog();
  }, [navigate]);

  const deleteBtn = async (blog) => {
      setDeleteLoading(true);
      await axios.delete(`http://127.0.0.1:8080/api/deletepost/${blog.id}`).then(function(response) {
          // handle access .....
          setDeleteLoading(false);
          // openSnackbar(error?.response?.data?.message);
          allBlog();
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
    <>
      <div>
        <div className='relative h-screen w-full flex items-center justify-center text-center bg-cover bg-center'>
          <div className='absolute top-0 right-0 bottom-0 left-0 bg-gray-900 capacity-75'></div>
          <main className='px-4 sm:px-6 lg:px-8 z-10'>
            <div className='text-center'>
              <h2 className='text-4xl tracking-tight leading-10 font-medium sm:text-5xl text-white sm:leading-normal'>
                <span className='text-indigo-600 font-bold'>
                  Hi {userData?.firs_name} {userData?.last_name}
                </span>{" "}
                Welcome to my site!
              </h2>
              <p className='mt-3 text-white sm:mt-5 sm:text-md sm:max-w-xl sm:mx-auto md:mt-5'>
                Open Graph is an internet protocol that was
                created by Facebook ( meta ) to standardize the
                use of metadata within a webpage to represent 
                the content of a page
              </p>
              <div className='mt-5 sm:mt-8 sm:flex justify-center'>
                <div className='rounded-md shadow'>
                  <Link to="/create_post" className='w-full flex items-center justify-center px-8 py-3 border border-transparent rounded bg-indigo-600'>Create Post</Link>
                </div>
                <div className='mt-3 sm:mt-0 sm:ml-3'>
                  <Link to="/personal_posts" className='w-full flex items-center justify-center px-8 py-3 border border-transparent rounded bg-indigo-50 '>View My Post</Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        {!blogData && blogData?.length <= 0 && (
            <div className="text-2xl font-bold text-center flex justify-center items-center pl-16 pt-24">
                <h1>You don't have post any yet. Kindly create a post</h1>
            </div>
        )}
        {loading && (
            <div className="text-2xl font-bold text-center px-56 pt-24">
                <h1>Loading....</h1>
            </div>
        )} 
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
                            {userData && userData?.role_id === 3 && blog?.user?.id === userData?.id && (
                              <>
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
                              </>
                            )}
                            {userData && userData?.role_id === 2 && ( blog?.user?.id === userData?.id || blog?.user?.role_id === 3) && (
                              <>
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
                              </>
                            )}
                            {userData && userData?.role_id === 1 && (
                              <>
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
                              </>
                            )}
                        </footer>
                    </article>
                </div>
            ))}
        </div>
      </div>
    </>
    
  )
}

export default Home
