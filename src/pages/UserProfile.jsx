import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from '../Components/LogoutButton';
import { Navbar } from '../Components';

export const UserProfile = () => {
    const { user, logout, updateUser } = useContext(AuthContext);
    const [editInfo, setEditInfo] = useState({
        userName: '',
        email: '',
        photoUrl: '',
        biography: '',
        socialMediaLinks: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setEditInfo({
                ...editInfo,
                userName: user.email,
                email: user.email
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogout = () => {
        navigate('/redSocial');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7074/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editInfo)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la información del usuario');
            }

            const result = await response.json();
            alert('Información actualizada con éxito!');
            updateUser(result);
        } catch (error) {
            console.error('Error actualizando la información:', error);
            alert('Hubo un problema al actualizar la información.');
        }
    };

    return (
        <>
            <Navbar/>
            <div className="h-screen  flex items-center justify-center bg-gray-800">
                <div className="sm:w-96 sm:m-auto mx-5  mb-5 bg-black p-10 rounded-lg shadow">
                    <h1 className="font-bold text-center text-4xl text-red-500 mb-5">
                        Perfil del Usuario
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-gray-600">Nombre de usuario (Email):</label>
                            <input
                                type="text"
                                name="userName"
                                value={editInfo.userName}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="text-gray-600">URL de la Foto:</label>
                            <input
                                type="text"
                                name="photoUrl"
                                value={editInfo.photoUrl}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600">Biografía:</label>
                            <textarea
                                name="biography"
                                value={editInfo.biography}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600">Enlaces de Redes Sociales:</label>
                            <input
                                type="text"
                                name="socialMediaLinks"
                                value={editInfo.socialMediaLinks}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                type="submit"
                                className="bg-red-500 text-white font-bold rounded focus:outline-none shadow hover:bg-red-700 transition-colors
                            px-5 py-2 text-center w-full"
                            >
                                Actualizar Información
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col items-center mt-4">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white font-bold rounded focus:outline-none shadow hover:bg-blue-700 transition-colors
                        px-5 py-2 text-center w-full"
                        >
                            regresar a la pagina de inicio
                        </button>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </>
    );
};
