import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

function UserProfile() {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const User = localStorage.getItem("user");
        if(!User) {
            navigate("/login")
        }
        const parseUser = JSON.parse(User);
        setUserData(parseUser);
    }, [navigate]);

    return (
        <div className="flex flex-col justify-center p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNaZWu6JFF7vxUdvIhvdG8RLQiMCI0RHUaitDRFpmj&s" alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
            <div className="space-y-4 text-center divide-y divide-gray-700">
                <div className="my-2 space-y-1">
                    <h2 className="text-xl font-semibold sm:text-2xl">{userData?.first_name} {userData?.last_name}</h2>
                    <p className="px-5 text-xs sm:text-base dark:text-gray-400">Full-stack developer</p>
                </div>
                <div className="flex justify-center pt-2 space-x-4 align-center">
                    <Link to="/edit_profile" className='flex items-center justify-center text-white px-8 py-3 border border-transparent rounded bg-indigo-600'>
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
