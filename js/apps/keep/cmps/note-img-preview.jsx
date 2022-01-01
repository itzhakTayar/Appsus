const { Link } = ReactRouterDOM;

export function ImgPreview({ note }) {
  return (

    <div className="img-dynamic">
      <img className="note-img" src={note.info.url}></img>
      <h1 className="noteText-title">{note.info.title}</h1>
      <h2 className="noteText-txt">{note.info.txt}</h2>
    </div>

  );
}
