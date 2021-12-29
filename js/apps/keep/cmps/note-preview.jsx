import { DynamicCmp } from './DynamicCmp.jsx';
import { AddNote } from './AddNote.jsx';

export class NotesPreview extends React.Component {
  state = {
    isShowNoteModal: false,
    note: this.props.note,
  };

  onToggleNoteModal = () => {
    this.setState({ isShowNoteModal: !this.state.isShowNoteModal });
  };

  render() {
    return (
      <div>
        <button onClick={this.onToggleNoteModal}>Add note</button>
        {this.state.isShowNoteModal && (
          <AddNote onToggleNoteModal={this.onToggleNoteModal} />
        )}
        <article>
          <div className="note-container">
            <DynamicCmp note={this.state.note} />
          </div>
        </article>
      </div>
    );
  }
}
