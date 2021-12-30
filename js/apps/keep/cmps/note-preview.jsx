import { DynamicCmp } from "./DynamicCmp.jsx";

export class NotesPreview extends React.Component {
  state = {
    note: this.props.note,
    hover: false,
  };

  render() {
    var { id } = this.state.note;
    console.log(this.state.hover);
    var isHover = this.state.hover;
    return (
      <div
        className="note-item"
        onMouseEnter={() => {
          this.setState({ hover: true });
        }}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <DynamicCmp note={this.state.note} />
        {isHover && <h1>Hello Hover</h1>}
      </div>
    );
  }
}
