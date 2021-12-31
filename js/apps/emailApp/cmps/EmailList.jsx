import { utilsService } from "../../../services/util.service.js";
import { emailService } from "../services/email.service.js";
import { EmailPreview } from "./EmailPreview.jsx";

export class EmailList extends React.Component {
  state = {
    hover: {},
    click: {},
  };

  toggleReadState = (email, isOnlyOpen = false) => {
    this.props.onChangeReadState(email, isOnlyOpen);
  };

  onDivClick = ({ target }, email, starClass) => {
    if (
      target.classList.value !== "mark-btn" &&
      target.classList.value !== "trash-btn" &&
      target.classList.value !== starClass &&
      target.classList.value != "edit-btn" &&
      target.classList.value != "send-draft-btn"
    ) {
      this.toggleReadState(email, true);
      var id = (this.state.click.id===email.id) ? null : email.id;
      this.setState({ click: { id } });
    }
  };
  onRecycleBin = (email) => {
    this.props.onSendToTrash(email);
  };

  onDeleteEmail = (email) => {
    this.props.deleteEmail(email);
  };

  onToggleStar = (email) => {
    this.props.toggleStar(email);
  };

  onDraftEditClick = (draft) => {
    this.props.openCreateModal(draft);
  };

  onSendDraft=(draft)=>{
   this.props.sendDraft(draft);
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
          var starClassName = email.isStar ? "on" : "off";
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
          var showStar = isHovered || email.isStar;
          var isDraft = email.isDraft;
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
                  this.onDivClick(ev, email, starClassName);
                }}
              >
                <div className="email-start flex">
                  <h1 className="email-senderName">{email.fromName}</h1>
                  {showStar && (
                    <p
                      onClick={() => this.onToggleStar(email)}
                      className={starClassName}
                    >
                      &#9733;
                    </p>
                  )}
                </div>
                <div className="email-content">
                  <h1>{email.subject}</h1>
                  <p className="email-body">-{body}</p>
                </div>
                {!isHovered && <p>{sentAtTime}</p>}
                {isHovered && !isDraft && (
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
                {isHovered && isDraft && (
                  <div className="hover-draft-btns">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        this.onDraftEditClick(email);
                      }}
                    >
                      🖊
                    </button>
                    <button
                      className="send-draft-btn"
                      onClick={() => {
                        this.onSendDraft(email)
                      }}
                    >
                      ⌲
                    </button>
                  </div>
                )}
              </div>
              {isClicked && <EmailPreview email={email} />}
            </div>
          );
        })}
      </section>
    );
  }
}
