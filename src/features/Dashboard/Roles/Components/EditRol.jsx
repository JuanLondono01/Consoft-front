import React, { useState, useEffect } from 'react';
import { updateRole } from '../api/services';

const EditRoleModal = ({ role, onClose, onUpdated }) => {
  const [nombreRol, setNombreRol] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState(true); 

  useEffect(() => {
    if (role) {
      setNombreRol(role.nombreRol);
      setDescripcion(role.descripcion);
      setEstado(role.estado); 
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRole(role._id, { nombreRol, descripcion, estado }); 
      onUpdated();
      onClose();
    } catch (error) {
      console.error('Error al actualizar el rol:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Rol</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre del rol"
            value={nombreRol}
            onChange={(e) => setNombreRol(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={estado}
              onChange={() => setEstado(!estado)}
              id="estado"
            />
            <label htmlFor="estado">
              {estado ? 'Activo' : 'Inactivo'}
            </label>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoleModal;
