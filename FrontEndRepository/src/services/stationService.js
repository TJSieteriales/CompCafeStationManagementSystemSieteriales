import axios from "axios";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000/api";

export async function getStations() {
    const response = await axios.get(
        `${API_URL}/stations`
    );

    return response.data;
}

export async function getStation(id) {
    const response = await axios.get(
        `${API_URL}/stations/${id}`
    );

    return response.data;
}

export async function createStation(station) {
    const response = await axios.post(
        `${API_URL}/stations`,
        station,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
}