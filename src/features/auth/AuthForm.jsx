// src/components/AuthForm.jsx
import { useState } from "react";
import { loginUser, registerUser } from './api/services';


export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    telefono: "",
    password: "",
    rol: "", // puedes autocompletarlo o poner un select más adelante
  });

  const toggleForm = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await loginUser({
          correo: formData.correo,
          password: formData.password,
        });
        alert("Sesión iniciada correctamente");
        console.log(res); // guarda token en localStorage si deseas
      } else {
        const res = await registerUser(formData);
        alert("Registro exitoso");
        console.log(res);
      }
    } catch (err) {
      alert("Error: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                name="nombre"
                type="text"
                placeholder="Nombre"
                className="mb-4 w-full px-4 py-2 border rounded-lg"
                value={formData.nombre}
                onChange={handleChange}
              />
              <input
                name="direccion"
                type="text"
                placeholder="Dirección"
                className="mb-4 w-full px-4 py-2 border rounded-lg"
                value={formData.direccion}
                onChange={handleChange}
              />
              <input
                name="telefono"
                type="text"
                placeholder="Teléfono"
                className="mb-4 w-full px-4 py-2 border rounded-lg"
                value={formData.telefono}
                onChange={handleChange}
              />
              <input
                name="rol"
                type="text"
                placeholder="ID del Rol"
                className="mb-4 w-full px-4 py-2 border rounded-lg"
                value={formData.rol}
                onChange={handleChange}
              />
            </>
          )}
          <input
            name="correo"
            type="email"
            placeholder="Correo electrónico"
            className="mb-4 w-full px-4 py-2 border rounded-lg"
            value={formData.correo}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="mb-6 w-full px-4 py-2 border rounded-lg"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Entrar" : "Registrarse"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <button onClick={toggleForm} className="text-blue-600 hover:underline">
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
