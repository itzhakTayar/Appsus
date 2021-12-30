import { DynamicCmp } from './DynamicCmp.jsx';

export class NotesPreview extends React.Component {
  state = {
    isShowNoteModal: false,
    note: this.props.note,
  };

  render() {
    return (
      <div>
        <article>
          <div className="note-container">
            <DynamicCmp note={this.state.note} />
          </div>
        </article>
      </div>
    );
  }
}
