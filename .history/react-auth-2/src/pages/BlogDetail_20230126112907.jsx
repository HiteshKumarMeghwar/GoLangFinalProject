import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'


function BlogDetail() {
    const [singlePost, setSinglePost] = useState();
    const {id} = useParams();
    const navigate = useNavigate();

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

    return (
        <div className='relative'>
            <div className='max-w-3xl mb-10 rounded overflow-hidden flex flex-col mx-auto text-center'>
                <div className='max-w-3xl mx-auto text-xl sm:text-4xl font-semibold inline-block hover:text-indigo-600'>
                    Post Details
                </div>
                <img 
                    className='w-full h-96 my-4'
                    src={singlePost?.image} 
                    alt="" 
                />
                <p className='text-gray-700 text-base leading-8 max-w-2xl mx-auto'>
                    Author: {singlePost?.user?.first_name} {singlePost?.user?.last_name}
                </p>
                <hr />
            </div>
            <div className='max-w-3xl mx-auto'>
                <div className='mt-3 bg-white rounded-b lg-rounded-b-none lg-rounded-r flex flex-col justify-between'>
                    <div>
                        <p className='text-base leading-8 my-5'>{singlePost?.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail
