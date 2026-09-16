import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Lpage from "./pages/Lpage";
import StationList from "./pages/StationList";
import AddStation from "./pages/adderstation";
import StationDetails from "./pages/stationDetails";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Default Login Screen */}
                <Route
                    path="/"
                    element={<Lpage />}
                />

                {/* Station List */}
                <Route
                    path="/stations"
                    element={
                        <ProtectedRoute>
                            <StationList />
                        </ProtectedRoute>
                    }
                />

                {/* Add Station */}
                <Route
                    path="/stations/add"
                    element={
                        <ProtectedRoute>
                            <AddStation />
                        </ProtectedRoute>
                    }
                />

                {/* Station Details */}
                <Route
                    path="/stations/:id"
                    element={
                        <ProtectedRoute>
                            <StationDetails />
                        </ProtectedRoute>
                    }
                />

                {/* Invalid URL will return to Login */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;