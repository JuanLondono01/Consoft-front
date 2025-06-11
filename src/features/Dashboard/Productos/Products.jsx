import React, { useEffect, useState } from 'react';
import { deleteProduct, getProducts } from './api/services';
import CreateProductModal from './Components/CreateProduct';
import EditProductModal from './Components/EditProduct';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al obtener los productos:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Productos</h1>

      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Crear Nuevo Producto
      </button>

      <table className="w-full mt-4 table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Descripción</th>
            <th className="px-4 py-2 border">Precio</th>
            <th className="px-4 py-2 border">Stock</th>
            <th className="px-4 py-2 border">Estado</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="text-center border-t">
              <td className="px-4 py-2 border">{p._id}</td>
              <td className="px-4 py-2 border">{p.nombre}</td>
              <td className="px-4 py-2 border">{p.descripcion}</td>
              <td className="px-4 py-2 border">${p.precioBase}</td>
              <td className="px-4 py-2 border">{p.stock}</td>
              <td className="px-4 py-2 border">{p.estado ? 'Activo' : 'Inactivo'}</td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  onClick={() => handleEditClick(p)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreateModal && (
        <CreateProductModal
          onClose={() => setShowCreateModal(false)}
          onCreated={fetchProducts}
        />
      )}

      {showEditModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onUpdated={fetchProducts}
        />
      )}
    </div>
  );
};

export default Products;
