import { NotesPreview } from './note-preview.jsx';

export class NotesList extends React.Component {
  state = {};

  render() {
    var { notes } = this.props;
    return (
      <section className="notes-list">
        {notes.map((note) => (
          <NotesPreview
            note={note}
            key={note.id}
            renderNote={this.props.onAdd}
            onToggleNoteModal={this.props.onToggleNoteModal}
          />
        ))}
      </section>
    );
  }
}
