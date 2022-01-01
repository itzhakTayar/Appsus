import { NotesList } from "../cmps/note-list.jsx";
import { NotesHeader } from "../cmps/notes-header.jsx";
import { noteService } from "../services/note.service.js";
import { AddNote } from "../cmps/AddNote.jsx";

const { NavLink } = ReactRouterDOM;

export class NoteApp extends React.Component {
  state = {
    notes: [],
    filterBy: null,
    isShowNoteModal: false,
    noteToEdit: null,
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

  componentDidUpdate(prevProps, prevState) {
    var notesUrl = this.props.location.pathname;
    if (prevProps.location.pathname !== notesUrl) {
      if (notesUrl.includes("create")) {
        this.setState({ isShowNoteModal: true });
        return;
      } else if (prevProps.location.pathname.includes("create")) {
        this.setState({ isShowNoteModal: false });
        return;
      }
    }
  }

  toggleNoteModalWithParms = (noteToEdit = null) => {
    var isModalOpen = !this.state.isShowNoteModal;
    if (noteToEdit && isModalOpen) this.setState({ noteToEdit });
    else {
      noteToEdit = null;
      this.setState({ noteToEdit });
    }
    var str = isModalOpen ? "/create" : "";
    this.props.history.push(`/notes${str}`);
  };

  render() {
    const { notes } = this.state;
    var { noteToEdit } = this.state;
    return (
      <section className="note-app">
        <NotesHeader setFilter={this.onSetFilter} />
        <NavLink
          to="/notes/create"
          className="add-note-btn clean-link"
          onClick={() => {}}
        >
          {" "}
          Add Note
        </NavLink>

        <NotesList
          notes={notes}
          onAdd={this.loadNotes}
          openAdd={this.toggleNoteModalWithParms}
        />
        {this.state.isShowNoteModal && (
          <AddNote
            onAdd={this.loadNotes}
            closeNoteModal={this.toggleNoteModalWithParms}
            noteToEdit={noteToEdit}
          />
        )}
      </section>
    );
  }
}
