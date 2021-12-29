import { NotesList } from '../cmps/NotesList.jsx';
import { noteService } from '../note.service.js';
export class NoteApp extends React.Component {
  state = {
    notes: [],
    filterBy: null,
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
  render() {
    const { notes } = this.state;

    return (
      <section className="note-app">
        {/* <NoteFilter onSetFilter={this.onSetFilter} />
            <BookAdd loadNotes={this.loadNotes}/> */}
        <NotesList notes={notes} />
      </section>
    );
  }
}
