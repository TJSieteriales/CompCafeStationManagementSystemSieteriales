import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getStation } from "../services/stationService";

function StationDetails() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [station, setStation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadStation = async () => {
            try {
                setLoading(true);

                const data = await getStation(id);

                setStation(data);
            } catch (error) {
                setError(
                    "Unable to load station details."
                );
            } finally {
                setLoading(false);
            }
        };

        loadStation();
    }, [id]);

    return (
        <div className="main-page">
            <header className="navbar">
                <div>
                    <h2>Computer Cafe</h2>
                    <span>Station Management</span>
                </div>
            </header>

            <main className="content">
                {loading && (
                    <div className="status-message">
                        Loading station details...
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {!loading && !error && station && (
                    <div className="details-container">
                        <h1>Station Details</h1>

                        <p className="subtitle">
                            Complete information for this
                            workstation.
                        </p>

                        <div className="details-card">
                            <div className="large-station-icon">
                                PC
                            </div>

                            <h2>
                                {station.station_name}
                            </h2>

                            <div className="detail-row">
                                <span>Station ID</span>
                                <strong>
                                    #{station.id}
                                </strong>
                            </div>

                            <div className="detail-row">
                                <span>
                                    Tier / Category
                                </span>

                                <strong>
                                    {station.tier}
                                </strong>
                            </div>

                            <div className="detail-row">
                                <span>Hourly Rate</span>

                                <strong>
                                    ₱
                                    {Number(
                                        station.hourly_rate
                                    ).toFixed(2)}
                                </strong>
                            </div>

                            <button
                                className="primary-button"
                                onClick={() =>
                                    navigate("/stations")
                                }
                            >
                                Back to Station List
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default StationDetails;