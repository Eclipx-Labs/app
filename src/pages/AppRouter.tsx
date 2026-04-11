import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { LanguageProvider } from "@/lib/LanguageContext";
import PageLoader from "@/components/PageLoader";

const DashboardPage = lazy(() => import("./DashboardPage"));
const CreateQryptSafePage = lazy(() => import("./CreateQryptSafePage"));
const CreateVaultPage = lazy(() => import("./CreateVaultPage"));
const NotFound = lazy(() => import("./not-found"));

export default function AppRouter() {
  return (
    <LanguageProvider>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={DashboardPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/create-vault" component={CreateVaultPage} />
          <Route path="/create" component={CreateQryptSafePage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </LanguageProvider>
  );
}
