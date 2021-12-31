import { noteService } from '../services/note.service.js';
import { NoteFilter } from './note-filter.jsx';
import { NotesList } from './note-list.jsx';

export class NotesHeader extends React.Component {
  state = {};

  render() {
    const { notes } = this.state;

    return (
      <section className="notes-header">
        <NoteFilter onSetFilter={this.props.setFilter} />
        {/* <NotesList notes={notes} /> */}
      </section>
    );
  }
}
