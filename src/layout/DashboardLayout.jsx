import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}