import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { Dashboard, Login, Register } from "./Pages";

function App() {
  return (
    <div className="App">
      <ToastContainer
        autoClose={1500}
        closeOnClick
        draggable
        transition={Slide}
        limit={1}
      />
      <div className="main-page-content">
        <Routes>
          <Route path="/" element={<Navigate to={"/dashboard"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
