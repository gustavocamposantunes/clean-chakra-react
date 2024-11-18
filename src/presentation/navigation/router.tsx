import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

type Props = {
  makeLogin: React.FC,
  makeSignUp: React.FC
}

export const Router: React.FC<Props> = ({ 
  makeLogin: LoginPage,
  makeSignUp: SignUpPage
}) => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  </BrowserRouter>
)