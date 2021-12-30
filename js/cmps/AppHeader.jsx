const { NavLink } = ReactRouterDOM;

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="page-header-content flex">
        <h1>Appsus</h1>
        <nav className="main-nav">
          <NavLink
            activeClassName="my-active"
            className="header-link-item"
            exact
            to="/"
          >
            Home{" "}
          </NavLink>
          <NavLink
            activeClassName="my-active"
            className="header-link-item"
            to="/notes"
          >
            Notes
          </NavLink>
          <NavLink
            activeClassName="my-active"
            className="header-link-item"
            to="/email/inbox"
          >
            Email
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
