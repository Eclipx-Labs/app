import React from "react";
import { createRoot } from "react-dom/client";
import HackContestPage from "./pages/HackContestPage";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HackContestPage />
  </React.StrictMode>
);
