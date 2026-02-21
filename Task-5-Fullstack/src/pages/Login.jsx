import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card authCard">
        <h2>Welcome back</h2>
        <p className="muted">Login to continue.</p>

        {err && <div className="alert">{err}</div>}

        <form onSubmit={onSubmit} className="stack">
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <button className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="muted mt">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}
