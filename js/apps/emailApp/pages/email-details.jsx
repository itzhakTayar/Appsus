import { EmailPreview } from "../cmps/EmailPreview.jsx";
import { emailService } from "../services/email.service.js";
import { EmailFilters } from "../cmps/EmailFilters.jsx";
import { eventBusService } from "../../../services/event-bus.service.js";

export class EmailDetails extends React.Component {
  state = {
    email: null,
  };

  componentDidMount() {
    this.loadEmail();
  }

  loadEmail = () => {
    const { emailId } = this.props.match.params;
    var email = emailService.getEmailById(emailId);
    this.setState({ email });
  };
  onToggleStar = (email) => {
    emailService.toggleStarState(email).then(() => {
      this.loadEmail();
    });
  };
  navigateToEmail = (field) => {
    this.props.history.push(`/email/${field}`);
  };

  sendToTrash = (email) => {
    emailService.setEmailAsTrash(email).then(() => {
      eventBusService.emit("user-msg", {
        txt: "Sent To Trash!",
        type: "success",
      });
      this.loadEmail();
    });
  };

  onDeleteEmail = (email) => {
    emailService.deleteEmail(email).then(() => {
      eventBusService.emit("user-msg", {
        txt: "Email-Deleted!",
        type: "warning",
      });
      this.props.history.push("/email/inbox");
    });
  };

  render() {
    var { email } = this.state;
    var unReadEmails = emailService.getUnreadInboxCount();
    if (!email) return <React.Fragment></React.Fragment>;
    var starClassName = email.isStar ? "on" : "off";
    var trashClass = email.deletedAt ? "fas fa-trash-alt" : "fas fa-trash";
    return (
      <section className="email-details">
        <div className="email-details-header"></div>
        <div className="email-details-divs flex">
          <EmailFilters
            navigateToEmail={this.navigateToEmail}
            unReadEmails={unReadEmails}
            isFullDispay={true}
          />
          <div className="email-details-Fullpreview flex">
            <EmailPreview email={email} isFullDispay={true} />
            <div className="email-details-btns flex">
              <button
                className={starClassName}
                onClick={() => {
                  this.onToggleStar(email);
                }}
              >
                &#9733;
              </button>
              <button
                className={trashClass}
                onClick={() => {
                  if (email.deletedAt) this.onDeleteEmail(email);
                  else {
                    this.sendToTrash(email);
                  }
                }}
              ></button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
