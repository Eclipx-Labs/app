import LandingPage from "@/pages/LandingPage";
import StatusPage from "@/pages/StatusPage";

function getCurrentRoute(): string {
    const path = window.location.pathname;
    if (path.endsWith("/status") || path.includes("/status/")) return "status";
    const hash = window.location.hash;
    if (hash === "#/status") return "status";
    return "home";
}

export default function App() {
    const route = getCurrentRoute();
    if (route === "status") return <StatusPage />;
    return <LandingPage />;
}
