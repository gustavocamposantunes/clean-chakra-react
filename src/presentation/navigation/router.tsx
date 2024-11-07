import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

type Props = {
  makeLogin: React.FC
}

export const Router: React.FC<Props> = ({ 
  makeLogin: LoginPage
}) => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
)