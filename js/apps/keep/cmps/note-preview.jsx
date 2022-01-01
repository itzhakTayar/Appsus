import { DynamicCmp } from "./DynamicCmp.jsx";
import { EditNote } from "./EditNote.jsx";

export class NotesPreview extends React.Component {
  state = {
    note: this.props.note,
    hover: false,
  };

  render() {
    var isHover = this.state.hover;
    var { note } = this.state;
    var color = note.style.backgroundColor;
    return (
      <div
        className="note-item"
        style={{ backgroundColor: color }}
        onMouseEnter={() => {
          this.setState({ hover: true });
        }}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div className="note-content">
          <DynamicCmp
            note={this.state.note}
            renderNote={this.props.renderNote}
          />
        </div>
        <EditNote
          openAdd={this.props.openAdd}
          isShown={isHover}
          note={this.props.note}
          renderNote={this.props.renderNote}
        />
      </div>
    );
  }
}
