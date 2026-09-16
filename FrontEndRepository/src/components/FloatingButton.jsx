import { useNavigate } from "react-router-dom";

function FloatingButton() {
    const navigate = useNavigate();

    return (
        <button
            className="floating-button"
            onClick={() => navigate("/stations/add")}
            title="Add Station"
        >
            +
        </button>
    );
}

export default FloatingButton;