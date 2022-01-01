export class LableModal extends React.Component {
  state = {};

  render() {
    return (
      <div className="lable-modadl">
        <div
          className="critical"
          onClick={() => {
            this.props.setLable('critical');
          }}
        >
          critical
        </div>
        <div
          className="spam"
          onClick={() => {
            this.props.setLable('spam');
          }}
        >
          spam
        </div>
        <div
          className="work"
          onClick={() => {
            this.props.setLable('work');
          }}
        >
          work
        </div>
        <div
          className="friend"
          onClick={() => {
            this.props.setLable('friend');
          }}
        >
          friend
        </div>
        <button
          onClick={() => {
            this.props.onToggleLableModal();
          }}
        >
          x
        </button>
      </div>
    );
  }
}
