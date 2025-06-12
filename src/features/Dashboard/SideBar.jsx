import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkClasses = (path) =>
    `block px-4 py-2 rounded-md ${
      location.pathname === path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-100 p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="space-y-2">
        <Link to="/dashboard/roles" className={linkClasses("/dashboard/roles")}>Roles</Link>
        <Link to="/dashboard/users" className={linkClasses("/dashboard/users")}>Usuarios</Link>
      </nav>
    </aside>
  );
}
