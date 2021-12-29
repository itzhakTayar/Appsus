import { Home } from './js/pages/Home.jsx';
import { AppHeader } from './js/apps/keep/cmps/notes-header.jsx';
import { NoteApp } from './js/apps/keep/pages/note-index.jsx';
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <Switch>
          <Route component={NoteApp} path="/notes" />
          <Route component={Home} path="/" />
        </Switch>
      </section>
    </Router>
  );
}
