import { eventBusService } from "../services/event-bus.service.js";

export class UserMsg extends React.Component {
  state = {
    msg: null,
  };
  removeEventBus = null;
  timeoutId = null;

  componentDidMount() {
    this.removeEventBus = eventBusService.on("user-msg", (msg) => {
      this.setState({ msg }, this.onAutoClose);
    });
  }

  onAutoClose = () => {
    this.timeoutId = setTimeout(() => {
      this.onCloseMsg();
    }, 3000);
  };

  onCloseMsg = () => {
    clearTimeout(this.timeoutId);
    this.setState({ msg: null });
  };

  componentWillUnmount() {
    this.removeEventBus();
  }

  render() {
    const { msg } = this.state;
    if (!msg) return <React.Fragment></React.Fragment>;
    return (
      <section className={`user-msg ${msg.type}`}>
        <button
          className="close-msg-btn"
          onClick={() => {
            this.onCloseMsg();
          }}
        >
          ❌
        </button>
        <h1>{msg.txt}</h1>
      </section>
    );
  }
}
