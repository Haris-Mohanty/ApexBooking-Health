import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import PageNotFound from "./Pages/NotFoundPage";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Homepage from "./Pages/Homepage";
import PublicRoute from "./components/routes/PublicRoute";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Spinner />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
