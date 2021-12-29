import { utilsService } from "../../../services/util.service.js";

export function EmailList({ emails }) {
  return (
    <section className="emails-list">
      {emails.map((email) => {
        var sentAtTime = utilsService.formatEmailTime(email.sentAt);
        return (
          <div key={email.id} className="email-item">
            <h1>{email.fromName}</h1>
            <div className="email-content">
              <h1>{email.subject}</h1>
              <p className="email-body">-{email.body}</p>
            </div>
            <p>{sentAtTime}</p>
          </div>
        );
      })}
    </section>
  );
}
