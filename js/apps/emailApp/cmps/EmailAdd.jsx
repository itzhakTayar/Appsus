import { emailService } from "../services/email.service.js";

export class EmailAdd extends React.Component {
  state = {
    email: {
      toInput: "",
      titleInput: "",
      msgInput: "",
    },
  };

  handleChange = ({ target }) => {
    var field = target.name;
    var val = target.value;
    this.setState((prevState) => ({
      email: { ...prevState.email, [field]: val },
    }));
  };

  onSendEmail = (event) => {
    event.preventDefault();
    var { email } = this.state;
    emailService.addEmail(email);
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
