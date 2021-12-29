export function VideoPreview({ note }) {
  console.log(note.info.txt);
  return (
    // <Link to={`/note/${note.id}`} className="note-preview">
    <article>
      <div className="note-container">
        <h1>{note.info.title}</h1>
        <h2>{note.info.txt}</h2>
        <h1>video</h1>
        {/* <iframe
          width="50"
          height="50"
          src={note.info.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        /> */}
      </div>
    </article>
    // </Link>
  );
}
