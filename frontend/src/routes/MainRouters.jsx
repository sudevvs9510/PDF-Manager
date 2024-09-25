//@ts-nocheck
import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../components/Login"
import Register from "../components/Register";
import Home from "../components/Home"
import SavedPDFs from "../components/SavedPDFs";

import ProtectedRoute from "../components/ProtectedRoute";
import PDFView from "../components/PDFView";

import NotFound from "../components/NotFound";

const MainRouter = () =>{
  return(
    <Routes>
      <Route path="*" element={<NotFound />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/> } />

      <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
      <Route path="/saved-pdfs/:userId" element={<ProtectedRoute> <SavedPDFs /> </ProtectedRoute>} />
      <Route path="/pdf-view" element={ <ProtectedRoute> <PDFView /> </ProtectedRoute>} />
    </Routes>
  )
}

export default MainRouter

