import { eventBusService } from '../../../services/event-bus.service.js';
import { noteService } from '../services/note.service.js';
import { AddNote } from './AddNote.jsx';
import { ChangeColor } from './NoteColor.jsx';

export class EditNote extends React.Component {
  state = {
    isColorMenuOn: false,
    note: this.props.note,
    isShowEditModal: false,
  };
  onRemoveNote = () => {
    var noteId = this.state.note.id;
    noteService.removeNote(noteId).then(() => {
      eventBusService.emit('user-msg', {
        txt: 'Note Deleted!',
        type: 'warning',
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
      this.setState({ note });
      this.onToggleColorMenu();
    });
  };
  onToggleColorMenu = () => {
    this.setState({ isColorMenuOn: !this.state.isColorMenuOn });
  };

  onEditNote = () => {
    this.setState({ isShowEditModal: !this.state.isShowEditModal });
  };
  render() {
    var { note } = this.state;
    if (!note) return <React.Fragment></React.Fragment>;
    var classNameEdit = this.props.isShown ? 'shown' : 'closed';
    return (
      <div className={`note-edit ${classNameEdit} `}>
        <button onClick={this.onRemoveNote}>delete</button>
        <button
          className="color-btn"
          title="Change color"
          onClick={() => this.onToggleColorMenu(note.id)}
        >
          🎨
        </button>
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
          duplicate{' '}
        </button>
        <button
          onClick={() => {
            this.onEditNote();
          }}
        >
          edit
        </button>
        <button>send</button>
        {this.state.isShowEditModal && (
          <AddNote
            note={this.state.note}
            onToggleNoteModal={this.props.onToggleNoteModal}
          />
        )}
        ;
      </div>
    );
  }
}
