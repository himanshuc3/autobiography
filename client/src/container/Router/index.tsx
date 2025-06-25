import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "@/pages/Index";
import PostPage from "@/pages/PostPage";
import NotFound from "@/pages/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
