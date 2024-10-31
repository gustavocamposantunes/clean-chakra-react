import { BrowserRouter, Routes, Route } from "react-router-dom"

import { LoginPage } from "@/presentation/pages"

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
)