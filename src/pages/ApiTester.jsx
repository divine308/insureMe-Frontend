import { useState, useRef, useEffect } from "react";
import {
  FiKey,
  FiSend,
  FiAlertTriangle,
  FiCpu,
  FiUser,
  FiLoader,
  FiActivity
} from "react-icons/fi";

const backendURL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '');

export default function ApiTester({ onChange }) {
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [error, setError] = useState("");

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat, loading]);

  const sendRequest = async () => {
    if (!apiKey.trim()) {
      setError("API key is required.");
      return;
    }

    if (!message.trim()) return;

    const userMessage = message.trim();

    setChat((prev) => [...prev, { role: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${backendURL}/api/insuremeAi/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      if (onChange) onChange();

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply || "No response",
        }
      ]);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerIcon}>
            <FiActivity size={18} />
          </div>
          <div>
            <h2 style={styles.title}>InsureMe AI Test Console</h2>
            <p style={styles.subTitle}>
              Test your API key and monitor AI workflow responses.
            </p>
          </div>
        </div>
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.inputIcon}>
          <FiKey size={18} />
        </div>

        <input
          style={styles.input}
          placeholder="Enter API Key (x-api-key)"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>

      {error && (
        <div style={styles.errorBox}>
          <FiAlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div style={styles.chatBox} ref={chatRef}>
        {chat.length === 0 && !loading && (
          <div style={styles.emptyState}>
            <FiCpu size={40} style={{ opacity: 0.7 }} />
            <p style={styles.emptyText}>
              No messages yet. Enter your API key and start testing.
            </p>
          </div>
        )}

        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.messageRow,
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
            }}
          >
            <div
              style={{
                ...styles.bubble,
                background: msg.role === "user" ? "#818181" : "#2e2e2e",
                border:
                  msg.role === "user"
                    ? "1px solid #818181"
                    : "1px solid #2e2e2e"
              }}
            >
              <div style={styles.bubbleHeader}>
                <span style={styles.roleBadge}>
                  {msg.role === "user" ? (
                    <>
                      <FiUser /> You
                    </>
                  ) : (
                    <>
                      <FiCpu /> AI
                    </>
                  )}
                </span>
              </div>

              <div style={styles.bubbleText}>{msg.text}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ ...styles.messageRow, justifyContent: "flex-start" }}>
            <div style={{ ...styles.bubble, ...styles.loadingBubble }}>
              <FiLoader className="spin" style={styles.loaderIcon} />
              <span>InsureMe AI is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div style={styles.messageInputArea}>
        <textarea
          style={styles.textarea}
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendRequest();
            }
          }}
        />

        <button
          style={{
            ...styles.sendButton,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer"
          }}
          onClick={sendRequest}
          disabled={loading}
        >
          <FiSend size={16} />
          Send
        </button>
      </div>

      <style>
        {`
          .spin {
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "850px",
    margin: "30px auto",
    padding: "22px",
    borderRadius: "16px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    boxShadow: "0px 8px 24px rgba(15, 23, 42, 0.08)",
    fontFamily: "Inter, system-ui, sans-serif"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    borderBottom: "1px solid #e2e8f0",
    marginBottom: 18
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 14
  },

  headerIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "#fff"
  },

  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a"
  },

  subTitle: {
    margin: "4px 0 0",
    fontSize: 13,
    color: "#64748b"
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "10px 12px",
    marginBottom: 14
  },

  inputIcon: {
    color: "#0f172a",
    display: "flex",
    alignItems: "center"
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: 16,
    color: "#0f172a"
  },

  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 14px",
    background: "#fee2e2",
    border: "1px solid #fecaca",
    borderRadius: 12,
    color: "#991b1b",
    fontSize: 13,
    marginBottom: 12
  },

  chatBox: {
    height: "400px",
    overflowY: "auto",
    padding: 14,
    borderRadius: 14,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    gap: 14
  },

  emptyState: {
    margin: "auto",
    textAlign: "center",
    color: "#64748b",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10
  },

  emptyText: {
    margin: 0,
    fontSize: 13,
    maxWidth: 320
  },

  messageRow: {
    display: "flex",
    width: "100%"
  },

  bubble: {
    maxWidth: "78%",
    padding: "12px 14px",
    borderRadius: 14,
    fontSize: 14,
    lineHeight: 1.5,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 8
  },

  bubbleHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  roleBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 600,
    opacity: 0.9
  },

  bubbleText: {
    fontSize: 14,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word"
  },

  workflow: {
    fontSize: 12,
    paddingTop: 8,
    borderTop: "1px solid rgba(255,255,255,0.15)",
    opacity: 0.9
  },

  loadingBubble: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    fontSize: 13
  },

  loaderIcon: {
    fontSize: 18
  },

  messageInputArea: {
    marginTop: 14,
    display: "flex",
    flexDirection: "column",
    gap: 10
  },

  textarea: {
    width: "100%",
    minHeight: 90,
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #e2e8f0",
    outline: "none",
    fontSize: 14,
    resize: "none",
    background: "#ffffff",
    color: "#0f172a",
    height: "2rem"
  },

  sendButton: {
    width: "100%",
    padding: "12px",
    borderRadius: 14,
    border: "none",
    background: "#818181",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  }
};
