export function EmailHeader({ onSearch, onSetRead }) {
  return (
    <header className="email-header">
      <div className="header-content">
        <h1>Text</h1>

        <div className="email-head-filters">
          <select
            name="sortBy"
            id="sortSelect"
            onChange={(ev) => {
              onSetRead(ev.target.value);
            }}
          >
            <option value="Date">Date</option>
            <option value="Title">Title</option>
          </select>

          <input
            className="search-input"
            type="text"
            placeholder="Search Email"
            onChange={(ev) => {
              onSearch(ev.target.value);
            }}
          />
          <select
            name="isRead"
            id="isReadSelect"
            onChange={(ev) => {
              onSetRead(ev.target.value);
            }}
          >
            <option value="All">All</option>
            <option value="true">Read</option>
            <option value="false">Unread</option>
          </select>
        </div>

        <h1>Logo</h1>
      </div>
    </header>
  );
}
