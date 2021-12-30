const { NavLink } = ReactRouterDOM;

export function EmailFilters(props) {
  var {unReadEmails} =props
  return (
    <section className="email-filters">
      <ul className="clean-list">
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
         inbox{unReadEmails>0&&<p className="unread-diplay">{"("+unReadEmails+")"}</p>}
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
            props.setFilter("trash", true);
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
