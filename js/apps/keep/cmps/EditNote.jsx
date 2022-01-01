import { eventBusService } from "../../../services/event-bus.service.js";
import { noteService } from "../services/note.service.js";
import { AddNote } from "./AddNote.jsx";
import { ChangeColor } from "./NoteColor.jsx";

const { NavLink } = ReactRouterDOM;

export class EditNote extends React.Component {
  state = {
    isColorMenuOn: false,
    note: this.props.note,
  };
  onRemoveNote = () => {
    var noteId = this.state.note.id;
    noteService.removeNote(noteId).then(() => {
      eventBusService.emit("user-msg", {
        txt: "Note Deleted!",
        type: "warning",
      });
      this.props.renderNote();
    });
  };
  onDuplicateNote = (noteId) => {
    noteService.duplicateNote(noteId).then(this.props.renderNote());
  };
  onTogglePin = (noteId) => {
    noteService.togglePin(noteId).then(this.props.renderNote());
  };

  onChangeBgc = (noteId, color) => {
    noteService.changeBgc(noteId, color).then((note) => {
      this.props.renderNote();
    });
  };
  onToggleColorMenu = () => {
    this.setState({ isColorMenuOn: !this.state.isColorMenuOn });
  };

  onEditNote = () => {
    this.props.openAdd(this.state.note);
  };

  render() {
    var { note } = this.state;
    if (!note) return <React.Fragment></React.Fragment>;
    var classNameEdit = this.props.isShown ? "shown" : "closed";
    return (
      <div className={`note-edit ${classNameEdit} `}>
        <button
          className="fas fa-trash-alt"
          onClick={this.onRemoveNote}
        ></button>
        <button
          className="color-btn fas fa-palette"
          title="Change color"
          onClick={() => this.onToggleColorMenu(note.id)}
        ></button>
        {this.state.isColorMenuOn && (
          <ChangeColor noteId={note.id} onChangeBgc={this.onChangeBgc} />
        )}
        <button
          className="btn fas fa-thumbtack"
          onClick={() => {
            this.onTogglePin(note.id);
          }}
        ></button>
        <button
          className="fas fa-copy"
          onClick={() => {
            this.onDuplicateNote(note.id);
          }}
        ></button>
        <button
          className="fas fa-edit"
          onClick={() => {
            this.onEditNote();
          }}
        >
          edit
        </button>

        <NavLink
          className="clean-link"
          to={`/email/create?title=${note.info.title}&body=${note.info.txt}`}
        >
          <button className="fas fa-envelope"></button>
        </NavLink>
      </div>
    );
  }
}
