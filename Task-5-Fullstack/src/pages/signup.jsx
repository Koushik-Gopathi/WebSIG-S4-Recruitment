import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../firebase/auth";

export default function Signup() {
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
      await signup(email, password);
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
        <h2>Create account</h2>
        <p className="muted">Sign up to manage your tasks.</p>

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
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            minLength={6}
            required
          />
          <button className="btn" disabled={loading}>
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>

        <p className="muted mt">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
