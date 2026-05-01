import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: 250,
      height: "100vh",
      background: "#020617",
      color: "white",
      padding: 20
    }}>
      <h2>InsureMe</h2>

      <div style={{ marginTop: 20 }}>
        <Link to="/dashboard">Overview</Link><br/>
        <Link to="/apikey">API Keys</Link><br/>
        <Link to="/policies">Policies</Link><br/>
        <Link to="/create">Create Policy</Link><br/>
        <Link to="/logs">Usage Logs</Link>
      </div>
    </div>
  );
}