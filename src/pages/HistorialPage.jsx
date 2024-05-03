import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { Navbar } from '../Components'; 

export const HistorialPage = () => {
    const [acciones, setAcciones] = useState([]); 
    const [email, setEmail] = useState(''); 

    useEffect(() => {
        const fetchAcciones = async () => {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            const token = user.token;

            // Decodifica el payload del token para obtener el UserId y el email
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const payload = JSON.parse(jsonPayload);
            const userId = payload.UserId;
            const userEmail = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

            setEmail(userEmail); // Almacenar el email en el estado

            if (!token || !userId) {
                console.error("Token de autorización o User ID no encontrado");
                return;
            }

            try {
                const response = await fetch(`https://localhost:7074/api/logs/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Fallo al cargar las acciones');
                const data = await response.json();
                setAcciones(data || []);
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        };

        fetchAcciones();
    }, []);

    const data = useMemo(() => acciones.map(accion => ({
        email,
        action: accion.action,
        date: accion.date
    })), [acciones, email]);

    const columns = useMemo(() => [
        {
            Header: 'Usuario (Email)',
            accessor: 'email' // Key from data
        },
        {
            Header: 'Acción',
            accessor: 'action' // Key from data
        },
        {
            Header: 'Fecha y Hora',
            accessor: 'date' // Key from data
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div>
            <Navbar /> 
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Historial de Acciones</h1>
                <table {...getTableProps()} className="min-w-full table-auto text-center">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} className="px-6 py-3 bg-blue-100">
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="bg-white border-b">
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="px-6 py-4">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistorialPage;
