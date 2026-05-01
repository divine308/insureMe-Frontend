import { useEffect, useState } from "react";
import { getDashboard, generateApiKey } from "../services/api";
import { useNavigate } from "react-router-dom";
import CreatePolicy from "./CreatePolicy";
import Policy from "./Policy";
import UsageLogs from "./UsageLogs";
import ApiTester from "./ApiTester";
import {
  FiGrid,
  FiKey,
  FiFileText,
  FiPlus,
  FiList,
  FiMenu,
  FiX,
  FiLogOut,
  FiCopy,
  FiCheck
} from "react-icons/fi";

const layout = {
  minHeight: "100vh",
  background: "#f8fafc",
  position: "relative",
  overflowX: "hidden"
};

const backdrop = (open) => ({
  display: open ? "block" : "none",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 10
});

const sidebar = (open) => ({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: 200, 
  background: "#0f172a",
  color: "#fff",
  padding: 16,
  transform: open ? "translateX(0)" : "translateX(-100%)",
  transition: "0.3s ease",
  zIndex: 20,
  display: "flex",
  flexDirection: "column"
});

const sidebarItemHover = {
  transition: "0.2s",
};

const sidebarItemHoverStyle = {
  background: "#334155",
};

const topbar = {
  height: 60,
  background: "#fff",
  borderBottom: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  padding: "0 16px", 
  justifyContent: "space-between"
};

const content = {
  padding: 20,
  maxWidth: "100%",
  overflowX: "hidden"
};

const menuItem = (active, isSelected) => ({
  padding: "10px 12px",
  cursor: "pointer",
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  gap: 10,
  borderRadius: 8,
  background: isSelected ? "#1e293b" : "transparent",
  transition: "0.2s ease",
  color: "#fff"
});

const Spinner = () => (
  <span
    style={{
      width: 14,
      height: 14,
      border: "2px solid #ffffff55",
      borderTop: "2px solid #ffffff",
      borderRadius: "50%",
      display: "inline-block",
      animation: "spin 0.8s linear infinite"
    }}
  />
);


export default function Overview() {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false); 
  const [active, setActive] = useState("overview");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const hasApiKey = user?.apiKeys?.length > 0;
  const [copied, setCopied] = useState(false);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("company");
  navigate("/");
};

const fetchDashboard = async () => {
  try {
    const res = await getDashboard();

    setData(res.data);
    setUser(res.data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchDashboard();
}, []);

useEffect(() => {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}, []);


  return (
    <div style={layout}>
      <div
        style={backdrop(open)}
        onClick={() => setOpen(false)}
      />
      <div style={sidebar(open)}>
      
       <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20
        }}>
          <h3 style={{ margin: 0 }}>InsureMe</h3>

          <button
            onClick={() => setOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: 6
            }}
          >
            <FiX size={20} />
          </button>
        </div>

        <div
          style={menuItem(active === "overview", active === "overview")}
          onClick={() => {
            setActive("overview");
            setOpen(false);
          }}
        >
          <FiGrid /> Overview
        </div>

        <div
          style={menuItem(active === "api", active === "api")}
          onClick={() => {
            setActive("api");
            setOpen(false);
          }}
        >
          <FiKey /> API Key
        </div>

        <div
          style={menuItem(active === "policies", active === "policies")}
          onClick={() => {
            setActive("policies");
            setOpen(false);
          }}
        >
          <FiFileText /> Policies
        </div>

        <div
          style={menuItem(active === "create", active === "create")}
          onClick={() => {
            setActive("create");
            setOpen(false);
          }}
        >
          <FiPlus /> Create Policy
        </div>

        <div
          style={menuItem(active === "logs", active === "logs")}
          onClick={() => {
            setActive("logs");
            setOpen(false);
          }}
        >
          <FiList /> Logs
        </div>

        <div>
          <div
            style={menuItem(false)}
            onClick={handleLogout}
          >
            <FiLogOut /> Logout
          </div>
        </div>
        
      </div>

      <div style={{ width: "100%" }}>

        <div
          style={{
            height: 60,
            background: "#fff",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!open && (
              <button
                onClick={() => setOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 6,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "-16px"
                }}
              >
                <FiMenu size={22} />
              </button>
            )}

            <div style={{ fontSize: 14, fontWeight: 500, color: "#0f172a" }}>
              Dashboard
            </div>
          </div>
          <div style={{ fontSize: 13, color: "#64748b" }}>
            Welcome, <span style={{ fontWeight: 500 }}>{user?.company || "User"}</span>
          </div>
        </div>

        <div style={content}>

        {active === "overview" && (
          <>
            <h2 style={{ color: "#0f172a" }}>Overview</h2>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              marginTop: 20
            }}>
              <Card title="Credits" value={data?.credits || 0} />
              <Card title="Total Policies" value={data?.stats?.totalPolicies || 0} />
              <Card title="Active Policies" value={data?.stats?.activePolicies || 0} />
              <Card title="API Requests" value={data?.stats?.requests || 0} />
              <Card title="Requests Today" value={data?.stats?.requestsToday || 0} />
              <Card title="Failed Requests" value={data?.stats?.failedRequests || 0} />
            </div>

            <Box title="API Health">
              <p>
                API Key Status:{" "}
                <b style={{ color: hasApiKey ? "green" : "red" }}>
                  {hasApiKey ? "Active" : "Not Generated"}
                </b>
              </p>
            </Box>

            <Box title="Policy Status">
              <p>Total Policies: {data?.stats?.totalPolicies || 0}</p>
              <p>Last Update: {data?.stats?.lastPolicyUpdate ? new Date(data.stats.lastPolicyUpdate).toLocaleString() : "No updates yet" }</p>

              {data?.stats?.totalPolicies === 0 && (
                <p style={{ color: "orange" }}>
                  No policies uploaded yet. Your API will not evaluate properly.
                </p>
              )}
            </Box>

           <Box title="AI Insights">
              <details>
                <summary style={{ cursor: "pointer", fontSize: 13 }}>
                  View AI Insights
                </summary>

                <div style={{ marginTop: 12 }}>
                  {data?.insights?.length ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {data.insights.map((insight, i) => (
                        <div
                          key={i}
                          style={{
                            padding: 14,
                            borderRadius: 10,
                            border: "1px solid #e2e8f0",
                            background:
                              insight.type === "danger"
                                ? "#fee2e2"
                                : insight.type === "warning"
                                ? "#fef9c3"
                                : insight.type === "success"
                                ? "#dcfce7"
                                : "#e0f2fe",
                            color: "#0f172a"
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: 14 }}>
                            {insight.title}
                          </div>

                          <div style={{ fontSize: 13, marginTop: 4 }}>
                            {insight.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: "#64748b" }}>No insights available yet</p>
                  )}
                </div>
              </details>
            </Box>

           <Box title="Recent Activity">
            <details>
              <summary style={{ cursor: "pointer", fontSize: 13 }}>
                View Recent Activity
              </summary>

              <div style={{ marginTop: 12 }}>
                {data?.recentActivity?.length ? (
                  <ul>
                    {data.recentActivity.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No activity yet</p>
                )}
              </div>
            </details>
          </Box>

            <Box title="Alerts">
              {data?.alerts?.length ? (
                data.alerts.map((alert, i) => (
                  <p key={i} style={{ color: "orange" }}>
                    {alert}
                  </p>
                ))
              ) : (
                <p style={{ color: "#64748b" }}>No alerts</p>
              )}
            </Box>
          </>
        )}

      {/* {active === "api" && (
        <Box title="API Key Management">

          <p style={{ fontSize: 13, color: "#64748b" }}>
            Generate and manage your InsureMe API key
          </p>

          {!hasApiKey && (
            <button
              disabled={loading}
              onClick={async () => {
                try {
                  setLoading(true);

                  const res = await generateApiKey();
                  const newKey = res.data.apiKey;

                  setUser(prev => ({
                    ...prev,
                    apiKeys: [{ key: newKey }]
                  }));
                } catch (err) {
                } finally {
                  setLoading(false);
                }
              }}
              style={{
                marginTop: 12,
                padding: "10px 14px",
                borderRadius: 8,
                border: "none",
                background: loading ? "#475569" : "#0f172a",
                color: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              {loading ? <Spinner /> : "Generate API Key"}
            </button>
          )}

          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              Current API Key:
            </div>

            <div
              style={{
                marginTop: 6,
                fontSize: 14,
                wordBreak: "break-all",
                padding: "10px",
                background: "#f1f5f9",
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10
              }}
            >
              <span>
                {hasApiKey
                  ? user.apiKeys[0].key
                  : "No API key generated yet"}
              </span>

              {hasApiKey && (
                copied ? (
                  <FiCheck style={{ color: "green" }} />
                ) : (
                  <FiCopy
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigator.clipboard.writeText(user.apiKeys[0].key);
                      setCopied(true);

                      setTimeout(() => setCopied(false), 1500);
                    }}
                  />
                )
              )}
            </div>
          </div>

        </Box>
      )} */}

      {active === "api" && (
  <>
    <Box title="API Key Management">

      <p style={{ fontSize: 13, color: "#64748b" }}>
        Generate and manage your InsureMe API key
      </p>

      {!hasApiKey && (
        <button
          disabled={loading}
          onClick={async () => {
            try {
              setLoading(true);

              const res = await generateApiKey();
              const newKey = res.data.apiKey;
              await fetchDashboard();
              setUser(prev => ({
                ...prev,
                apiKeys: [{ key: newKey }]
              }));
            } catch (err) {
              console.log(err);
            } finally {
              setLoading(false);
            }
          }}
          style={{
            marginTop: 12,
            padding: "10px 14px",
            borderRadius: 8,
            border: "none",
            background: loading ? "#475569" : "#0f172a",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8
          }}
        >
          {loading ? <Spinner /> : "Generate API Key"}
        </button>
      )}

      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 12, color: "#64748b" }}>
          Current API Key:
        </div>

        <div
          style={{
            marginTop: 6,
            fontSize: 14,
            wordBreak: "break-all",
            padding: "10px",
            background: "#f1f5f9",
            borderRadius: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10
          }}
        >
          <span>
            {hasApiKey
              ? user.apiKeys[0].key
              : "No API key generated yet"}
          </span>

          {hasApiKey && (
            copied ? (
              <FiCheck style={{ color: "green" }} />
            ) : (
              <FiCopy
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(user.apiKeys[0].key);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              />
            )
          )}
        </div>
      </div>

    </Box>

    {/* 🧪 TEST AREA (TEMPORARY) */}
    <Box title="API Test Console (Dev Only)">
      <ApiTester onChange={fetchDashboard} />
    </Box>
  </>
)}

         {active === "policies" && (
            <Policy onChange={fetchDashboard} />
         )}

          {active === "create" && (
            <CreatePolicy onChange={fetchDashboard} />
          )}

         {active === "logs" && (
           <UsageLogs />
         )}

        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      background: "#fff",
      padding: 20,
      borderRadius: 12,
      border: "1px solid #e2e8f0",

      flex: "1 1 100px",  
      minWidth: 100,      

      boxSizing: "border-box"
    }}>
      <div style={{ fontSize: 12, color: "#64748b" }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: "bold" }}>{value}</div>
    </div>
  );
}

function Box({ title, children }) {
  return (
    <div style={{
      background: "#fff",
      padding: 20,
      borderRadius: 12,
      border: "1px solid #e2e8f0",
      marginTop: 20,
      maxWidth: "100%"
    }}>
      <h3 style={{ marginBottom: 10 }}>{title}</h3>
      <div style={{ color: "#475569", fontSize: 14 }}>
        {children}
      </div>
    </div>
  );
}

