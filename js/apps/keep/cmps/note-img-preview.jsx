const { Link } = ReactRouterDOM;

export function ImgPreview({ note }) {
  return (
    // <Link to={`/note/${note.id}`} className="note-preview">
    <article>
      <div className="note-container">
        <h1>{note.info.title}</h1>
        <h2>{note.info.txt}</h2>
        <img className="note-img" src={note.info.url}></img>
      </div>
    </article>
    // </Link>
  );
}
