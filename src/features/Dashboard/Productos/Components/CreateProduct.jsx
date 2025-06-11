import React, { useState } from 'react';
import { createProduct } from '../api/services';


const CreateProductModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precioBase: '',
    stock: '',
    id_categoria: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(form);
    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Crear Producto</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="nombre" type="text" placeholder="Nombre" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="descripcion" type="text" placeholder="Descripción" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="precioBase" type="number" placeholder="Precio" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="stock" type="number" placeholder="Stock" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="id_categoria" type="text" placeholder="ID Categoría" onChange={handleChange} className="w-full border p-2 rounded" required />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Crear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
