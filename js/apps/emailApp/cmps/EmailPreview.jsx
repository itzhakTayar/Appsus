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
    var navScreen = isFullDispay ? "/email/" : `/email/:emailAt/${email.id}`;
    return (
      <section className={sectionClass}>
        <div className="preview-header flex">
          <h1>{email.subject}!</h1>
          <div className="preview-header-btns flex">
            <NavLink
              className="clean-link fas fa-expand"
              to={navScreen}
            ></NavLink>
            <NavLink
              className="clean-link fas fa-paper-plane"
              to={`/notes/create/?title=${email.subject}&txt=${email.body}`}
            ></NavLink>
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
