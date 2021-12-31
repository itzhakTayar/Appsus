import { noteService } from '../services/note.service.js';
import { ChangeColor } from './NoteColor.jsx';

export class EditNote extends React.Component {
  state = {
    isColorMenuOn: false,
    note: null,
  };
  componentDidMount() {
    var { note } = this.props;
    this.setState({ note });
  }
  onRemoveNote = (noteId) => {
    noteId = this.state.note.id;

    noteService.removeNote(noteId).then(this.props.renderNote());
  };
  onDuplicateNote = (noteId) => {
    noteService.duplicateNote(noteId).then(this.props.renderNote());
  };
  onTogglePin = (noteId) => {
    noteService.togglePin(noteId).then(this.props.renderNote());
  };

  onChangeBgc = (noteId, color) => {
    noteService.changeBgc(noteId, color).then((note) => {
      this.setState({ note });
      this.onToggleColorMenu();
    });
  };
  onToggleColorMenu = () => {
    this.setState({ isColorMenuOn: !this.state.isColorMenuOn });
  };
  onSetPin() {
    console.log('pin seted..');
  }
  render() {
    var { note } = this.state;
    if (!note) return <React.Fragment></React.Fragment>;
    console.log(note);
    return (
      <div className="note-edit">
        <button onClick={this.onRemoveNote}>delete</button>
        <button
          className="color-btn"
          title="Change color"
          onClick={() => this.onToggleColorMenu(note.id)}
        ></button>
        {this.state.isColorMenuOn && (
          <ChangeColor noteId={note.id} onChangeBgc={this.onChangeBgc} />
        )}
        <button
          onClick={() => {
            this.onTogglePin(note.id);
          }}
        >
          📌
        </button>
        <button
          onClick={() => {
            this.onDuplicateNote(note.id);
          }}
        >
          duplicate
        </button>
        <button>send</button>
      </div>
    );
  }
}