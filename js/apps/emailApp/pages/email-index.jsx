import { emailService } from "../services/email.service.js";
import { EmailHeader } from "../cmps/EmailHeader.jsx";
import { EmailFilters } from "../cmps/EmailFilters.jsx";
import { EmailList } from "../cmps/EmailList.jsx";
import { EmailAdd } from "../cmps/EmailAdd.jsx";

export class EmailIndex extends React.Component {
  state = {
    emails: [],
    sortBy: {},
    isModalOpen: false,
    filterBy: {
      sent: false,
    },
  };

  componentDidMount() {
    this.loadEmails();
  }

  loadEmails = () => {
    var emails = emailService.query(this.state.filterBy, this.state.sortBy);
    this.setState({ emails });
  };

  onSetSearch = (search) => {
    var { filterBy } = this.state;
    filterBy.search = search;
    this.setState({ filterBy }, this.loadEmails);
  };

  toggleCreateEmail = () => {
    var isModalOpen = !this.state.isModalOpen;
    this.setState({ isModalOpen });
  };

  onSetFilter = (filter, val) => {
    var filterBy = {};
    filterBy.sent = false;
    if(this.state.filterBy.search) filterBy.search =this.state.filterBy.search;
    filterBy[filter] = val;
    this.setState({ filterBy }, this.loadEmails);
  };

  render() {
    return (
      <section className="email-app">
        {this.state.isModalOpen && <div className="screen open"></div>}
        <EmailHeader onSearch={this.onSetSearch} />
        <div className="email-app-main flex">
          <EmailList emails={this.state.emails} />
          <EmailFilters
            onAddEmail={this.toggleCreateEmail}
            setFilter={this.onSetFilter}
          />
        </div>
        {this.state.isModalOpen && (
          <EmailAdd closeModal={this.toggleCreateEmail} />
        )}
      </section>
    );
  }
}
