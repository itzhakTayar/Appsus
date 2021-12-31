import { DynamicCmp } from "./DynamicCmp.jsx";
import { EditNote } from "./EditNote.jsx";

export class NotesPreview extends React.Component {
  state = {
    note: this.props.note,
    hover: false,
  };

  render() {
    var isHover = this.state.hover;
    return (
      <div
        className="note-item"
        onMouseEnter={() => {
          this.setState({ hover: true });
        }}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div className="note-content">
          <DynamicCmp note={this.state.note} />
        </div>
        {isHover && (
          <EditNote note={this.props.note} renderNote={this.props.renderNote} />
        )}
      </div>
    );
  }
}
