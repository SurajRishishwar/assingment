import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Auth/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
