import { NotesList } from '../cmps/note-list.jsx';
import { NotesHeader } from '../cmps/notes-header.jsx';
import { noteService } from '../services/note.service.js';
import { AddNote } from '../cmps/AddNote.jsx';
import { LableModal } from '../cmps/LabelModal.jsx';

export class NoteApp extends React.Component {
  state = {
    notes: [],
    filterBy: null,
    isShowNoteModal: false,
    isShowLableModal: false,
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    const { filterBy } = this.state;
    noteService.query(filterBy).then((notes) => {
      this.setState({ notes });
    });
  };
  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadNotes);
  };

  onToggleNoteModal = () => {
    this.setState({ isShowNoteModal: !this.state.isShowNoteModal });
  };
  onToggleLableModal = () => {
    this.setState({ isShowLableModal: !this.state.isShowLableModal });
  };

  render() {
    const { notes } = this.state;
    return (
      <section className="note-app">
        <NotesHeader
          setFilter={this.onSetFilter}
          onToggleLabelModal={this.onToggleLableModal}
        />
        <button onClick={this.onToggleNoteModal}>Add note</button>
        <button onClick={this.onToggleLableModal}>add lable</button>
        <NotesList notes={notes} onAdd={this.loadNotes} />
        {this.state.isShowNoteModal && (
          <AddNote
            onAdd={this.loadNotes}
            onToggleNoteModal={this.onToggleNoteModal}
          />
        )}
        {this.state.isShowLableModal && (
          <LableModal onToggleLableModal={this.onToggleLableModal} />
        )}
      </section>
    );
  }
}
