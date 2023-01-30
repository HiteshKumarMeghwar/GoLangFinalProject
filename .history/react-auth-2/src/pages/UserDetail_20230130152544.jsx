import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

function UserDetail() {
    const [singleUser, setSingleUser] = useState();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const singleBlog = () => {
            axios.post(`http://127.0.0.1:8080/api/allUsers/${id}`, {withCredentials: true})
            .then(function(response) {
                // handle access .....
                setSingleUser(response?.data?.data);
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
                    User Details
                </div>
                <img 
                    className='w-full h-96 my-4'
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNaZWu6JFF7vxUdvIhvdG8RLQiMCI0RHUaitDRFpmj&s" 
                    alt="placeholder" 
                />
                <p className='text-gray-700 text-base leading-8 max-w-2xl mx-auto'>
                    Author: {singleUser?.first_name} {singleUser?.last_name}
                </p>
                <hr />
            </div>
            <div className='max-w-3xl mx-auto'>
                <div className='mt-3 bg-white rounded-b lg-rounded-b-none lg-rounded-r flex flex-col justify-between'>
                    <div>
                        <p className='text-base leading-8 my-5'>{singleUser?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail
