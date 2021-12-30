import { AddNote } from './AddNote.jsx';
import { NotesPreview } from './note-preview.jsx';

export class NotesList extends React.Component {
  state = {
    isShowNoteModal: false,
  };

  onToggleNoteModal = () => {
    this.setState({ isShowNoteModal: !this.state.isShowNoteModal });
  };

  render() {
    var { notes } = this.props;
    return (
      <section className="note-list">
        <button onClick={this.onToggleNoteModal}>Add note</button>
        {this.state.isShowNoteModal && (
          <AddNote
            onAdd={this.props.onAdd}
            onToggleNoteModal={this.onToggleNoteModal}
          />
        )}
        {notes.map((note) => (
          <NotesPreview key={note.id} note={note} />
        ))}
      </section>
    );
  }
}
