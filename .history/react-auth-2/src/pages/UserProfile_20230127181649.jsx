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
        <div>
            {userData && (
                <>
                    <h1>{userData?.first_name} {userData?.last_name}</h1>
                </>
            )}
        </div>
    )
}

export default UserProfile
