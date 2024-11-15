import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { SignUpPage } from "@/presentation/pages"

type Props = {
  makeLogin: React.FC
}

export const Router: React.FC<Props> = ({ 
  makeLogin: LoginPage
}) => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  </BrowserRouter>
)