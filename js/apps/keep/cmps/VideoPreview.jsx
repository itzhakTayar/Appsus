export function VideoPreview({ note }) {
  const embedUrl = (url) => {
    return url.replace("https://www.youtube.com/watch?v=", "");
  };

  return (
    <section>
      {note.info.title && <h1 className="noteText-title">{note.info.title}</h1>}
      {note.info.txt && <h2 className="noteText-txt">{note.info.txt}</h2>}
      <iframe
        src={`https://www.youtube.com/embed/${embedUrl(note.info.url)}`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
        className="video-iframe"
      />
    </section>
  );
}
