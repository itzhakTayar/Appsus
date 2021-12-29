import { ImgPreview } from './note-img-preview.jsx';
import { TodoPreview } from './TodoPreview.jsx';

import { TxtPreview } from './TxtPreview.jsx';
import { VideoPreview } from './VideoReview.jsx';

export function DynamicCmp(props) {
  console.log(props);
  switch (props.note.type) {
    case 'txt':
      //   return console.log('hi');

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
