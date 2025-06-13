import React, { useEffect, useState } from 'react';
import { deleteRole, getRoles } from './api/services';
import CreateRoleModal from './Components/CreateRol';
import EditRoleModal from './Components/EditRol';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al obtener los roles:', error.message);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(`¿Estás seguro de eliminar el rol?`);
    if (!confirm) return;

    try {
      await deleteRole(id);
      fetchRoles();
    } catch (error) {
      console.error('Error al eliminar el rol:', error.message);
    }
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setShowEditModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Gestión de Roles</h1>

      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Crear Nuevo Rol
      </button>

      <table className="w-full table-auto border border-gray-300 mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Descripción</th>
            <th className="px-4 py-2 border">Estado</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role._id} className="text-center border-t">
                <td className="px-4 py-2 border">{role.nombreRol}</td>
                <td className="px-4 py-2 border">{role.descripcion}</td>
                <td className="px-4 py-2 border">
                  {role.estado ? 'Activo' : 'Inactivo'}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(role)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(role._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                No hay roles registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showCreateModal && (
        <CreateRoleModal
          onClose={() => setShowCreateModal(false)}
          onCreated={fetchRoles}
        />
      )}

      {showEditModal && selectedRole && (
        <EditRoleModal
          role={selectedRole}
          onClose={() => {
            setShowEditModal(false);
            setSelectedRole(null);
          }}
          onUpdated={fetchRoles}
        />
      )}
    </div>
  );
};

export default Roles;
