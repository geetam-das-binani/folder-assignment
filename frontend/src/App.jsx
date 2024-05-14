import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/userActions";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./Protected/Protected";
import Dashboard from "./pages/Dashboard";
import SingleFolder from "./pages/SingleFolder";
import SearchPage from "./pages/SearchPage";
import { Toaster } from "react-hot-toast";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser(dispatch);
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute Component={Dashboard} />}
          />
          <Route
            path="/folder/:id"
            element={<ProtectedRoute Component={SingleFolder} />}
          />
          <Route
            path="/search"
            element={<ProtectedRoute Component={SearchPage} />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
};

export default App;
