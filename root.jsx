import { EmailIndex } from "./js/apps/emailApp/pages/email-index.jsx";
import { AppHeader } from "./js/cmps/AppHeader.jsx";
import { Home } from "./js/pages/app-home.jsx";

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main className="app-main">
          <Switch>
            <Route component={EmailIndex} path="/email" />
            <Route component={Home} path="/" />
          </Switch>
        </main>
      </section>
    </Router>
  );
}
