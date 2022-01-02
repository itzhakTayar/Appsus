const { NavLink } = ReactRouterDOM;

export class AppHeader extends React.Component {
  state = {
    isOpen: false,
  };

  // toggleClass = () => {
  //   var { isOpen } = this.state;
  //   isOpen = !isOpen;
  //   this.setState({ isOpen });
  // };

  render() {
    var statusClass = "closed";
    if (this.state.isOpen) statusClass = "open";
    return (
      <header className="app-header">
        <div className="page-header-content main-layout flex">
          <h1>Appsus</h1>
          <nav className={`main-nav`}>
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
}
