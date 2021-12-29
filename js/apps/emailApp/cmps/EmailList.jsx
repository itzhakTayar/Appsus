export function EmailList({ emails }) {
  return (
    <section className="emails-list">
      {emails.map((email) => {
        return (
          <div key={email.id} className="email-item">
            <h1>{email.shownName}</h1>
            <div className="email-content">
              <h1>{email.subject}</h1>
              <p className="email-body">-{email.body}</p>
            </div>
            <p>12:30AM</p>
          </div>
        );
      })}
    </section>
  );
}
