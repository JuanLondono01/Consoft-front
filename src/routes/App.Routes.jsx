import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from '../features/auth/LoginPage';
import DashboardLayout from '../features/Dashboard/Dashboard';
import Users from '../features/Dashboard/users/Users';
import Roles from '../features/Dashboard/Roles/Roles';
import Products from '../features/Dashboard/Productos/Products';


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<LoginPage/>} />

        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route path="roles" element={<Roles/>} />
          <Route path="users" element={<Users/>} />
          <Route path="products" element={<Products/>} />
        </Route>

      </Routes>
    </Router>
  );
}
