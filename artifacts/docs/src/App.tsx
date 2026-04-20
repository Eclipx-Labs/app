import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { LanguageProvider } from "@/lib/LanguageContext";
import DocsLayout from "@/components/DocsLayout";
import Overview from "@/pages/introduction/Overview";
import WhyQryptum from "@/pages/introduction/WhyQryptum";
import HowItWorks from "@/pages/introduction/HowItWorks";
import SecurityModel from "@/pages/security/SecurityModel";
import NonCustodial from "@/pages/security/NonCustodial";
import TokenProtection from "@/pages/security/TokenProtection";
import PostQuantum from "@/pages/security/PostQuantum";
import ContractVerification from "@/pages/security/ContractVerification";
import DeployedAddresses from "@/pages/contracts/DeployedAddresses";
import ShieldFactory from "@/pages/contracts/ShieldFactory";
import PersonalVault from "@/pages/contracts/PersonalVault";
import QToken from "@/pages/contracts/QToken";
import QryptSafeV1History from "@/pages/contracts/QryptSafeV1History";
import QryptSafeV2History from "@/pages/contracts/QryptSafeV2History";
import QryptSafeV3History from "@/pages/contracts/QryptSafeV3History";
import QryptSafeV4History from "@/pages/contracts/QryptSafeV4History";
import QryptSafeV5History from "@/pages/contracts/QryptSafeV5History";
import QryptSafeV6History from "@/pages/contracts/QryptSafeV6History";
import ApiReference from "@/pages/developer/ApiReference";
import InitFinalizeFlow from "@/pages/developer/InitFinalizeFlow";
import JoinTestnet from "@/pages/developer/JoinTestnet";
import TestnetQuickStart from "@/pages/developer/testnet/QuickStartTestnet";
import IntegrationTestnet from "@/pages/developer/testnet/IntegrationTestnet";
import AbiTestnet from "@/pages/developer/testnet/AbiTestnet";
import MainnetQuickStart from "@/pages/developer/mainnet/QuickStartMainnet";
import IntegrationMainnet from "@/pages/developer/mainnet/IntegrationMainnet";
import AbiMainnet from "@/pages/developer/mainnet/AbiMainnet";
import TestnetGuide from "@/pages/guide/TestnetGuide";
import MainnetGuide from "@/pages/guide/MainnetGuide";
import Faq from "@/pages/faq/Faq";
import Phase1 from "@/pages/roadmap/Phase1";
import Phase2 from "@/pages/roadmap/Phase2";
import Phase3 from "@/pages/roadmap/Phase3";
import Phase4 from "@/pages/roadmap/Phase4";
import Phase5 from "@/pages/roadmap/Phase5";
import Tokenomics from "@/pages/tokenomics/Tokenomics";

function Router() {
  return (
    <DocsLayout>
      <Switch>
        <Route path="/">
          <Redirect to="/introduction/overview" />
        </Route>
        <Route path="/introduction/overview" component={Overview} />
        <Route path="/introduction/why-qryptum" component={WhyQryptum} />
        <Route path="/introduction/how-it-works" component={HowItWorks} />
        <Route path="/security/security-model" component={SecurityModel} />
        <Route path="/security/non-custodial" component={NonCustodial} />
        <Route path="/security/token-protection" component={TokenProtection} />
        <Route path="/security/post-quantum" component={PostQuantum} />
        <Route path="/security/contract-verification" component={ContractVerification} />
        <Route path="/contracts/deployed-addresses" component={ShieldFactory} />
        <Route path="/contracts/shield-factory" component={ShieldFactory} />
        <Route path="/contracts/personal-vault" component={PersonalVault} />
        <Route path="/contracts/qtoken" component={QToken} />
        <Route path="/contracts/qrypt-safe-v1" component={QryptSafeV1History} />
        <Route path="/contracts/qrypt-safe-v2" component={QryptSafeV2History} />
        <Route path="/contracts/qrypt-safe-v3" component={QryptSafeV3History} />
        <Route path="/contracts/qrypt-safe-v4" component={QryptSafeV4History} />
        <Route path="/contracts/qrypt-safe-v6" component={QryptSafeV6History} />
        <Route path="/contracts/qrypt-safe-v5" component={QryptSafeV5History} />

        {/* Testnet integration docs */}
        <Route path="/developer/testnet/quick-start" component={TestnetQuickStart} />
        <Route path="/developer/testnet/integration" component={IntegrationTestnet} />
        <Route path="/developer/testnet/abi" component={AbiTestnet} />

        {/* Mainnet integration docs */}
        <Route path="/developer/mainnet/quick-start" component={MainnetQuickStart} />
        <Route path="/developer/mainnet/integration" component={IntegrationMainnet} />
        <Route path="/developer/mainnet/abi" component={AbiMainnet} />

        {/* Reference */}
        <Route path="/developer/init-finalize-flow" component={InitFinalizeFlow} />
        <Route path="/developer/api-reference" component={ApiReference} />
        <Route path="/developer/join-testnet" component={JoinTestnet} />

        {/* Legacy redirects - old flat URLs */}
        <Route path="/developer/quick-start">
          <Redirect to="/developer/testnet/quick-start" />
        </Route>
        <Route path="/developer/integration-guide">
          <Redirect to="/developer/testnet/integration" />
        </Route>
        <Route path="/developer/abi-reference">
          <Redirect to="/developer/testnet/abi" />
        </Route>

        <Route path="/guide/testnet" component={TestnetGuide} />
        <Route path="/guide/mainnet" component={MainnetGuide} />
        <Route path="/roadmap/phase-1" component={Phase1} />
        <Route path="/roadmap/phase-2" component={Phase2} />
        <Route path="/roadmap/phase-3" component={Phase3} />
        <Route path="/roadmap/phase-4" component={Phase4} />
        <Route path="/roadmap/phase-5" component={Phase5} />
        <Route path="/tokenomics" component={Tokenomics} />
        <Route path="/faq" component={Faq} />
        <Route>
          <Redirect to="/introduction/overview" />
        </Route>
      </Switch>
    </DocsLayout>
  );
}

function App() {
  return (
    <LanguageProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} hook={useHashLocation}>
        <Router />
      </WouterRouter>
    </LanguageProvider>
  );
}

export default App;
