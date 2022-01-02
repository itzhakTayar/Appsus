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
          className="email-filter-item  active clean-link"
          onClick={() => {
            if (!isFullDispay) props.onAddEmail();
            else {
            }
          }}
        >
          <button className="fas fa-plus"></button>
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
          <button className="fas fa-inbox"></button>
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
          <button className="far fa-share-square"></button>
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
          <button className="fas fa-trash"></button>
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
          <button className="fab fa-firstdraft"></button>
        </NavLink>
      </ul>
    </section>
  );
}
