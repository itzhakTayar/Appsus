import { utilsService } from "../../../services/util.service.js";
import { EmailDetails } from "./EmailDetails.jsx";

export class EmailList extends React.Component {
  state = {
    hover: {},
    click: {},
  };

  toggleReadState = (email, isOnlyOpen = false) => {
    this.props.onChangeReadState(email, isOnlyOpen);
  };

  onDivClick = ({ target }, email) => {
    if (
      target.classList.value !== "mark-btn" &&
      target.classList.value !== "trash-btn"
    ) {
      this.toggleReadState(email, true);
      var id = this.state.click.id ? null : email.id;
      this.setState({ click: { id } });
    }
  };
  onRecycleBin = (email) => {
    this.props.onSendToTrash(email);
  };

  onDeleteEmail = (email) => {
    this.props.deleteEmail(email);
  };

  render() {
    var hoverId = this.state.hover.id ? this.state.hover.id : null;
    var clickId = this.state.click.id ? this.state.click.id : null;
    var { emails } = this.props;
    return (
      <section className="emails-list">
        {emails.map((email) => {
          var sentAtTime = utilsService.formatEmailTime(email.sentAt);
          var { id } = email;
          var isHovered = false;
          var isClicked = false;
          if (id === hoverId) {
            isHovered = true;
            var readIcon = email.isRead ? "📭" : "✉️";
          }
          if (id === clickId) {
            isClicked = true;
          }
          var body =
            email.body.length > 50
              ? email.body.substr(0, 50) + "..."
              : email.body;
          var isTrash = email.deletedAt;
          var trashIcon = isTrash ? "❌" : "🗑";
          return (
            <div className="div-email-item" key={email.id}>
              <div
                key={email.id}
                className="email-item"
                onMouseEnter={() => {
                  this.setState({ hover: { id } });
                }}
                onMouseLeave={() => this.setState({ hover: {} })}
                onClick={(ev) => {
                  this.onDivClick(ev, email);
                }}
              >
                <h1>{email.fromName}</h1>
                <div className="email-content">
                  <h1>{email.subject}</h1>
                  <p className="email-body">-{body}</p>
                </div>
                {!isHovered && <p>{sentAtTime}</p>}
                {isHovered && (
                  <div className="hover-btns">
                    <button
                      className="mark-btn"
                      onClick={() => {
                        this.toggleReadState(email);
                      }}
                    >
                      {readIcon}
                    </button>
                    <button
                      className="trash-btn"
                      onClick={() => {
                        if (!isTrash) this.onRecycleBin(email);
                        if (isTrash) this.onDeleteEmail(email);
                      }}
                    >
                      {trashIcon}
                    </button>
                  </div>
                )}
              </div>
              {isClicked && <EmailDetails email={email} />}
            </div>
          );
        })}
      </section>
    );
  }
}
