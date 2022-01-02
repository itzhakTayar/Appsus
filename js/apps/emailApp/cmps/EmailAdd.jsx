import { utilsService } from "../../../services/util.service.js";
import { emailService } from "../services/email.service.js";
import { eventBusService } from "../../../services/event-bus.service.js";
export class EmailAdd extends React.Component {
  state = {
    email: {
      toInput: "",
      titleInput: "",
      msgInput: "",
      id: utilsService.makeId(),
    },
  };
  gSaveInterval = null;

  componentDidMount() {
    var { searchUrl } = this.props;
    if (searchUrl) {
      const searchParams = new URLSearchParams(searchUrl);
      var email = {};
      email.titleInput = searchParams.get("title");
      email.toInput = searchParams.get("to");
      if (!email.toInput) email.toInput = "";
      email.msgInput = searchParams.get("body");
      email.id = searchParams.get("id");
      if (!email.id) email.id = utilsService.makeId();
      this.setState({ email });
    }
  }

  handleChange = ({ target }) => {
    var field = target.name;
    var val = target.value;
    if (!this.gSaveInterval)
      this.gSaveInterval = setInterval(() => {
        this.saveDraft();
      }, 5000);
    this.setState((prevState) => ({
      email: { ...prevState.email, [field]: val },
    }));
  };

  saveDraft = () => {
    var draft = this.state.email;
    emailService.addEmail(draft, true).then(() => {
      this.props.renderEmails();
    });
  };

  onSendEmail = (event) => {
    event.preventDefault();
    var { email } = this.state;
    if (email.toInput === "" || !email.toInput) {
      clearInterval(this.gSaveInterval);
      eventBusService.emit("user-msg", {
        txt: "Please Insert Email Reciver!",
        type: "warning",
      });
      return;
    }
    emailService.addEmail(email).then(() => {
      clearInterval(this.gSaveInterval);
      eventBusService.emit("user-msg", {
        txt: "Email-Sent!",
        type: "success",
      });
      this.props.renderEmails();
      this.props.closeModal();
    });
  };

  onDeleteDraft = () => {
    clearInterval(this.gSaveInterval);
    emailService.deleteEmail(this.state.email).then(() => {
      eventBusService.emit("user-msg", {
        txt: "Draft-Deleted!",
        type: "warning",
      });
      this.props.renderEmails();
      this.props.closeModal();
    });
  };

  render() {
    return (
      <section className="email-add-modal">
        <header className="email-add-header">
          <h1>New Email</h1>
          <button
            className="close-modal-btn"
            onClick={() => {
              this.props.closeModal();
              clearInterval(this.gSaveInterval);
            }}
          >
            ❌
          </button>
        </header>
        <form
          action=""
          onSubmit={this.onSendEmail}
          className="email-add-content"
        >
          <div className="Inputs-div-modal">
            <label htmlFor="toInput">
              To:
              <input
                type="text"
                className="toInput"
                name="toInput"
                value={this.state.email.toInput}
                onChange={this.handleChange}
              />
            </label>
            <hr />
            <label htmlFor="titleInput">
              Title:
              <input
                type="text"
                className="titleInput"
                name="titleInput"
                value={this.state.email.titleInput}
                onChange={this.handleChange}
              />
            </label>
            <hr />
            <label htmlFor="msgInput">
              Messege:
              <input
                type="text"
                className="msgInput"
                name="msgInput"
                value={this.state.email.msgInput}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="send-btn">
              Send
            </button>
            <button
              type="button"
              onClick={this.onDeleteDraft}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </form>
      </section>
    );
  }
}
