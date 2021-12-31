const { NavLink } = ReactRouterDOM;

export class EmailPreview extends React.Component {
  state = {
    email: null,
  };

  componentDidMount() {
    var { email } = this.props;
    this.setState({ email });
  }
  render() {
    var { email } = this.state;
    if (!email) return <React.Fragment></React.Fragment>;
    var { isFullDispay } = this.props;
    var sectionClass = isFullDispay ? "email-details-preview" : "email-preview";
    return (
      <section className={sectionClass}>
        <div className="preview-header flex">
          <h1>{email.subject}!</h1>
          <div className="preview-header-btns">
            <NavLink className="clean-link" to={`/email/:emailAt/${email.id}`}>
              ⏍
            </NavLink>
            <NavLink className="clean-link" to="/book">
              ⌲
            </NavLink>
          </div>
        </div>
        <div className="sender-info flex">
          <h2>{email.fromName}</h2>
          <p>{"<" + email.fromEmail + ">"}</p>
        </div>
        <p className="email-preview-body">{email.body}</p>
      </section>
    );
  }
}