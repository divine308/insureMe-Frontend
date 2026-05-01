import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Overview from "./pages/Overview";
import Policies from "./pages/Policy";
import CreatePolicy from "./pages/CreatePolicy";
import UsageLogs from "./pages/UsageLogs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Overview />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/create" element={<CreatePolicy />} />
        <Route path="/logs" element={<UsageLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

