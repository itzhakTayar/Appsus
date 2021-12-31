import { noteService } from '../services/note.service.js';
import { NoteFilter } from './note-filter.jsx';
import { NotesList } from './note-list.jsx';

export class NotesHeader extends React.Component {
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
      <section className="notes-header">
        <NoteFilter onSetFilter={this.onSetFilter} />
        {/* <NotesList notes={notes} /> */}
      </section>
    );
  }
}
