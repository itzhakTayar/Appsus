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
    return (
      <section className="email-preview">
        <div className="preview-header flex">
          <h1>{email.subject}!</h1>
          <div className="preview-header-btns">
            <button>⏍</button>
            <button>⌲</button>
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
