import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Lpage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username.trim() === "" || password.trim() === "") {
            setError("Username and password are required.");
            return;
        }

        if (username === "cafe_admin" && password === "pccafe2026") {
            sessionStorage.setItem("authenticated", "true");
            setError("");
            navigate("/stations");
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-icon">PC</div>

                <h1>Computer Cafe</h1>
                <p className="subtitle">Station Management System</p>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button className="primary-button" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Lpage;