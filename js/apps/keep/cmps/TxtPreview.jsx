const { Link } = ReactRouterDOM;

export function TxtPreview({ note }) {
  return (
    // <Link to={`/note/${note.id}`} className="note-preview">

    <div className="note-container">
      <h1 className="noteText-title">{note.info.title}</h1>
      <h2 className="noteText-txt"> {note.info.txt}</h2>
    </div>

    // </Link>
  );
}
