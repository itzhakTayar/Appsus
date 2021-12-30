const { Link } = ReactRouterDOM;

export function TxtPreview({ note }) {
  return (
    // <Link to={`/note/${note.id}`} className="note-preview">
    <article>
      <div className="note-container">
        <h1>{note.info.title}</h1>
        <h2>{note.info.txt}</h2>
      </div>
    </article>
    // </Link>
  );
}
