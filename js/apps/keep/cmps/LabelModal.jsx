export class LableModal extends React.Component {
  state = {};

  setLable = (lable) => {
    console.log(lable);
  };

  render() {
    return (
      <div className="lable-modadl">
        <div
          className="critical"
          onClick={() => {
            this.setLable('critical');
          }}
        >
          critical
        </div>
        <div
          className="spam"
          onClick={() => {
            this.setLable('spam');
          }}
        >
          spam
        </div>
        <div
          className="work"
          onClick={() => {
            this.setLable('work');
          }}
        >
          work
        </div>
        <div
          className="friend"
          onClick={() => {
            this.setLable('friend');
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
