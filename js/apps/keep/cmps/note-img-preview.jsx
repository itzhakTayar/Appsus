const { Link } = ReactRouterDOM;

export function ImgPreview({ note }) {
  return (
    // <Link to={`/note/${note.id}`} className="note-preview">

    <div className="img-dynamic">
      <img className="note-img" src={note.info.url}></img>
      <h1 className="note-preview-title">{note.info.title}</h1>
      <h2>{note.info.txt}</h2>
    </div>

    // </Link>
  );
}
