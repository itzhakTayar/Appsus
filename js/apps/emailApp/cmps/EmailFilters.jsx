const { NavLink } = ReactRouterDOM;

export function EmailFilters(props) {
  var { unReadEmails } = props;
  var { isFullDispay } = props;
  return (
    <section className="email-filters">
      <ul className="clean-list">
        <NavLink
          to="/email/create"
          activeClassName="my-active-filter"
          className="email-filter-item active clean-link"
          onClick={() => {
            if (!isFullDispay) props.onAddEmail();
            else {
            }
          }}
        >
          Create
        </NavLink>
        <NavLink
          to="/email/inbox"
          className="email-filter-item clean-link"
          activeClassName="my-active-filter"
          onClick={() => {
            if (!isFullDispay) props.setFilter("sent", false);
            else {
              props.navigateToEmail("inbox");
            }
          }}
        >
          inbox
          {unReadEmails > 0 && (
            <p className="unread-diplay">{"(" + unReadEmails + ")"}</p>
          )}
        </NavLink>
        <NavLink
          to="/email/sent"
          className="email-filter-item clean-link"
          activeClassName="my-active-filter"
          onClick={() => {
            if (!isFullDispay) props.setFilter("sent", true);
            else {
              props.navigateToEmail("sent");
            }
          }}
        >
          sent
        </NavLink>
        <NavLink
          to="/email/trash"
          className="email-filter-item clean-link"
          activeClassName="my-active-filter"
          onClick={() => {
            if (!isFullDispay) props.setFilter("trash", true);
            else {
              props.navigateToEmail("trash");
            }
          }}
        >
          trash
        </NavLink>
        <NavLink
          to="/email/star"
          className="email-filter-item clean-link"
          activeClassName="my-active-filter"
          onClick={() => {
            if (!isFullDispay) props.setFilter("star", true);
            else {
              props.navigateToEmail("star");
            }
          }}
        >
          ⭐️
        </NavLink>
        <NavLink
          to="/email/draft"
          className="email-filter-item clean-link"
          activeClassName="my-active-filter"
          onClick={() => {
            if (!isFullDispay) props.setFilter("draft", true);
            else {
              props.navigateToEmail("draft");
            }
          }}
        >
          Draft
        </NavLink>
      </ul>
    </section>
  );
}
