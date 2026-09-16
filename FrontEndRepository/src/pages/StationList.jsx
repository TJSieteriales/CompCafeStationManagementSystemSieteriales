import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FloatingButton from "../components/FloatingButton";
import { getStations } from "../services/stationService";

function StationList() {
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        loadStations();
    }, []);

    async function loadStations() {
        try {
            setLoading(true);
            setError("");

            const data = await getStations();
            setStations(data);
        } catch {
            setError(
                "Unable to load stations. Make sure the Laravel server is running."
            );
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        sessionStorage.removeItem("authenticated");
        navigate("/");
    }

    return (
        <div className="main-page">
            <header className="navbar">
                <div>
                    <h2>Computer Cafe</h2>
                    <span>Station Management</span>
                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </header>

            <main className="content">
                <div className="page-heading">
                    <div>
                        <h1>Station List</h1>
                        <p>
                            View and manage computer cafe stations.
                        </p>
                    </div>

                    <span className="station-count">
                        {stations.length} Station(s)
                    </span>
                </div>

                {loading && (
                    <div className="status-message">
                        Loading stations...
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}

                        <button
                            className="retry-button"
                            onClick={loadStations}
                        >
                            Retry
                        </button>
                    </div>
                )}

                {!loading &&
                    !error &&
                    stations.length === 0 && (
                        <div className="empty-state">
                            <h3>No Stations Available</h3>

                            <p>
                                Click the + button to add your first
                                computer station.
                            </p>
                        </div>
                    )}

                {!loading && !error && (
                    <div className="station-grid">
                        {stations.map((station) => (
                            <div
                                className="station-card"
                                key={station.id}
                                onClick={() =>
                                    navigate(
                                        `/stations/${station.id}`
                                    )
                                }
                            >
                                <div className="station-icon">
                                    PC
                                </div>

                                <div>
                                    <h3>
                                        {station.station_name}
                                    </h3>

                                    <span className="tier-badge">
                                        {station.tier}
                                    </span>

                                    <p className="rate">
                                        ₱
                                        {Number(
                                            station.hourly_rate
                                        ).toFixed(2)}
                                        /hour
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <FloatingButton />
        </div>
    );
}


export default StationList;