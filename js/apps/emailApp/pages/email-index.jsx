import { EmailHeader } from "../cmps/EmailHeader.jsx";
import { EmailList } from "../cmps/EmailList.jsx";
import { emailService } from "../services/email.service.js";

export class EmailIndex extends React.Component {
  state = {
    emails: [],
    serach: "",
  };

  componentDidMount() {
    this.loadEmails();
  }

  loadEmails = () => {
    var emails = emailService.getEmails();
    this.setState({ emails });
  };

  onSetSearch = (search) => {
    this.setState({ search });
  };

  render() {
    return (
      <section>
        <EmailHeader onSearch={this.onSetSearch} />
        <EmailList emails={this.state.emails} />
      </section>
    );
  }
}
