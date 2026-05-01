import { useEffect, useState } from "react";
import { getLogs, deleteLog } from "../services/api";
import { FiTrash2 } from "react-icons/fi";

const page = {
  background: "#f8fafc",
  minHeight: "100vh",
  padding: 30
};

const card = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: 14,
  marginBottom: 12
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 8,
  fontSize: 13,
  alignItems: "start"
};

const metaRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  fontSize: 12,
  color: "#64748b"
};

export default function UsageLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getLogs();
        setLogs(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteLog(selectedId);

      setLogs((prev) =>
        prev.filter((log) => log._id !== selectedId)
      );

      setShowDeleteModal(false);
      setSelectedId(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={page}>
      <h2 style={{ color: "#0f172a" }}>Usage Logs</h2>

      <div style={{ marginTop: 20 }}>
        {loading && (
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              color: "#64748b",
              fontSize: 13
            }}
          >
            Loading API logs...
          </div>
        )}

        {!loading && logs.length === 0 && (
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              textAlign: "center",
              color: "#64748b"
            }}
          >
            <div style={{ fontSize: 16, color: "#0f172a", marginBottom: 6 }}>
              No API activity yet
            </div>
            <div style={{ fontSize: 13 }}>
              Once your API is called, requests will appear here in real time.
            </div>
          </div>
        )}

        {!loading &&
          logs.map((log) => (
            <div key={log._id} style={card}>
              <div style={row}>
                <div style={{ wordBreak: "break-word" }}>
                  <b>{log.endpoint}</b>
                  <div style={{ fontSize: 11, color: "#64748b" }}>
                    {log.method} • {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>

                <div style={metaRow}>
                  <span>
                    Status:{" "}
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 999,
                        fontSize: 11,
                        background: log.statusCode >= 400 ? "#fee2e2" : "#dcfce7",
                        color: log.statusCode >= 400 ? "#991b1b" : "#166534"
                      }}
                    >
                      {log.statusCode}
                    </span>
                  </span>

                  <span>Credits: {log.creditsUsed || 0}</span>
                  <span>Latency: {log.latencyMs || 0}ms</span>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <FiTrash2
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => {
                      setSelectedId(log._id);
                      setShowDeleteModal(true);
                    }}
                  />
                </div>
              </div>

              <details style={{ marginTop: 10 }}>
                <summary style={{ cursor: "pointer", fontSize: 12 }}>
                  View Details
                </summary>

                <pre
                  style={{
                    fontSize: 11,
                    background: "#f1f5f9",
                    padding: 10,
                    borderRadius: 8,
                    marginTop: 8,
                    overflowX: "auto"
                  }}
                >
                  {JSON.stringify(log, null, 2)}
                </pre>
              </details>
            </div>
          ))}
      </div>

      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 12,
              width: 300,
              textAlign: "center"
            }}
          >
            <h3 style={{ marginBottom: 10 }}>Delete Log?</h3>

            <p style={{ fontSize: 13, color: "#64748b" }}>
              This action cannot be undone.
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedId(null);
                }}
                style={{
                  flex: 1,
                  padding: 10,
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  background: "#fff",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                style={{
                  flex: 1,
                  padding: 10,
                  border: "none",
                  borderRadius: 8,
                  background: "#dc2626",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}