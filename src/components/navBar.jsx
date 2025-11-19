import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <Link to="/"><button>Builds</button></Link>
      {user ? (
        <>
          <Link to="/new"><button>Submit Build</button></Link>
          <span>Logged in as: {user.email}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login"><button>Login / Sign Up</button></Link>
      )}
    </nav>
  );
}