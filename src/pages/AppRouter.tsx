import { Switch, Route } from "wouter";
import DashboardPage from "./DashboardPage";
import CreateQryptSafePage from "./CreateQryptSafePage";
import NotFound from "./not-found";

export default function AppRouter() {
    return (
        <Switch>
            <Route path="/" component={DashboardPage} />
            <Route path="/create" component={CreateQryptSafePage} />
            <Route component={NotFound} />
        </Switch>
    );
}
