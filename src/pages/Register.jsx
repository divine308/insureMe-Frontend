import { useState, useEffect } from "react";
import { registerUser, verifyOtp, loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const page = {
  minHeight: "100vh",
  background: "#f8fafc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 30
};

const card = {
  width: "100%",
  maxWidth: 420,
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  boxSizing: "border-box"
};

const title = {
  fontSize: 24,
  fontWeight: 600,
  color: "#0f172a",
  marginBottom: 6
};

const subtitle = {
  fontSize: 13,
  color: "#64748b",
  marginBottom: 20
};

const input = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: 12,
  border: "1px solid #e2e8f0",
  borderRadius: 10,
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box" 
  
};

const button = {
  width: "100%",
  padding: 12,
  marginTop: 8,
  borderRadius: 10,
  border: "none",
  background: "#0f172a",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8
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
      animation: "spin 0.8s linear infinite",
      marginRight: 8
    }}
  />
);

const warningBox = {
  background: "#fff7ed",
  border: "1px solid #fdba74",
  color: "#9a3412",
  padding: 10,
  borderRadius: 10,
  fontSize: 13,
  marginBottom: 12
};


export default function Register() {
  const nav = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const [mode, setMode] = useState( location.state?.mode || "register");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [inlineError, setInlineError] = useState(null);
 const [form, setForm] = useState({
  name: "",
  email: "",
  company: "",
  password: "",
  confirmPassword: ""
});

  const showToast = (message, type = "success") => {
  setToast({ message, type });

  setTimeout(() => {
    setToast(null);
  }, 3000);
};

const validate = () => {
  let err = {};

  if (mode === "register") {
    if (!form.name) err.name = true;
    if (!form.email) err.email = true;
    if (!form.password) err.password = true;
    if (!form.confirmPassword) err.confirmPassword = true;

    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      err.confirmPassword = true;
    }
  }

  if (mode === "login") {
    if (!form.email) err.email = true;
    if (!form.password) err.password = true;
  }

  setErrors(err);

  return Object.keys(err).length === 0;
};

 const submit = async () => {
  setInlineError(null);
  try {
    setLoading(true);

    await registerUser(form);

    showToast("OTP sent to your email", "success");
    setStep(2);
  } catch (err) {
   showToast(err.response?.data?.error || "Registration failed", "error");
  } finally {
    setLoading(false);
  }
};

const verify = async () => {
  try {
    setLoading(true);

    const res = await verifyOtp({
      email: form.email.trim().toLowerCase(),
      otp: String(otp).trim()
    });

    localStorage.setItem("company", res.data.company);

    setMode("login");
    setStep(1);
    setOtp("");

    showToast("Account verified successfully. Please login", "success");

  } catch (err) {
    showToast(err.response?.data?.error || "Invalid OTP", "error");
  } finally {
    setLoading(false);
  }
};

const login = async () => {
  try {
    if (!validate()) {
      setInlineError("Please fill all fields before continuing.");
      return;
    }

    const res = await loginUser({
      email: form.email,
      password: form.password
    });

    localStorage.setItem("token", res.data.token);

    localStorage.setItem("company", res.data.company);

    nav("/dashboard");
  } catch (err) {
    showToast(err.response?.data?.error || "Login failed", "error");
  }
};

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
  <div style={page}>
    <div style={card}>

      {mode === "register" && (
        <>
          <h1 style={title}>Create Account</h1>
          <p style={subtitle}>Get your API key and start using InsureMe API</p>

          {inlineError && (
            <div style={warningBox}>
              {inlineError}
            </div>
          )}
        </>
      )}

      {mode === "login" && (
        <>
          <h1 style={title}>Welcome Back</h1>
          <p style={subtitle}>Login to access your dashboard</p>
        </>
      )}

      {mode === "register" && step === 1 && (
        <>
         <input
            style={input}
            placeholder="Name"
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setInlineError(null);
            }}
          />

          <input
            style={input}
            placeholder="Email"
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              setInlineError(null);
            }}
          />

          <input
            style={input}
            placeholder="Company"
            onChange={(e) => {
              setForm({ ...form, company: e.target.value });
              setInlineError(null);
            }}
          />

          <div style={{ position: "relative" }}>
            <input
              style={input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setInlineError(null);
              }}
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 12,
                top: 12,
                cursor: "pointer",
                color: "#64748b"
              }}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>

         <div style={{ position: "relative" }}>
          <input
            style={input}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => {
              setForm({ ...form, confirmPassword: e.target.value });
              setInlineError(null);
            }}
          />

          <div
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: "absolute",
              right: 12,
              top: 12,
              cursor: "pointer",
              color: "#64748b"
            }}
          >
            {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
          </div>
        </div>

          <button
            style={button}
            onClick={() => {
             if (!validate()) {
                setInlineError("Please fill all required fields before continuing.");
                return;
              }
              submit();
            }}
          >
            {loading ? <Spinner /> : "Create Account"}
          </button>

          <p
            style={{
              fontSize: 12,
              color: "#64748b",
              marginTop: 10,
              cursor: "pointer",
              textAlign: "center"
            }}
            onClick={() => setMode("login")}
          >
            Already have an account? Login
          </p>
        </>
      )}


      {mode === "register" && step === 2 && (
        <>
          <p style={subtitle}>Enter OTP sent to {form.email}</p>

          <input
            style={input}
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button style={button} onClick={verify}>
            {loading ? <Spinner /> : "Verify OTP"}
          </button>
        </>
      )}

      {mode === "login" && (
        <>
          <input
            style={input}
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <div style={{ position: "relative" }}>
            <input
              style={input}
              type={showLoginPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <div
              onClick={() => setShowLoginPassword(!showLoginPassword)}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              {showLoginPassword ? (
                <FiEyeOff size={14} />
              ) : (
                <FiEye size={14} />
              )}
            </div>
          </div>

          <button style={button} onClick={login}>
            {loading ? <Spinner /> : "Login"}
          </button>

          <p
            style={{
              fontSize: 12,
              color: "#64748b",
              marginTop: 10,
              cursor: "pointer",
              textAlign: "center"
            }}
            onClick={() => {
              setMode("register");
              setStep(1);
            }}
          >
            Or create account
          </p>

          <p
            style={{ fontSize: 12, color: "#64748b", marginTop: 10, cursor: "pointer" }}
            onClick={() => setMode("forgot")}
          >
            Forgot password?
          </p>
        </>
      )}

      {mode === "forgot" && (
        <>
          <h1 style={title}>Reset Password</h1>

          <p style={subtitle}>
            Enter your email and we'll send you a link to reset your password
          </p>

          <input
            style={input}
            placeholder="Enter email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <button
            style={button}
            onClick={() =>
              showToast("Reset link sent (backend needed)", "success")
            }
          >
            Send Reset Link
          </button>

          <p
            style={{ fontSize: 12, color: "#64748b", marginTop: 10, cursor: "pointer" }}
            onClick={() => setMode("login")}
          >
            Back to login
          </p>
        </>
      )}

    </div>

    {/* TOAST */}
    {toast && (
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          background: toast.type === "success" ? "#0f172a" : "#ef4444",
          color: "white",
          padding: "12px 16px",
          borderRadius: 12,
          fontSize: 13,
          zIndex: 9999
        }}
      >
        {toast.message}
      </div>
    )}
  </div>
);
}

