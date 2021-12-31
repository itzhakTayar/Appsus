import { NoteFilter } from './note-filter.jsx';

export class NotesHeader extends React.Component {
  state = {};
  render() {
    return (
      <section className="notes-header">
        <NoteFilter onSetFilter={this.props.setFilter} />
      </section>
    );
  }
}
