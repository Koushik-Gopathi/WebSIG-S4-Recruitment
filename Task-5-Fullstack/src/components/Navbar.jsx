import { Link, useNavigate } from "react-router-dom";
import { logout } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="nav">
      <Link to="/" className="brand">Task Manager</Link>

      <div className="navRight">
        {user?.email && <span className="muted">{user.email}</span>}
        <button className="btn btnGhost" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
