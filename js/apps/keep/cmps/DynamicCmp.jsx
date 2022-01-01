import { ImgPreview } from './note-img-preview.jsx';
import { TodoPreview } from './TodoPreview.jsx';

import { TxtPreview } from './TxtPreview.jsx';
import { VideoPreview } from './VideoPreview.jsx';

export function DynamicCmp(props) {
  switch (props.note.type) {
    case 'txt':
      return <TxtPreview note={props.note} />;
    case 'img':
      return <ImgPreview note={props.note} />;
    case 'video':
      return <VideoPreview note={props.note} />;
    case 'todo':
      return (
        <TodoPreview
          note={props.note}
          todos={props.note.info.todos}
          renderNote={props.renderNote}
        />
      );
    default:
      return <React.Fragment></React.Fragment>;
  }
}
