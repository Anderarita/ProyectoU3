import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Components';
//import jwt_decode from 'jwt-decode';

const User = ({ user }) => {
    const token = localStorage.getItem('token');
    //const decodedToken = jwt_decode(token);
    //const currentUserId = decodedToken.userId;
    const naviagte = useNavigate();

    const handleFollow = async () => {
        try {
            const response = await fetch(`https://localhost:7074/api/follows/${currentUserId}/follow/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error al seguir al usuario.');
            alert('Usuario seguido correctamente.');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="border p-3 mb-4 rounded-md w-full md:w-1/2 xl:w-1/3 overflow-hidden my-2 bg-blue-100">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>{user.email}</p>
            <button
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none"
                onClick={handleFollow}
            >
                Seguir
            </button>
        </div>
    );
};





const ListUser = () => {
    const [users, setUsers] = useState([]);
    const token = 'your_api_token_here';
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('https://localhost:7074/api/login/list-users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Network response was not ok.');
                const result = await response.json();
                if (result.status && Array.isArray(result.data)) {
                    setUsers(result.data);
                    console.log('Data set in state:', result.data);
                } else {
                    console.error('Expected an array of users, but received:', result);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        fetchUsers();
    }, []);

    const handleLogout = () => {
        navigate('/redSocial');
    };
    console.log('Users in state:', users);

    return (
        <>
            <Navbar />
            <div className="p-6 flex flex-col items-center overflow-y-auto mb-6 bg-gray-700">
                
                {users.map(user => (
                    <User key={user.id} user={user} />
                ))}

            </div>
        </>
    );
};

export default ListUser;



