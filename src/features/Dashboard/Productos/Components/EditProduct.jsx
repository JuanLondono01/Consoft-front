import React, { useState } from 'react';
import { updateProduct } from '../api/services';


const EditProductModal = ({ product, onClose, onUpdated }) => {
  const [form, setForm] = useState({ ...product });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(product._id, form);
    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="nombre" type="text" value={form.nombre} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="descripcion" type="text" value={form.descripcion} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="precioBase" type="number" value={form.precioBase} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="stock" type="number" value={form.stock} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="id_categoria" type="text" value={form.id_categoria} onChange={handleChange} className="w-full border p-2 rounded" required />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
