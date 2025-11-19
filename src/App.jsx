import { useRoutes, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthContext";
import Navbar from "./components/navBar";
import ReadPosts from "./pages/ReadPost";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Login from "./pages/login";
import { useContext } from "react";
import './App.css';
import BuildDetail from "./BuildDetail";
import HomeFeed from "./components/HomeFeed";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
}

function AppRoutes() {
  const element = useRoutes([
    { path: "/", element: <HomeFeed /> },
    { path: "/login", element: <Login /> },
    { path: "/edit/:id", element: <ProtectedRoute><EditPost /></ProtectedRoute> },
    { path: "/new", element: <ProtectedRoute><CreatePost /></ProtectedRoute> },
    { path: "/build/:id", element: <BuildDetail /> }
  ]);
  return element;
}

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
