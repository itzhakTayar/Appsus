const { Link } = ReactRouterDOM;

export function NotesPreview({ note }) {
  return (
    <Link to={`/note/${note.id}`} className="note-preview">
      <article>
        <div className="note-container">
          <h2>{note.info.txt}</h2>
        </div>
      </article>
    </Link>
  );
}
