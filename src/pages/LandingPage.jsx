import { useNavigate } from "react-router-dom";
import {
  FiKey,
  FiFileText,
  FiBarChart2,
  FiCode,
  FiArrowRight,
} from "react-icons/fi";

import {
  FaJs,
  FaPython,
  FaPhp,
  FaJava,
  FaTerminal
} from "react-icons/fa";

import { VscTerminal } from "react-icons/vsc";

const page = {
  fontFamily: "Arial, sans-serif",
  background: "#f8fafc",
  color: "#0f172a"
};

const nav = {
  height: 60,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 16px",
  background: "#fff",
  borderBottom: "1px solid #e2e8f0"
};

const hero = {
  background: "linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb)",
  color: "#fff",
  padding: "80px 20px",
  textAlign: "center"
};

const btnPrimary = {
  background: "#2563eb",
  color: "#fff",
  padding: "12px 18px",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  marginRight: 10,
  fontWeight: 500
};

const btnSecondary = {
  background: "transparent",
  color: "#fff",
  padding: "12px 18px",
  border: "1px solid #fff",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 500
};

const section = {
  padding: "60px 20px",
  maxWidth: 1000,
  margin: "0 auto"
  
};

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 20,
  marginTop: 30
};

const card = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: 20,
};

const codeBox = {
  background: "#0f172a",
  color: "#fff",
  padding: 20,
  borderRadius: 12,
  fontSize: 13,
  overflowX: "auto"
};

export default function Landing() {
  const navg = useNavigate();

  return (
    <div style={page}>

      <div style={nav}>
        <h3 style={{ margin: 0 }}>InsureMe</h3>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => navg("/register", { state: { mode: "login" } })}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: 500
            }}
          >
            Login
          </button>

          <button
            onClick={() => navg("/register", { state: { mode: "register" } })}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      <div style={hero}>
        <h1 style={{ fontSize: 42, marginBottom: 10 }}>
          Insurance Infrastructure API
        </h1>

        <p style={{ fontSize: 16, opacity: 0.9 }}>
          For Developers and Companies
        </p>

        <p style={{ marginTop: 10, opacity: 0.8 }}>
          Build and manage insurance policies with ease.
        </p>

        <div style={{ marginTop: 25 }}>
          <button
            style={btnPrimary}
            onClick={() => navg("/register", { state: { mode: "register" } })}
          >
            Get Started
          </button>

          <button
            style={btnSecondary}
            onClick={() => navg("/register", { state: { mode: "register" } })}
          >
            View Dashboard
          </button>
        </div>
      </div>

      <div style={section}>
        <h2 style={{ textAlign: "center" }}>Why InsureMe API?</h2>

        <div style={grid3}>
          <div style={card}>
            <FiFileText size={24} />
            <h4>Create Policies via API</h4>
            <p style={{ fontSize: 13, color: "#64748b" }}>
              Automate insurance policy creation.
            </p>
          </div>

          <div style={card}>
            <FiKey size={24} />
            <h4>Instant API Keys</h4>
            <p style={{ fontSize: 13, color: "#64748b" }}>
              Generate and manage your API keys.
            </p>
          </div>

          <div style={card}>
            <FiBarChart2 size={24} />
            <h4>Track Usage</h4>
            <p style={{ fontSize: 13, color: "#64748b" }}>
              Monitor requests and analytics.
            </p>
          </div>
        </div>
      </div>

      <div style={section}>
        <h2 style={{ textAlign: "center" }}>How It Works</h2>

        <div style={grid3}>
          <div style={card}>
            <h3>1. Sign Up</h3>
            <p style={{ fontSize: 13 }}>Create your account.</p>
          </div>

          <div style={card}>
            <h3>2. Get API Key</h3>
            <p style={{ fontSize: 13 }}>Receive your API key.</p>
          </div>

          <div style={card}>
            <h3>3. Start Coding</h3>
            <p style={{ fontSize: 13 }}>Integrate with your API.</p>
          </div>
        </div>
      </div>

      <div style={section}>
  <h2
    style={{
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }}
  >
    <FiCode /> Simple API Request
  </h2>

  <p style={{ textAlign: "center", fontSize: 13, color: "#64748b" }}>
    Authenticate using <b>x-api-key</b> header
  </p>

  {/* JS FETCH */}
  <div style={{ marginTop: 30 }}>
    <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <FaJs /> JavaScript (Fetch)
    </h4>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ ...codeBox, width: "100%", maxWidth: 700 }}>
{`fetch("https://api.insureme.com/api/policy", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
  },
  body: JSON.stringify({
    type: "auto",
    description: "Car insurance for Toyota Camry 2019 covering accident and theft"
  })
});`}
      </div>
    </div>
  </div>

  {/* AXIOS */}
  <div style={{ marginTop: 30 }}>
    <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <FaJs /> JavaScript (Axios)
    </h4>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ ...codeBox, width: "100%", maxWidth: 700 }}>
{`import axios from "axios";

axios.post("https://api.insureme.com/api/policy", {
  type: "life",
  description: "Life insurance policy for family protection"
}, {
  headers: {
    "x-api-key": "YOUR_API_KEY"
  }
});`}
      </div>
    </div>
  </div>

  {/* PYTHON */}
  <div style={{ marginTop: 30 }}>
    <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <FaPython /> Python (Requests)
    </h4>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ ...codeBox, width: "100%", maxWidth: 700 }}>
{`import requests

res = requests.post(
  "https://api.insureme.com/api/policy",
  headers={"x-api-key": "YOUR_API_KEY"},
  json={
    "type": "travel",
    "description": "Travel insurance for Europe trip"
  }
)

print(res.json())`}
      </div>
    </div>
  </div>

  {/* PHP */}
  <div style={{ marginTop: 30 }}>
    <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <FaPhp /> PHP (cURL)
    </h4>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ ...codeBox, width: "100%", maxWidth: 700 }}>
{`$ch = curl_init("https://api.insureme.com/api/policy");

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
  "type" => "home",
  "description" => "Home insurance protection"
]));

curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "x-api-key: YOUR_API_KEY"
]);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

echo curl_exec($ch);`}
      </div>
    </div>
  </div>

  {/* JAVA */}
  <div style={{ marginTop: 30 }}>
    <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <FaJava /> Java
    </h4>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ ...codeBox, width: "100%", maxWidth: 700 }}>
{`String json = "{\"type\":\"business\",\"description\":\"Business insurance coverage\"}";`}
      </div>
    </div>
  </div>

  {/* C# */}
  <div style={{ marginTop: 30 }}>
    <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <FaTerminal /> C#
    </h4>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ ...codeBox, width: "100%", maxWidth: 700 }}>
{`var json = "{\"type\":\"auto\",\"description\":\"Car insurance API request\"}";`}
      </div>
    </div>
  </div>

  {/* GO */}
  <div style={{ marginTop: 30 }}>
    <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <FaTerminal /> Go (Golang)
    </h4>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ ...codeBox, width: "100%", maxWidth: 700 }}>
{`jsonData := []byte(\`{
  "type": "life",
  "description": "Life insurance request"
}\`)`}
      </div>
    </div>
  </div>

  {/* CURL TERMINAL */}
  <div style={{ marginTop: 30 }}>
    <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <VscTerminal /> cURL (Terminal)
    </h4>

    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ ...codeBox, width: "100%", maxWidth: 700 }}>
{`curl -X POST https://api.insureme.com/api/policy \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "type": "auto",
    "description": "Car insurance request"
  }'`}
      </div>
    </div>
  </div>
</div>

      <div style={{ ...section, textAlign: "center" }}>
        <h2>Start Building in Minutes</h2>

        <button
          style={btnPrimary}
          onClick={() => navg("/register")}
        >
          Get Started <FiArrowRight />
        </button>
      </div>

      <div style={{
        padding: 20,
        borderTop: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13,
        color: "#64748b"
      }}>
        <div>© 2026 InsureMe</div>
        <div style={{ display: "flex", gap: 15 }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>

    </div>
  );
}
