import { ImgPreview } from './note-img-preview.jsx';
import { TodoPreview } from './TodoReview.jsx';
import { TxtPreview } from './TxtPreview.jsx';
import { VideoPreview } from './VideoReview.jsx';

export function DynamicCmp(props) {
  console.log(props.note);
  switch (props.note.type) {
    case 'txt':
      return <TxtPreview note={props.note} />;
    case 'img':
      return <ImgPreview note={props.note} />;
    case 'video':
      return <VideoPreview note={props.note} />;
    case 'todo':
      return <TodoPreview note={props.note} />;
    default:
      return <React.Fragment></React.Fragment>;
  }
}
