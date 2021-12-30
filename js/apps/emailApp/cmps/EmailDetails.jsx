export class EmailDetails extends React.Component {
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
      <section className="email-details">
        <h1>{email.subject}!</h1>
        <div className="sender-info flex">
          <h2>{email.fromName}</h2>
          <p>{"<" + email.fromEmail + ">"}</p>
        </div>
        <p className="email-details-body">{email.body}</p>
      </section>
    );
  }
}
