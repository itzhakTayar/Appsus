import { EmailPreview } from "../cmps/EmailPreview.jsx";
import { emailService } from "../services/email.service.js";
import { EmailFilters } from "../cmps/EmailFilters.jsx";

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

  navigateToEmail = (field) => {
    this.props.history.push(`/email/${field}`);
  };
  render() {
    var { email } = this.state;
    var unReadEmails = emailService.getUnreadInboxCount();
    if (!email) return <React.Fragment></React.Fragment>;
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
              <button>1</button>
              <button>2</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
