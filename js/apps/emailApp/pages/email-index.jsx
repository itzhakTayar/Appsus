import { emailService } from "../services/email.service.js";
import { EmailHeader } from "../cmps/EmailHeader.jsx";
import { EmailFilters } from "../cmps/EmailFilters.jsx";
import { EmailList } from "../cmps/EmailList.jsx";
import { EmailAdd } from "../cmps/EmailAdd.jsx";
import { eventBusService } from "../../../services/event-bus.service.js";

export class EmailIndex extends React.Component {
  state = {
    emails: [],
    sortBy: null,
    isModalOpen: false,
    filterBy: {
      sent: false,
    },
  };

  componentDidMount() {
    this.setFilterByPath(this.props.location.pathname);
    this.loadEmails();
  }

  loadEmails = () => {
    emailService
      .query(this.state.filterBy, this.state.sortBy)
      .then((emails) => {
        this.setState({ emails });
      });
  };

  onSetSearch = (search) => {
    var { filterBy } = this.state;
    filterBy.search = search;
    this.setState({ filterBy }, this.loadEmails);
  };

  onSetSort = (val) => {
    var sortBy = val;
    this.setState({ sortBy }, this.loadEmails);
  };

  onSetRead = (val) => {
    var { filterBy } = this.state;
    filterBy.isRead = val != "All" ? val : null;
    this.setState({ filterBy }, this.loadEmails);
  };

  toggleCreateEmail = (draft = null) => {
    var isModalOpen = !this.state.isModalOpen;
    var str = isModalOpen ? "/create" : "";
    if (draft) {
      str += `?title=${draft.subject}&body=${draft.body}&to=${draft.to}&id=${draft.id}`;
    }
    this.props.history.push(`/email${str}`);
  };

  toggleReadState = (email, isOnlyToOpen = false) => {
    emailService.toggleIsRead(email, isOnlyToOpen).then(this.loadEmails());
  };

  sendDraft = (draft) => {
    emailService.addEmail(draft).then(() => {
      eventBusService.emit("user-msg", {
        txt: "Email-Sent!",
        type: "success",
      });
      this.loadEmails();
    });
  };

  onSetFilter = (filter, val) => {
    var filterBy = {};
    filterBy.sent = false;
    if (this.state.filterBy.search)
      filterBy.search = this.state.filterBy.search;
    if (this.state.filterBy.isRead)
      filterBy.isRead = this.state.filterBy.isRead;
    filterBy[filter] = val;
    this.setState({ filterBy }, this.loadEmails);
  };

  sendToTrash = (email) => {
    emailService.setEmailAsTrash(email).then(() => {
      eventBusService.emit("user-msg", {
        txt: "Sent To Trash!",
        type: "success",
      });
      this.loadEmails();
    });
  };

  onDeleteEmail = (email) => {
    emailService.deleteEmail(email).then(() => {
      eventBusService.emit("user-msg", {
        txt: "Email-Deleted!",
        type: "warning",
      });
      this.loadEmails();
    });
  };

  componentDidUpdate(prevProps, prevState) {
    var filterUrl = this.props.location.pathname;
    if (prevProps.location.pathname != filterUrl) {
      if (filterUrl.includes("create")) {
        this.setState({ isModalOpen: true });
        return;
      } else if (prevProps.location.pathname.includes("create")) {
        this.setState({ isModalOpen: false });
        return;
      }
      this.setFilterByPath(filterUrl);
    }
    if (filterUrl.includes("create")) {
      var { isModalOpen } = this.state;
      if (!isModalOpen) this.setState({ isModalOpen: true });
    }
  }

  getAllInboxEmails = () => {
    return emailService.getUnreadInboxCount();
  };

  setFilterByPath = (path) => {
    var filtersNames = ["inbox", "sent", "trash", "spam", "star", "draft"];
    var filterBy = "";
    var val = true;
    filtersNames.forEach((fName) => {
      if (path.includes(fName)) {
        if (fName === "inbox") {
          filterBy = "sent";
          val = false;
          return;
        }
        filterBy = fName;
        return;
      }
    });
    this.onSetFilter(filterBy, val);
  };

  onToggleStar = (email) => {
    emailService.toggleStarState(email).then(() => {
      this.loadEmails();
    });
  };

  render() {
    var unReadEmails = this.getAllInboxEmails();
    var searchUrl = this.props.location.search;
    return (
      <section className="email-app">
        {this.state.isModalOpen && <div className="screen open"></div>}
        <EmailHeader
          onSearch={this.onSetSearch}
          onSetRead={this.onSetRead}
          onSetSort={this.onSetSort}
        />
        <div className="email-app-main flex">
          <EmailFilters
            onAddEmail={this.toggleCreateEmail}
            setFilter={this.onSetFilter}
            unReadEmails={unReadEmails}
            isFullDispay={false}
          />
          <EmailList
            emails={this.state.emails}
            onChangeReadState={this.toggleReadState}
            onSendToTrash={this.sendToTrash}
            deleteEmail={this.onDeleteEmail}
            toggleStar={this.onToggleStar}
            openCreateModal={this.toggleCreateEmail}
            sendDraft={this.sendDraft}
          />
        </div>
        {this.state.isModalOpen && (
          <EmailAdd
            closeModal={this.toggleCreateEmail}
            renderEmails={this.loadEmails}
            searchUrl={searchUrl}
          />
        )}
      </section>
    );
  }
}
