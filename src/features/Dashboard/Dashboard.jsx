import { Outlet } from "react-router-dom";
import Sidebar from './SideBar';

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar/>
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
