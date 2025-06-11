import React, { useState } from 'react';
import { createUser } from '../api/services';


function CreateUserModal({ onClose, onUserCreated, roles }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    telefono: '',
    password: '',
    rol: '',
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await createUser(formData);
    onUserCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>

        {['nombre', 'correo', 'direccion', 'telefono', 'password'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
            type={field === 'password' ? 'password' : 'text'}
            className="w-full mb-2 p-2 border rounded"
          />
        ))}

        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Seleccione un rol</option>
          {roles.map(r => (
            <option key={r._id} value={r._id}>{r.nombreRol}</option>
          ))}
        </select>

        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="mr-2 px-4 py-2 border rounded">
            Cancelar
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUserModal;
