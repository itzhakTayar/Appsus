import { NoteFilter } from "./note-filter.jsx";
const { NavLink } = ReactRouterDOM;
export class NotesHeader extends React.Component {
  state = {};
  render() {
    return (
      <section className="notes-header main-layout">
        <NoteFilter onSetFilter={this.props.setFilter} />
        <NavLink
          to="/notes/create"
          className="add-note-btn clean-link"
          onClick={() => {}}
        >
          Add Note
        </NavLink>
      </section>
    );
  }
}
