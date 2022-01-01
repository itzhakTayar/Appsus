import { NoteApp } from './js/apps/keep/pages/note-index.jsx';
import { EmailIndex } from './js/apps/emailApp/pages/Email-index.jsx';
import { AppHeader } from './js/cmps/AppHeader.jsx';
import { Home } from './js/pages/app-home.jsx';
import { EmailDetails } from './js/apps/emailApp/pages/email-details.jsx';
import { UserMsg } from './js/cmps/user-msg.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route component={EmailDetails} path="/email/:emailAt/:emailId" />
            <Route component={EmailIndex} path="/email" />
            <Route component={NoteApp} path="/notes" />
            <Route component={Home} path="/" />
          </Switch>
        </main>
      </section>
      <UserMsg />
    </Router>
  );
}
