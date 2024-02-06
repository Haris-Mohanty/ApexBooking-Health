import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import PageNotFound from "./Pages/NotFoundPage";
import Homepage from "./Pages/Homepage";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Spinner />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
