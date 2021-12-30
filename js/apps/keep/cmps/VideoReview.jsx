export function VideoPreview({ note }) {
  const embedUrl = (url) => {
    return url.replace('https://www.youtube.com/watch?v=', '');
  };

  return (
    <iframe
      src={`https://www.youtube.com/embed/${embedUrl(note.info.url)}`}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      title="video"
    />
  );
}
