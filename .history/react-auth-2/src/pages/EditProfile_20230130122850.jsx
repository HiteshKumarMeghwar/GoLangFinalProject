import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const User = localStorage.getItem("user");
        if(!User) {
            navigate("/login")
        }
        const parseUser = JSON.parse(User);
        setUserData(parseUser);
        console.log(userData)
    }, [navigate]);

    return (
        <div>
            EditProfile
        </div>
    )
}

export default EditProfile
