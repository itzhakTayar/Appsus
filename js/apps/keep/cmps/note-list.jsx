import { NotesPreview } from './NotesPreview.jsx';

export function NotesList({ notes }) {
  return (
    <section className="note-list">
      {notes.map((note) => (
        <NotesPreview key={note.id} note={note} />
      ))}
    </section>
  );
}
