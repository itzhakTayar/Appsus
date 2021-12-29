import { DynamicCmp } from './DynamicCmp.jsx';

{
  DynamicCmp;
}

const { Link } = ReactRouterDOM;

export function NotesPreview({ note }) {
  return (
    <Link to={`/note/${note.id}`} className="note-preview">
      <article>
        <div className="note-container">
          <DynamicCmp note={note} />
        </div>
      </article>
    </Link>
  );
}
