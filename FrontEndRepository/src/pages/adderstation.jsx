import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createStation } from "../services/stationService";

function AddStation() {
    const [stationName, setStationName] = useState("");
    const [tier, setTier] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (stationName.trim() === "") {
            newErrors.stationName =
                "Station Name / PC Number is required.";
        }

        if (tier === "") {
            newErrors.tier =
                "Please select a Tier / Category.";
        }

        if (hourlyRate === "") {
            newErrors.hourlyRate =
                "Hourly Rate is required.";
        } else if (Number(hourlyRate) <= 0) {
            newErrors.hourlyRate =
                "Hourly Rate must be greater than zero.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setServerError("");

        if (!validateForm()) {
            return;
        }

        try {
            setSaving(true);

            await createStation({
                station_name: stationName,
                tier: tier,
                hourly_rate: Number(hourlyRate),
            });

            navigate("/stations");
        } catch (error) {
            if (error.errors) {
                setServerError(
                    Object.values(error.errors)
                        .flat()
                        .join(" ")
                );
            } else {
                setServerError(
                    "Unable to save station. Make sure the Laravel server is running."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="main-page">
            <header className="navbar">
                <div>
                    <h2>Computer Cafe</h2>
                    <span>Station Management</span>
                </div>
            </header>

            <main className="content">
                <div className="form-container">
                    <div className="page-heading">
                        <div>
                            <h1>Add Station</h1>

                            <p>
                                Add a new computer rental
                                workstation.
                            </p>
                        </div>
                    </div>

                    {serverError && (
                        <div className="error-message">
                            {serverError}
                        </div>
                    )}

                    <form
                        className="station-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label>
                                Station Name / PC Number
                            </label>

                            <input
                                type="text"
                                placeholder="Example: PC-001"
                                value={stationName}
                                onChange={(e) =>
                                    setStationName(
                                        e.target.value
                                    )
                                }
                            />

                            {errors.stationName && (
                                <span className="field-error">
                                    {errors.stationName}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Tier / Category</label>

                            <select
                                value={tier}
                                onChange={(e) =>
                                    setTier(e.target.value)
                                }
                            >
                                <option value="">
                                    Select Category
                                </option>

                                <option value="Regular">
                                    Regular
                                </option>

                                <option value="VIP">
                                    VIP
                                </option>

                                <option value="Streaming Room">
                                    Streaming Room
                                </option>
                            </select>

                            {errors.tier && (
                                <span className="field-error">
                                    {errors.tier}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Hourly Rate (₱)</label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Example: 50.00"
                                value={hourlyRate}
                                onChange={(e) =>
                                    setHourlyRate(
                                        e.target.value
                                    )
                                }
                            />

                            {errors.hourlyRate && (
                                <span className="field-error">
                                    {errors.hourlyRate}
                                </span>
                            )}
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() =>
                                    navigate("/stations")
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="primary-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Station"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default AddStation;