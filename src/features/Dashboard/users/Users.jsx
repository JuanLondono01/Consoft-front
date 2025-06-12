import React, { useEffect, useState } from 'react';
import { deleteUser, getUsers } from './api/services.js';
import { getRoles } from '../Roles/api/services.js';
import CreateUserModal from './components/CreateUser.jsx';
import EditUserModal from './components/EditUser.jsx';

function Users() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editUser, setEditUser] = useState(null);

    const loadUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res);
        } catch (err) {
            console.error('Error cargando usuarios:', err);
        }
    };

    const loadRoles = async () => {
        try {
            const res = await getRoles();
            setRoles(res);
        } catch (err) {
            console.error('Error cargando roles:', err);
        }
    };

    useEffect(() => {
        loadUsers();
        loadRoles();
    }, []);

    const handleDelete = async (id) => {
        if (confirm('¿Seguro que deseas eliminar este usuario?')) {
            await deleteUser(id);
            loadUsers();
        }
    };

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold'>Gestión de Usuarios</h2>
                <button
                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                    onClick={() => setShowCreateModal(true)}>
                    Crear Usuario
                </button>
            </div>

            <table className='min-w-full bg-white border rounded shadow'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='px-4 py-2'>Nombre</th>
                        <th className='px-4 py-2'>Correo</th>
                        <th className='px-4 py-2'>Dirección</th>
                        <th className='px-4 py-2'>Teléfono</th>
                        <th className='px-4 py-2'>Rol</th>
                        <th className='px-4 py-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className='border-t'>
                            <td className='px-4 py-2'>{user.nombre}</td>
                            <td className='px-4 py-2'>{user.correo}</td>
                            <td className='px-4 py-2'>{user.direccion}</td>
                            <td className='px-4 py-2'>{user.telefono}</td>
                            <td className='px-4 py-2'>{user.rol?.nombreRol}</td>
                            <td className='px-4 py-2'>
                                <button
                                    onClick={() => setEditUser(user)}
                                    className='bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600'>
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className='bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700'>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showCreateModal && (
                <CreateUserModal onClose={() => setShowCreateModal(false)} onUserCreated={loadUsers} roles={roles} />
            )}

            {editUser && (
                <EditUserModal
                    user={editUser}
                    onClose={() => setEditUser(null)}
                    onUserUpdated={loadUsers}
                    roles={roles}
                />
            )}
        </div>
    );
}

export default Users;
