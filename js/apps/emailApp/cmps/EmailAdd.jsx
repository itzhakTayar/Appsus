import { utilsService } from "../../../services/util.service.js";
import { emailService } from "../services/email.service.js";
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

  componentDidMount() {}

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
    emailService.addEmail(draft,true).then(() => {
      console.log("draft saved");
    });
  };

  onSendEmail = (event) => {
    event.preventDefault();
    var { email } = this.state;
    emailService.addEmail(email).then(() => {
      clearInterval(this.gSaveInterval);
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
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="send-btn">
              Send
            </button>
            <button className="delete-btn">Delete</button>
          </div>
        </form>
      </section>
    );
  }
}
