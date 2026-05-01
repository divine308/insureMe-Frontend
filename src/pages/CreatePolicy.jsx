import { useState, useRef } from "react";
import { createPolicy } from "../services/api";
import { FiCheck } from "react-icons/fi";

const page = {
  background: "#f8fafc",
  minHeight: "100vh",
  padding: 30
};

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  border: "1px solid #e2e8f0",
  borderRadius: 10
};

const button = {
  background: "#0f172a",
  color: "#fff",
  padding: 12,
  border: "none",
  borderRadius: 10,
  cursor: "pointer"
};

const warningBox = {
  background: "#fff7ed",
  border: "1px solid #fdba74",
  color: "#9a3412",
  padding: 10,
  borderRadius: 10,
  fontSize: 13,
  marginBottom: 12
};

const successBox = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "#ecfdf5",
  border: "1px solid #6ee7b7",
  color: "#065f46",
  padding: 10,
  borderRadius: 10,
  fontSize: 13,
  marginBottom: 12
};

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

export default function CreatePolicy({ onChange }) {
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
  const selected = e.target.files[0];
  if (!selected) return;

  setFile(selected);

  if (selected.type === "text/plain") {
    const reader = new FileReader();
    reader.onload = (event) => {
      setFilePreview(event.target.result);
    };
    reader.readAsText(selected);
  } else {
    setFilePreview("Preview not available for this file type");
  }
};

 const submit = async () => {
  if (!form.name || !form.description || !file) {
    setNotification({
      type: "error",
      message: "Please fill all fields and upload a file before continuing."
    });
    return;
  }

  setLoading(true); 

  const data = new FormData();
  data.append("name", form.name);
  data.append("description", form.description);
  data.append("file", file);

  try {
    await createPolicy(data);

    setNotification({
      type: "success"
    });

    setForm({});
    setFile(null);
    setFilePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (onChange) onChange();

  } catch (err) {
    setNotification({
      type: "error",
      message: err.response?.data?.error || "Failed to create policy"
    });

  } finally {
    setLoading(false);
  }

  setTimeout(() => setNotification(null), 3000);
};

  return (
    <div style={page}>
      <h2 style={{ color: "#0f172a", marginBottom: 20 }}>
        Create Policy
      </h2>

      {notification?.type === "error" && (
        <div style={warningBox}>
          {notification.message}
        </div>
      )}

      {notification?.type === "success" && (
        <div style={successBox}>
          <FiCheck />
          Policy created successfully
        </div>
      )}

      <input
        placeholder="Policy Name eg Health Insurance"
        style={input}
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Description"
        style={input}
        value={form.description || ""}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

     <input
        type="file"
        accept=".txt"
        style={input}
        onChange={handleFile}
        ref={fileInputRef}
      />

      {file && file.type === "application/pdf" ? (
        <iframe
          src={URL.createObjectURL(file)}
          style={{
            width: "100%",
            height: 400,
            border: "1px solid #e2e8f0",
            borderRadius: 10,
            marginBottom: 12
          }}
        />
      ) : filePreview ? (
        <div
          style={{
            background: "#f1f5f9",
            padding: 12,
            borderRadius: 10,
            marginBottom: 12,
            fontSize: 12,
            maxHeight: 150,
            overflowY: "auto",
            whiteSpace: "pre-wrap"
          }}
        >
          <b style={{ display: "block", marginBottom: 6 }}>
            File Preview:
          </b>
          {filePreview}
        </div>
      ) : null}

      <button
        style={{
          ...button,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8
        }}
        onClick={submit}
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner />
            Uploading...
          </>
        ) : (
          "Upload Policy"
        )}
      </button>
    </div>
  );
}
