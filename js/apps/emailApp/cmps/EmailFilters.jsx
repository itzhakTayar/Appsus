const { NavLink } = ReactRouterDOM;

export function EmailFilters(props) {
  return (
    <section className="email-filters">
      <ul className="clean-list">
        {/* <li
          className="email-filter-item active"
          onClick={() => {
            props.onAddEmail();
          }}
        >
          Create
        </li> */}
        <NavLink
          to="/email/create"
          activeClassName="my-active-filter"
          className="email-filter-item active clean-link"
          onClick={() => {
            props.onAddEmail();
          }}
        >
          Create
        </NavLink>
        <NavLink
          to="/email/inbox"
          className="email-filter-item clean-link"
          activeClassName="my-active-filter"
          onClick={() => {
            props.setFilter("sent", false);
          }}
        >
          inbox
        </NavLink>
        <NavLink
          to="/email/sent"
          className="email-filter-item clean-link"
          activeClassName="my-active-filter"
          onClick={() => {
            props.setFilter("sent", true);
          }}
        >
          sent
        </NavLink>{" "}
        <NavLink
          to="/email/trash"
          className="email-filter-item clean-link"
          activeClassName="my-active-filter"
          onClick={() => {
            props.setFilter("recycleBin", true);
          }}
        >
          trash
        </NavLink>
        <NavLink
          to="/email/spam"
          className="email-filter-item clean-link"
          activeClassName="my-active-filter"
          onClick={() => {
            props.setFilter("spam", true);
          }}
        >
          spam
        </NavLink>{" "}
      </ul>
    </section>
  );
}
