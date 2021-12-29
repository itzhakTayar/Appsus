import { emailService } from "../services/email.service.js";
import { EmailHeader } from "../cmps/EmailHeader.jsx";
import { EmailFilters } from "../cmps/EmailFilters.jsx";
import { EmailList } from "../cmps/EmailList.jsx";
import { EmailAdd } from "../cmps/EmailAdd.jsx";

export class EmailIndex extends React.Component {
  state = {
    emails: [],
    serach: "",
    isModalOpen: false,
  };

  componentDidMount() {
    this.loadEmails();
  }

  loadEmails = () => {
    var emails = emailService.query();
    this.setState({ emails });
  };

  onSetSearch = (search) => {
    this.setState({ search });
  };

  toggleCreateEmail = () => {
    var isModalOpen = !this.state.isModalOpen;
    this.setState({ isModalOpen });
  };

  render() {
    return (
      <section className="email-app">
        {this.state.isModalOpen && <div className="screen open"></div>}
        <EmailHeader onSearch={this.onSetSearch} />
        <div className="email-app-main flex">
          <EmailList emails={this.state.emails} />
          <EmailFilters onAddEmail={this.toggleCreateEmail} />
        </div>
        {this.state.isModalOpen && <EmailAdd closeModal ={this.toggleCreateEmail} />}
      </section>
    );
  }
}
