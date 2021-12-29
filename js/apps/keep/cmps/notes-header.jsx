const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
  render() {
    return (
      <header className="app-header">
        <div className="header-container">
          <h1 className="logo" onClick={() => this.props.history.push('/')}>
            my notes
          </h1>
          <nav className="app-nav">
            <NavLink activeClassName="my-active" exact to="/">
              Home
            </NavLink>{' '}
            |
            <NavLink activeClassName="my-active" to="/notes">
              notes
            </NavLink>
          </nav>
        </div>
      </header>
    );
  }
}

export const AppHeader = withRouter(_AppHeader);
