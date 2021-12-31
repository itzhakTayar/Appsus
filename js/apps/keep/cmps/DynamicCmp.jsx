import { ImgPreview } from './note-img-preview.jsx';
import { TodoPreview } from './TodoPreview.jsx';

import { TxtPreview } from './TxtPreview.jsx';
import { VideoPreview } from './VideoReview.jsx';

export function DynamicCmp(props) {
  // console.log('note');
  switch (props.note.type) {
    case 'txt':
      return <TxtPreview note={props.note} />;
    case 'img':
      return <ImgPreview note={props.note} />;
    case 'video':
      return <VideoPreview note={props.note} />;
    case 'todo':
      // console.log('note check undefind', props.note);
      return <TodoPreview note={props.note} todos={props.note.info.todos} />;
    default:
      return <React.Fragment></React.Fragment>;
  }
}
