import { useEffect, useState } from "react";
import { getPolicies, updatePolicy, deletePolicy } from "../services/api";
import { FiTrash2, FiEdit, FiSave } from "react-icons/fi";


export default function Policy({ onChange, setActive }) {
  const [policies, setPolicies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openFileId, setOpenFileId] = useState(null);

  const fetchPolicies = async () => {
    try {
      const res = await getPolicies();
      setPolicies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleDelete = async () => {
  try {
    await deletePolicy(selectedId);

    await fetchPolicies(); 

    setShowDeleteModal(false);
    setSelectedId(null);

    if (onChange) onChange();

  } catch (err) {
    console.log(err);
  }
};

  const handleSave = async (id) => {
    try {
      const res = await updatePolicy(id, { description: editText });

      setPolicies(
        policies.map((p) =>
          p._id === id ? { ...p, description: res.data.description } : p
        )
      );

      setEditingId(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Policies</h2>

      <div style={{ marginTop: 20 }}>
       {policies.length === 0 ? (
          <div
            style={{
              background: "#fff",
              border: "1px dashed #cbd5e1",
              borderRadius: 12,
              padding: 30,
              textAlign: "center",
              color: "#64748b"
            }}
          >
            <h3 style={{ marginBottom: 8, color: "#0f172a" }}>
              No Policies Found
            </h3>

            <p style={{ fontSize: 13, lineHeight: "1.5" }}>
              You haven't created any insurance policies yet.
              <br />
              Once policies are added, they will appear here for management, editing, and AI evaluation.
            </p>

            <p
              onClick={() => {
                if (onChange) onChange(); 
                setActive("create");
              }}
              style={{
                marginTop: 14,
                fontSize: 13,
                fontWeight: 600,
                color: "#0f172a",
                cursor: "pointer",
                textDecoration: "underline"
              }}
            >
              Create Policy
            </p>
          </div>
        ) : (
          policies.map((p) => (
            <div
              key={p._id}
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 15,
                marginBottom: 12
              }}
            >
              <div style={{ fontWeight: 600 }}>{p.name}</div>

              {editingId === p._id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 8,
                    marginTop: 8,
                    border: "1px solid #ccc",
                    borderRadius: 6
                  }}
                />
              ) : (
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>
                  {p.description}
                </div>
              )}

              <div style={{ marginTop: 10 }}>
                <details>
                  <summary style={{ cursor: "pointer", fontSize: 13 }}>
                    View File {p.rawText ? "" : "(No file uploaded)"}
                  </summary>

                  <div style={{ marginTop: 12 }}>
                    {p.rawText ? (
                      <div
                        style={{
                          background: "#f1f5f9",
                          padding: 10,
                          borderRadius: 8,
                          fontSize: 12,
                          overflowX: "auto",
                          whiteSpace: "pre-wrap",
                          border: "1px solid #e2e8f0"
                        }}
                      >
                        {p.rawText}
                      </div>
                    ) : (
                      <p style={{ color: "#64748b" }}>
                        No file content available
                      </p>
                    )}
                  </div>
                </details>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                {editingId === p._id ? (
                  <FiSave
                    style={{ cursor: "pointer", color: "green" }}
                    onClick={() => handleSave(p._id)}
                  />
                ) : (
                  <FiEdit
                    style={{ cursor: "pointer", color: "#0f172a" }}
                    onClick={() => {
                      setEditingId(p._id);
                      setEditText(p.description);
                    }}
                  />
                )}

                <FiTrash2
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => {
                    setSelectedId(p._id);
                    setShowDeleteModal(true);
                  }}
                />
              </div>
            </div>
          ))
        )}
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
            <h3 style={{ marginBottom: 10 }}>Delete Policy?</h3>
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
