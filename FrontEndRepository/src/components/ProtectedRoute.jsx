import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const authenticated =
        sessionStorage.getItem("authenticated") === "true";

    if (!authenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;